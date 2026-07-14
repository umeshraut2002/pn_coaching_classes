
---

## Application Deployment Requiremnt

## 1. Cloud Platform

| Technology                          | Purpose                   |
| ----------------------------------- | ------------------------- |
| AWS                                 | Cloud Provider            |
| Amazon EC2                          | Application Server        |
| Amazon VPC                          | Private Networking        |
| Internet Gateway                    | Internet Access           |
| Public Subnet                       | EC2 Deployment            |
| Route Tables                        | Network Routing           |
| Security Groups                     | Firewall                  |
| IAM                                 | Access Management         |
| IAM Roles                           | Secure AWS Service Access |
| AWS Secrets Manager                 | Secrets Management        |
| Amazon EBS                          | Persistent Storage        |
| Route 53 *(Later)*                  | DNS                       |
| AWS Certificate Manager *(Later)*   | SSL/TLS Certificates      |
| Application Load Balancer *(Later)* | Load Balancing            |
| CloudWatch *(Optional)*             | Basic EC2 Monitoring      |

---

# 2. Frontend

| Technology   | Purpose                            |
| ------------ | ---------------------------------- |
| React 19     | UI Framework                       |
| TypeScript   | Programming Language               |
| Vite         | Build Tool                         |
| React Router | Routing                            |
| Axios        | API Communication                  |
| Tailwind CSS | Styling                            |
| Nginx        | Static File Server & Reverse Proxy |

### Applications

* frontend-main
* frontend-admission
* frontend-admin

---

# 3. Backend

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| Node.js            | Runtime                   |
| Express.js         | API Framework             |
| JWT                | Authentication            |
| bcrypt             | Password Hashing          |
| Helmet             | Security Headers          |
| Express Rate Limit | API Protection            |
| Morgan             | Request Logging           |
| Multer             | File Upload               |
| Nodemailer         | Email Service             |
| Zod                | Validation                |
| Dotenv             | Environment Configuration |

### Microservices

* backend-auth
* backend-student
* backend-notification

---

# 4. Database

| Technology    | Purpose                |
| ------------- | ---------------------- |
| MongoDB Atlas | Managed NoSQL Database |
| Mongoose      | MongoDB ODM            |

---

# 5. Containerization

| Technology              | Purpose                       |
| ----------------------- | ----------------------------- |
| Docker                  | Containerization              |
| Docker Compose          | Multi-Container Orchestration |
| Multi-stage Dockerfiles | Smaller Images                |
| Docker Bridge Network   | Service Communication         |
| Docker Volumes          | Persistent Data               |

---

# 6. Reverse Proxy

| Technology | Purpose             |
| ---------- | ------------------- |
| Nginx      | Reverse Proxy       |
| Nginx      | Load Distribution   |
| Nginx      | Static File Hosting |
| Nginx      | API Routing         |

---

# 7. Secrets Management

| Technology          | Purpose                 |
| ------------------- | ----------------------- |
| AWS Secrets Manager | Store Secrets           |
| IAM Role            | Access Secrets Securely |

Secrets include:

* MongoDB URI
* JWT Secret
* SMTP Credentials
* Admin Password
* Mail Configuration

---

# 8. Monitoring & Observability

## Metrics

| Technology    | Purpose            |
| ------------- | ------------------ |
| Prometheus    | Metrics Collection |
| Node Exporter | Host Metrics       |
| cAdvisor      | Docker Metrics     |

---

## Visualization

| Technology | Purpose    |
| ---------- | ---------- |
| Grafana    | Dashboards |

---

## Logging

| Technology | Purpose         |
| ---------- | --------------- |
| Loki       | Log Aggregation |
| Promtail   | Log Collection  |

---

# 9. Security

| Technology          | Purpose                      |
| ------------------- | ---------------------------- |
| IAM                 | Identity & Access Management |
| Security Groups     | Firewall                     |
| HTTPS *(Later)*     | Encryption                   |
| Helmet              | Secure HTTP Headers          |
| JWT                 | Authentication               |
| bcrypt              | Password Hashing             |
| Rate Limiting       | DDoS/Brute Force Protection  |
| AWS Secrets Manager | Secret Storage               |

---

# 10. Storage

| Technology       | Purpose                                     |
| ---------------- | ------------------------------------------- |
| Amazon EBS       | Persistent Docker Volumes                   |
| Docker Volumes   | Application Data                            |
| Upload Directory | User Uploads *(Later migrate to Amazon S3)* |

---

# 11. Operating System

| Technology              | Purpose              |
| ----------------------- | -------------------- |
| Ubuntu Server 24.04 LTS | EC2 Operating System |

---

# 12. Networking

| Technology                | Purpose               |
| ------------------------- | --------------------- |
| Custom VPC                | Network Isolation     |
| CIDR Planning             | IP Addressing         |
| Public Subnet             | EC2 Hosting           |
| Private Subnet *(Future)* | Application Isolation |
| Route Tables              | Traffic Routing       |
| Internet Gateway          | Internet Connectivity |

---

# 13. API Communication

| Technology | Purpose                    |
| ---------- | -------------------------- |
| REST APIs  | Service Communication      |
| Docker DNS | Internal Service Discovery |

Example:

```text
frontend-admin
        │
        ▼
backend-auth
        │
        ▼
backend-student
        │
        ▼
backend-notification
```

---

# 14. Production Standards We'll Implement

* Multi-stage Docker builds
* Non-root Docker containers
* Health check endpoints (`/health`)
* Docker restart policies
* Resource limits for containers
* Centralized logging
* Infrastructure monitoring
* Application monitoring
* Secure secret management
* Reverse proxy architecture
* Production Docker Compose
* Least-privilege Security Groups
* IAM Roles (no hardcoded AWS keys)
* Backup strategy for persistent data
* SLA, SLO, and SLI monitoring
* Production documentation (HLD, LLD, Deployment Guide, Network Design)

---

# 15. Tools We're Deliberately Postponing

We'll add these after the manual deployment is complete:

* GitHub Actions
* Jenkins
* Amazon ECR
* Terraform
* Kubernetes (Amazon EKS)
* Helm
* ArgoCD
* Blue/Green Deployments
* Canary Deployments

---

# Final Architecture Stack

```text
Users
        │
Route53 (Later)
        │
ACM (Later)
        │
Application Load Balancer (Later)
        │
Nginx Reverse Proxy
        │
────────────────────────────────────
Frontend Layer
• React
• Vite
• TypeScript
────────────────────────────────────
Backend Layer
• Node.js
• Express
• JWT
• Mongoose
────────────────────────────────────
Database Layer
• MongoDB Atlas
────────────────────────────────────
Infrastructure Layer
• AWS EC2
• VPC
• IAM
• Security Groups
• EBS
• Secrets Manager
────────────────────────────────────
Container Layer
• Docker
• Docker Compose
────────────────────────────────────
Monitoring Layer
• Prometheus
• Node Exporter
• cAdvisor
• Loki
• Promtail
• Grafana
```

## This Project Mirrors Real-World Practices

By the end, you'll have experience across:

* **Cloud:** AWS (EC2, VPC, IAM, Security Groups, Secrets Manager, EBS)
* **Containers:** Docker, Docker Compose
* **Networking:** VPC design, subnets, routing, reverse proxy
* **Security:** IAM roles, secrets management, JWT, HTTPS preparation
* **Observability:** Prometheus, Grafana, Loki, Promtail
* **Backend:** Node.js microservices
* **Frontend:** React + Vite
* **Database:** MongoDB Atlas
* **Operations:** Health checks, logging, monitoring, backups, SLA/SLO/SLI
