# School Management System - Admin Application

Admin portal for managing school operations, users, classes, and monitoring activities.

## Features

- **Dashboard**: View statistics (students, teachers, fees, verifications)
- **User Management**: View all users, verify devices, delete users
- **Class Management**: Create, view, and delete classes, assign teachers
- **Fee Management**: Monitor all transactions and payment statistics
- **Device Verification**: Approve/reject user device access

## Tech Stack

- React 18
- React Router v6
- Axios for API calls
- Vite for fast development

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   copy .env.example .env
   ```
   Update `VITE_API_URL` with your backend API URL

3. **Run development server**
   ```bash
   npm run dev
   ```
   Application runs on http://localhost:5174

4. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
/src
  /components     - Reusable UI components (Navbar)
  /pages          - Page components (Dashboard, Users, Classes, Fees)
  /services       - API service layer
  /utils          - Auth context and utilities
  /styles         - Global CSS
```

## API Endpoints Used

- `POST /api/admin/login` - Admin login
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users/:id/verify` - Verify user device
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/classes` - Get all classes
- `POST /api/admin/classes` - Create class
- `DELETE /api/admin/classes/:id` - Delete class
- `GET /api/admin/teachers` - Get all teachers
- `POST /api/admin/teachers/assign` - Assign teacher to class
- `GET /api/admin/fees/payments` - Get all payments

## Key Features Implementation

### Dashboard
- Real-time statistics display
- Quick overview of school metrics
- Pending verification count

### User Management
- List all registered users
- One-click device verification
- User deletion with confirmation
- Status badges (Verified/Pending)

### Class Management
- Create new classes with form
- Assign teachers to classes
- View student count per class
- Delete classes

### Fee Management
- View all transactions
- Payment statistics
- Status tracking (completed/pending)
- Student-wise payment history

## Security

- Separate admin authentication
- JWT tokens stored securely
- Protected routes
- Role-based access control

## Notes

- Admin credentials required for access
- All actions logged for audit
- Real-time data updates
- Responsive design for all screen sizes
