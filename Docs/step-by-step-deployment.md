
---

# Phase 2 – AWS Infrastructure Design

## Goal

Before deploying anything, we'll build a secure and scalable AWS network that can support:

* Three frontend applications
* Three backend microservices
* Monitoring stack (Prometheus, Grafana)
* AWS Secrets Manager
* MongoDB Atlas
* Future CI/CD
* Future Kubernetes migration

The idea is that later, if we migrate from Docker Compose to Kubernetes, we shouldn't have to redesign the network.

---

# Step 1: AWS Account Preparation

## 1.1 Create an IAM User (Don't Use the Root Account)

### Why?

The **root account** has unrestricted permissions. In production, it is used only for account-level tasks such as billing or enabling MFA.

All day-to-day work should be done with an IAM user.

### Best Practice

```text
AWS Account
│
├── Root User
│      ❌ Never use for deployments
│
└── IAM Users
       ├── DevOps Engineer
       ├── Cloud Admin
       └── ReadOnly Users
```

### Tasks

* Log in as the root user.
* Enable **Multi-Factor Authentication (MFA)** on the root account.
* Create an IAM user (e.g., `devops-admin`).
* Grant it **AdministratorAccess** for learning. In production, we'd create a least-privilege custom policy instead.

---

## 1.2 Create an EC2 Key Pair

We'll use SSH to connect to our EC2 instance.

### Recommendation

* Key Pair Name: `pn-coaching-key`
* Type: RSA
* Format: `.pem` (for Linux/macOS) or `.ppk` (if using PuTTY on Windows)

Since you're on Windows and can use **PowerShell** or **Git Bash**, download the **`.pem`** key.

Store it safely; you cannot download it again after creation.

---

## 1.3 Install AWS CLI

Verify installation:

```bash
aws --version
```

Expected output:

```text
aws-cli/2.x.x
```

---

## 1.4 Configure AWS CLI

```bash
aws configure
```

You'll be prompted for:

```text
AWS Access Key ID:
AWS Secret Access Key:
Default region:
Default output format:
```

For now:

```text
Region: ap-south-1
Output: json
```

---

# Why `ap-south-1`?

Since you're in India, the **Mumbai region (`ap-south-1`)** offers:

* Lower latency
* Lower data transfer latency for local users
* Common choice for Indian deployments

---

# Step 2: VPC Design

This is one of the most important parts of AWS.

A **VPC (Virtual Private Cloud)** is your own isolated network inside AWS.

Think of it as your company's private data center.

```
Internet
    │
AWS Cloud
    │
┌──────────────────────────────┐
│            VPC               │
│                              │
│  Your own private network    │
└──────────────────────────────┘
```

---

## Choosing the CIDR Block

We'll use:

```text
10.0.0.0/16
```

Why?

* 65,536 IP addresses
* Plenty of room for future growth
* Standard enterprise practice

---

## Our Network Plan

```
10.0.0.0/16
│
├── Public Subnet A
│      10.0.1.0/24
│
├── Private App Subnet
│      10.0.2.0/24
│
└── Private DB Subnet
       10.0.3.0/24
```

---

## Why Separate Subnets?

### Public Subnet

Resources accessible from the internet:

* Application Load Balancer (later)
* Bastion Host (optional)

---

### Private App Subnet

Application servers:

* EC2 running Docker Compose
* Nginx
* Backend services
* Monitoring stack

No direct internet access.

---

### Private DB Subnet

Database resources:

* MongoDB (if self-hosted)
* Future RDS (if needed)

Again, no direct internet access.

> Since we'll initially use **MongoDB Atlas**, this subnet won't host MongoDB, but we design the network with future growth in mind.

---

# Network Diagram

```text
                    Internet
                        │
                 Internet Gateway
                        │
          ┌─────────────┴─────────────┐
          │                           │
     Public Route Table          Private Route Table
          │                           │
    Public Subnet               Private Subnet
    10.0.1.0/24                 10.0.2.0/24
          │                           │
     (Future ALB)              EC2 + Docker Compose
                                    │
             ┌──────────────────────┼─────────────────────────┐
             │                      │                         │
        frontend-main         frontend-admin         frontend-admission
             │                      │                         │
             └───────────────┬──────┴───────────────┬─────────┘
                             │                      │
                    backend-auth          backend-student
                             │                      │
                             └──────────┬───────────┘
                                        │
                              backend-notification
                                        │
                                 MongoDB Atlas
```

---

# Why Not Put the EC2 in the Public Subnet?

A common beginner setup is:

```
Internet
    │
EC2
```

It works, but it's less secure because the application server is directly exposed to the internet.

In larger environments, traffic typically flows:

```
Internet
      │
Application Load Balancer
      │
Private EC2
```

For learning, we have two options:

### Option A (Recommended for This Project)

* EC2 in the **public subnet**
* Easier to understand
* Lower AWS cost (no NAT Gateway)
* Good for a personal production-style project

### Option B (Enterprise Production)

* EC2 in a **private subnet**
* Application Load Balancer in the public subnet
* NAT Gateway for outbound internet access
* More secure
* Higher monthly cost

---

## My Recommendation

Since this is your **learning and portfolio project**, we'll choose **Option A** initially:

* One VPC
* One public subnet
* EC2 in the public subnet
* Docker Compose
* Nginx
* Prometheus
* Grafana
* AWS Secrets Manager
* MongoDB Atlas

We'll still **design the VPC with future expansion in mind**, so moving the EC2 into a private subnet and adding an Application Load Balancer later will require minimal changes.

---

# Your Tasks Before the Next Step

Please complete these and tell me when they're done:

1. ✅ Create an IAM user (`devops-admin`) with AdministratorAccess (for learning).
2. ✅ Enable MFA on the root account.
3. ✅ Create an EC2 key pair named `pn-coaching-key`.
4. ✅ Install the AWS CLI and verify it with `aws --version`.
5. ✅ Run `aws configure` using:

   * Region: `ap-south-1`
   * Output: `json`

