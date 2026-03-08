# School Management System - Client Application

Frontend application for students and parents to manage their school activities.

## Features

- **Authentication**: Register and login with device verification
- **Dashboard**: View fee balance, payment history, and attendance
- **Fee Management**: Make payments (deposits) and request refunds (withdrawals)
- **Academic Records**: View grades, attendance records, and timetable
- **Alerts**: Low balance warnings and notifications

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
   Application runs on http://localhost:5173

4. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
/src
  /components     - Reusable UI components (Navbar)
  /pages          - Page components (Login, Dashboard, etc.)
  /services       - API service layer
  /utils          - Auth context and utilities
  /styles         - Global CSS
```

## API Endpoints Used

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/fees/balance` - Get fee balance
- `GET /api/fees/history` - Get payment history
- `POST /api/fees/deposit` - Make payment
- `POST /api/fees/withdraw` - Request refund
- `GET /api/academics/grades` - Get grades
- `GET /api/academics/attendance` - Get attendance
- `GET /api/academics/timetable` - Get timetable

## Key Features Implementation

### Authentication
- JWT token stored in localStorage
- Protected routes using PrivateRoute component
- Auto-logout on session expiry

### Fee Management
- Real-time balance display
- Transaction history with status
- Deposit and withdrawal forms with validation

### Academic Records
- Tabbed interface for grades, attendance, and timetable
- Clean table displays for all data

## Notes

- Device verification required before full access
- Sessions managed via JWT tokens
- All API calls include authentication headers
- Error handling with user-friendly messages
