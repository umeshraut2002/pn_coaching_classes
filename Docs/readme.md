
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

---

# High-Level Design (HLD)

The HLD describes the major components and how they interact, without diving into implementation details.

```text
                                   Users
                                     │
                          HTTPS (443) Requests
                                     │
                               (Future DNS)
                                 Route53
                                     │
                            SSL Certificate (ACM)
                                     │
                        Application Load Balancer
                                     │
                          Nginx Reverse Proxy
                                     │
      ┌──────────────────────────────┼──────────────────────────────┐
      │                              │                              │
      ▼                              ▼                              ▼
frontend-main               frontend-admission             frontend-admin
      │                              │                              │
      └──────────────────────────────┼──────────────────────────────┘
                                     │
                              REST API Calls
                                     │
             ┌───────────────────────┼─────────────────────────┐
             │                       │                         │
             ▼                       ▼                         ▼
      backend-auth          backend-student      backend-notification
             │                       │                         │
             │                       ├──────────────┐          │
             │                       │              │          │
             ▼                       ▼              ▼          ▼
     JWT Authentication       MongoDB Atlas     File Upload   SMTP Server
                                      │
                                      ▼
                            AWS Secrets Manager

────────────────────────────────────────────────────────────────────────────

Monitoring Stack

Prometheus
Node Exporter
cAdvisor
Loki
Promtail
Grafana

────────────────────────────────────────────────────────────────────────────

Infrastructure

AWS VPC
EC2
Security Groups
IAM Roles
EBS Volume
CloudWatch (Optional)
```

---

# High-Level Components

| Layer                | Components                                          |
| -------------------- | --------------------------------------------------- |
| Presentation Layer   | frontend-main, frontend-admin, frontend-admission   |
| API Layer            | backend-auth, backend-student, backend-notification |
| Data Layer           | MongoDB Atlas                                       |
| Security Layer       | IAM, Security Groups, Secrets Manager               |
| Monitoring Layer     | Prometheus, Grafana, Loki                           |
| Infrastructure Layer | EC2, VPC, EBS, Route Tables                         |

---

# Request Flow

```text
User

↓

Application Load Balancer

↓

Nginx

↓

Frontend

↓

Backend API

↓

MongoDB Atlas

↓

Response
```

---

# Authentication Flow

```text
Admin Login

↓

frontend-admin

↓

backend-auth

↓

MongoDB

↓

JWT Token

↓

frontend-admin

↓

Authorization Header

↓

backend-student
```

---

# Notification Flow

```text
Student Registration

↓

backend-student

↓

backend-notification

↓

SMTP

↓

Email Sent
```

---

# Low-Level Design (LLD)

The LLD contains the infrastructure, ports, networking, Docker services, security rules, and service communication.

---

## AWS Network

```text
VPC
10.0.0.0/16
│
├── Public Subnet
│      10.0.1.0/24
│
│      EC2 Ubuntu
│
│      Docker Compose
│
│      Nginx
│
│      frontend-main
│
│      frontend-admin
│
│      frontend-admission
│
│      backend-auth
│
│      backend-student
│
│      backend-notification
│
│      Prometheus
│
│      Grafana
│
│      Loki
│
│      Promtail
│
│      Node Exporter
│
│      cAdvisor
│
└── Internet Gateway
```

> **Phase 1 decision:** We will keep the EC2 instance in the public subnet to avoid the additional cost of a NAT Gateway. The VPC design will still allow us to move the application into a private subnet later.

---

# Docker Network

```text
Docker Network

pn-network

│

├── nginx

├── frontend-main

├── frontend-admin

├── frontend-admission

├── backend-auth

├── backend-student

├── backend-notification

├── prometheus

├── grafana

├── loki

├── promtail

├── cadvisor

└── node-exporter
```

All containers communicate over this private Docker network.

---

# Backend Ports

| Service              | Internal Port |
| -------------------- | ------------: |
| backend-auth         |          3001 |
| backend-student      |          3002 |
| backend-notification |          3003 |

These are **internal** container ports and won't be exposed directly to the internet.

---

# Frontend Ports

| Service            |        Internal Port |
| ------------------ | -------------------: |
| frontend-main      | 80 (served by Nginx) |
| frontend-admin     | 80 (served by Nginx) |
| frontend-admission | 80 (served by Nginx) |

---

# Reverse Proxy Routes

```text
/

↓

frontend-main
```

```text
/admin

↓

frontend-admin
```

```text
/admission

↓

frontend-admission
```

```text
/api/auth

↓

backend-auth
```

```text
/api/student

↓

backend-student
```

```text
/api/notification

↓

backend-notification
```

This allows users to access all applications through a single domain.

---

# Secrets Manager

We'll store these values securely:

```text
MONGODB_URI

JWT_SECRET

ADMIN_EMAIL

ADMIN_PASSWORD

SMTP_HOST

SMTP_USER

SMTP_PASS

MAIL_FROM
```

The EC2 instance will use an IAM role to retrieve them.

---

# Monitoring Flow

```text
Node Exporter

↓

Prometheus

↓

Grafana Dashboard
```

```text
cAdvisor

↓

Prometheus

↓

Grafana
```

```text
Application Logs

↓

Promtail

↓

Loki

↓

Grafana
```

---

# Storage

| Data                | Storage             |
| ------------------- | ------------------- |
| Docker volumes      | EBS                 |
| Uploads (initially) | EBS-mounted volume  |
| Database            | MongoDB Atlas       |
| Secrets             | AWS Secrets Manager |

Later, we can migrate uploaded files from EBS to Amazon S3.

---

# Security

```text
Internet

↓

Security Group

↓

Nginx

↓

Docker Network

↓

Backend Services

↓

MongoDB Atlas
```

Users cannot directly access backend containers or MongoDB.

---

# Future Architecture (Phase 2)

Once you've learned CI/CD and Kubernetes, this architecture can evolve without major redesign:

```text
GitHub
    │
GitHub Actions
    │
Amazon ECR
    │
Amazon EKS
    │
ALB
    │
Pods
    │
MongoDB Atlas
```

---
