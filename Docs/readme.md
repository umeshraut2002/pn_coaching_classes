
---

# Phase 1 Completed – Application Analysis

## Architecture Summary

You have:

### Frontend

* frontend-main (Public Website)
* frontend-admission (Admission Portal)
* frontend-admin (Admin Dashboard)

### Backend

* backend-auth (Authentication)
* backend-student (Student Management)
* backend-notification (Email Service)

### Database

One MongoDB database:

```text
pncoaching
```

### Communication Flow

```text
Frontend
      │
      ▼
backend-auth
      │
      ▼
MongoDB

Frontend
      │
      ▼
backend-student
      │
      ├────────► MongoDB
      │
      └────────► backend-notification
                      │
                      ▼
                   SMTP
```

This is a clean service-oriented architecture.

---

# Things I Observed

## 1. Internal Service Communication

This is very good:

```env
NOTIFICATION_SERVICE_URL=http://notification:3003
```

This tells me you already designed the application to communicate over Docker networking.

In Docker Compose, the service name `notification` resolves automatically through Docker DNS.

This is exactly how we want services to communicate in production.

---

## 2. MongoDB Connection

Current:

```env
mongodb://root:rootpass@mongo:27017/pncoaching?authSource=admin
```

This is perfect for local Docker Compose.

In AWS Production it will become something like:

```text
mongodb+srv://username:password@cluster.xxxxxx.mongodb.net/pncoaching
```

(using MongoDB Atlas)

or

```text
mongodb://10.0.2.50:27017/pncoaching
```

(if we self-host MongoDB in a private subnet)

We will **not** expose MongoDB publicly.

---

## 3. JWT Configuration

Current:

```env
JWT_SECRET
JWT_ISSUER
JWT_AUDIENCE
```

These should **never** be stored on the EC2 filesystem in production.

We'll move them into **AWS Secrets Manager**.

---

## 4. SMTP

Currently:

```env
SMTP_HOST
SMTP_USER
SMTP_PASS
```

These also belong in **AWS Secrets Manager**.

---

## 5. Upload Directory

```env
UPLOAD_DIR=uploads
```

This is something we need to discuss.

In production, storing uploads inside a container is risky because containers are ephemeral.

We have two options:

### Option 1 (Recommended)

Store uploads in **Amazon S3**.

Advantages:

* Durable storage
* Easy backups
* Scalable
* Multiple application instances can access the same files

### Option 2

Store uploads on an attached **EBS volume** mounted into the container.

We'll start with EBS to keep the project simpler, then later migrate to S3 to learn that pattern.

---

# Frontend Environment

You mentioned there are no `.env` files.

That's normal.

We'll create production environment files later with values such as:

```env
VITE_API_BASE_URL=https://api.pncoaching.com
```

---

# Enterprise Secrets Classification

This is how I'd classify your configuration.

| Variable                 | Production Location     |
| ------------------------ | ----------------------- |
| MONGODB_URI              | AWS Secrets Manager     |
| JWT_SECRET               | AWS Secrets Manager     |
| SMTP_USER                | AWS Secrets Manager     |
| SMTP_PASS                | AWS Secrets Manager     |
| ADMIN_PASSWORD           | AWS Secrets Manager     |
| PORT                     | Docker Compose          |
| ALLOWED_ORIGINS          | Docker Compose / Config |
| JWT_ISSUER               | Docker Compose / Config |
| JWT_AUDIENCE             | Docker Compose / Config |
| UPLOAD_DIR               | Docker Compose          |
| NOTIFICATION_SERVICE_URL | Docker Compose          |

This separation is commonly used: secrets in a secrets manager, non-sensitive configuration in environment variables.

---

# One Thing We'll Improve

Right now:

```env
ALLOWED_ORIGINS=http://localhost:8080
```

Production will eventually become something like:

```text
https://pncoaching.com
https://admin.pncoaching.com
https://admission.pncoaching.com
```

or whatever domain structure you choose.

---

# Our Project Folder

Before touching AWS, I'd like to organize the repository. Companies rarely keep infrastructure files mixed into application code.

We'll add:

```text
pn_coaching_classes
│
├── backend-auth
├── backend-student
├── backend-notification
│
├── frontend-main
├── frontend-admin
├── frontend-admission
│
├── deployment
│   ├── docker
│   ├── compose
│   ├── nginx
│   ├── monitoring
│   └── scripts
│
├── docs
│
└── README.md
```

All Docker, monitoring, and deployment assets will live under `deployment/`, making the repository cleaner and easier to maintain.

---

# Next Phase: AWS Infrastructure

Now we'll stop looking at application code and start behaving like cloud engineers.

The next phase is **Infrastructure Design**, where we'll build the AWS foundation before deploying any containers.

We'll cover:

1. **AWS account preparation** (IAM user, AWS CLI, key pairs).
2. **VPC design** with CIDR planning.
3. **Public and private subnets**.
4. **Internet Gateway and route tables**.
5. **Security Groups** with least-privilege rules.
6. **EC2 sizing** and operating system selection.
7. **Why each networking decision is made**, as you would be expected to explain in an interview.

Only after the networking is complete will we install Docker, Docker Compose, Nginx, and the monitoring stack on the EC2 instance. This sequence mirrors how infrastructure teams typically build production environments.
