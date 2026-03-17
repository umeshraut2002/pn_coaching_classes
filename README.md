# Pranita Nasare Coaching Classes (Microservices + Micro-frontends)

Full-stack admission system + website for **Pranita Nasare Coaching Classes**.

## Architecture

- **Frontends (React micro-frontends)**
  - `frontend-main`: public website (Home/Courses/About/Contact)
  - `frontend-admission`: admission form + success page
  - `frontend-admin`: admin dashboard (JWT login, search/filter, approve/reject, analytics chart)
- **Backends (Node.js microservices)**
  - `backend-auth`: admin login + JWT issuance
  - `backend-student`: admission APIs + admin listing/status updates + analytics
  - `backend-notification`: email notifications (Nodemailer JSON transport by default)
- **Database**
  - `mongo` via Docker Compose (single DB: `pncoaching`)
- **Gateway**
  - `infra/nginx`: routes micro-frontends and `/api/*` to backend services

## Local setup (Docker)

### Prerequisites

- Docker Desktop (with Compose)

### Run

From repo root:

```bash
docker compose up --build
```

Open:

- **Main website**: `http://localhost:8080/`
- **Admission portal**: `http://localhost:8080/admission/`
- **Admin dashboard**: `http://localhost:8080/admin/`
- **Gateway health**: `http://localhost:8080/healthz`

### Default admin credentials (dev)

Seeded automatically by `backend-auth` (only if no admin exists):

- **Email**: `admin@pncoaching.local`
- **Password**: `Admin@12345`

Change these in `backend-auth/.env`.

## API Routes (through gateway)

Base URL: `http://localhost:8080`

- `POST /api/auth/login`
- `POST /api/students/students` (public admission submit; multipart form-data)
- `GET /api/students/students` (admin; Bearer JWT)
- `PATCH /api/students/students/:id/status` (admin; Bearer JWT)
- `GET /api/students/students/analytics/summary` (admin; Bearer JWT)
- `POST /api/notifications/admission-submitted` (internal)
- `POST /api/notifications/status-updated` (internal)

Postman collection: `postman/pn-coaching-classes.postman_collection.json`

## Environment variables

Each backend service has its own `.env` and `.env.example`:

- `backend-auth/.env`
- `backend-student/.env`
- `backend-notification/.env`

For production, use a secrets manager and **do not commit** real secrets.

## AWS deployment (overview)

Recommended simple setup:

- **EC2**: run Docker Compose
- **Nginx**: reverse proxy + path routing
- **Optional S3/CloudFront**: host static frontends separately

Step-by-step guide: `infra/aws/DEPLOYMENT_EC2.md`

