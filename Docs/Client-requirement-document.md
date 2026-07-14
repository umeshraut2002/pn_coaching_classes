
---

# Client Infrastructure Requirement Document

## Coaching Center Management System

**Version:** 1.0

---

# 1. Project Overview

The application is a cloud-based **Coaching Center Management System** designed to manage student admissions, authentication, notifications, and administrative operations.

The application follows a **Microservices Architecture** to improve maintainability, scalability, and independent deployment of services.

The infrastructure will be deployed on **Amazon Web Services (AWS)** following cloud architecture best practices with a strong focus on:

* High Availability
* Security
* Scalability
* Reliability
* Cost Optimization
* Disaster Recovery
* Automated Deployment

---

# 2. Business Information

| Item                     | Details            |
| ------------------------ | ------------------ |
| Organization Type        | Coaching Institute |
| Current Branches         | 1 (Wardha)         |
| Expected Future Branches | Multiple           |
| Deployment Model         | Cloud (AWS)        |
| Architecture             | Microservices      |

---

# 3. Estimated Application Usage

## Current Usage

| Metric                   | Expected Load |
| ------------------------ | ------------- |
| Monthly Active Users     | 300           |
| Daily Active Users       | < 50          |
| Monthly Website Visitors | 500–1000      |
| Concurrent Users         | 10–20         |
| Average Requests per Day | < 5,000       |

---

## Future Growth Target

The infrastructure should support scaling without major architectural changes.

Expected growth:

* Up to 5 Coaching Branches
* 5,000 Monthly Active Users
* 500 Daily Active Users
* 100 Concurrent Users

---

# 4. Application Components

## Frontend Applications

| Application        | Description              |
| ------------------ | ------------------------ |
| frontend-main      | Public Website           |
| frontend-admission | Student Admission Portal |
| frontend-admin     | Admin Dashboard          |

Technology

* React.js

---

## Backend Microservices

| Service              | Responsibility                 |
| -------------------- | ------------------------------ |
| backend-auth         | Authentication & Authorization |
| backend-student      | Student Management             |
| backend-notification | Email & SMS Notifications      |

Technology

* Node.js
* Express.js

---

## Database

| Database      | Hosting       |
| ------------- | ------------- |
| MongoDB Atlas | Cloud Managed |

---

# 5. Infrastructure Requirements

The application infrastructure should meet the following objectives.

## Availability

* Minimum 99.9% uptime
* Multi-AZ deployment where economically feasible
* No Single Point of Failure

---

## Scalability

Infrastructure should support

* Horizontal Scaling
* Vertical Scaling
* Future Auto Scaling

---

## Reliability

* Automatic service restart
* Health monitoring
* Backup strategy
* Disaster recovery planning

---

## Performance

* Fast application response
* Low latency
* Optimized static content delivery
* Efficient API communication

---

## Security

Infrastructure should implement

* HTTPS only
* SSL Certificate
* IAM Least Privilege
* Security Groups
* Private Networking
* Secrets Management
* Regular Security Updates

---

## Cost Optimization

Since this is a startup-scale application, infrastructure should prioritize low operational costs while maintaining production readiness.

Objectives

* Pay only for required resources
* Minimize idle infrastructure
* Easy future upgrades
* Managed services where appropriate

Target Monthly Infrastructure Budget

**₹4,000–₹8,000 per month** (excluding MongoDB Atlas and third-party SMS/Email charges).

---

# 6. Functional Modules

The infrastructure should support deployment of the following modules.

### Public Website

* Landing Page
* Courses
* Faculty
* Contact
* Branch Information

---

### Admission Portal

* Student Registration
* Admission Form
* Document Upload
* Payment Integration (Future)

---

### Admin Dashboard

* Student Management
* Admission Management
* Notifications
* Reports
* User Management

---

### Authentication

* Login
* JWT Authentication
* Password Reset
* Role-Based Access Control (RBAC)

---

### Notification Service

* Email Notifications
* SMS Integration (Future)
* Admission Confirmation
* Password Reset

---

# 7. Non-Functional Requirements

## High Availability

* Load Balancer
* Multiple Availability Zones (when scaling justifies it)
* Automated Recovery

---

## Monitoring

Infrastructure monitoring should include

* CPU
* Memory
* Disk Usage
* Network Traffic
* Application Logs
* Error Tracking
* Alerts

---

## Backup

* Daily Database Backup (MongoDB Atlas)
* Configuration Backup
* Infrastructure as Code (IaC)

---

## Logging

Centralized logging for

* Backend Services
* Frontend
* Application Errors
* Access Logs

---

# 8. DevOps Requirements

The infrastructure should support a modern DevOps workflow.

## Source Code Management

* GitHub

## CI/CD

* Automated Build
* Automated Testing
* Docker Image Build
* Deployment Automation
* Rollback Capability

---

## Containerization

All services should be containerized using Docker.

Services

* frontend-main
* frontend-admission
* frontend-admin
* backend-auth
* backend-student
* backend-notification

---

## Infrastructure as Code

Infrastructure provisioning should use:

* Terraform (preferred)
* AWS-native services

---

# 9. AWS Services (Recommended)

| Layer              | AWS Service                             |
| ------------------ | --------------------------------------- |
| DNS                | Route 53                                |
| SSL                | AWS Certificate Manager (ACM)           |
| CDN                | CloudFront                              |
| Load Balancer      | Application Load Balancer (ALB)         |
| Compute            | Amazon ECS (Fargate) or EC2 with Docker |
| Container Registry | Amazon ECR                              |
| Networking         | Amazon VPC                              |
| Secrets            | AWS Secrets Manager                     |
| Monitoring         | Amazon CloudWatch                       |
| Logging            | CloudWatch Logs                         |
| IAM                | AWS IAM                                 |
| Object Storage     | Amazon S3                               |
| Database           | MongoDB Atlas                           |

> **Recommendation:** Given the low traffic (300 MAU and fewer than 50 DAU), deploying the application on a single EC2 instance with Docker Compose behind an Application Load Balancer provides the best balance of cost and reliability. The architecture should be designed so it can later migrate to Amazon ECS or Amazon EKS with minimal application changes.

---

# 10. Deliverables

The DevOps/Cloud implementation should include:

* AWS Infrastructure Setup
* VPC Configuration
* Public & Private Networking
* IAM Configuration
* Dockerized Applications
* Reverse Proxy Configuration
* SSL Setup
* Domain Configuration
* CI/CD Pipeline
* Monitoring & Logging
* Backup Configuration
* Infrastructure as Code (Terraform)
* Technical Documentation
* Deployment Runbook
* Handover Documentation

---

# 11. Success Criteria

The solution will be considered successful when it:

* Successfully deploys all six microservices and three frontend applications.
* Achieves at least 99.9% service availability.
* Supports current traffic with capacity for future growth.
* Uses secure networking and HTTPS for all public endpoints.
* Enables one-click or automated deployments via CI/CD.
* Provides centralized monitoring, logging, and alerting.
* Meets the agreed monthly infrastructure budget while remaining production-ready.
