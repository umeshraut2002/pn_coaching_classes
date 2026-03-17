## Database (MongoDB)

Single MongoDB database: `pncoaching`

### Collections

- `admins` (created/used by `backend-auth`)
  - `email`
  - `passwordHash`
  - `role` (currently `admin`)
- `students` (created/used by `backend-student`)
  - `fullName`
  - `classLevel` (`7th` | `8th` | `9th` | `10th`)
  - `schoolName`
  - `parentName`
  - `phoneNumber`
  - `email`
  - `address`
  - `documents[]` (optional metadata about uploaded files)
  - `status` (`pending` | `approved` | `rejected`)

### Notes

- Local development uses the `mongo` container in `docker-compose.yml`.
- For production, prefer **MongoDB Atlas** and rotate credentials.

