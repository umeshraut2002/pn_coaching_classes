## AWS Deployment (EC2 + Docker Compose + Nginx)

This guide deploys the full stack on a single EC2 instance using Docker Compose.

### 1) Launch EC2

- **AMI**: Ubuntu 22.04 LTS (or Amazon Linux 2023)
- **Instance**: t3.small or higher
- **Storage**: 20GB+
- **Security Group inbound**
  - 22 (SSH) from your IP
  - 80 (HTTP) from 0.0.0.0/0
  - 443 (HTTPS) from 0.0.0.0/0 (optional)

### 2) Install Docker

On Ubuntu:

```bash
sudo apt update -y
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update -y
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
newgrp docker
```

### 3) Upload the project

Option A (recommended): Git clone (after you initialize a repo).

Option B: Zip upload from your local machine.

### 4) Configure environment variables

Edit these files on EC2:

- `backend-auth/.env`
- `backend-student/.env`
- `backend-notification/.env`

**Production recommendations**

- Use a strong `JWT_SECRET`
- Set `ALLOWED_ORIGINS` to your real domain(s)
- Consider using **MongoDB Atlas** instead of containerized MongoDB
- Store uploads in **S3** (instead of container filesystem)

### 5) Run with Docker Compose

From repo root:

```bash
docker compose up -d --build
docker compose ps
```

Your app will be available on:

- `http://<EC2_PUBLIC_IP>/`
- `http://<EC2_PUBLIC_IP>/admission/`
- `http://<EC2_PUBLIC_IP>/admin/`

### 6) Add a domain + HTTPS (optional)

Recommended approach:

- Point DNS `A` records to the EC2 public IP
- Use a managed TLS proxy (e.g., Cloudflare) OR install certbot on the instance and terminate TLS in Nginx

If terminating TLS on-instance:

- Run Nginx on 80/443 on the host (outside Docker), proxy to Docker gateway on 8080
- Or extend the Docker Nginx to listen on 443 with certificates mounted in

### 7) CI/CD (GitHub Actions)

This repo includes a workflow template:

- Builds Docker images
- Pushes to GHCR
- (Optional) SSH deploys to EC2

Update it after you create a GitHub repo and add secrets.

