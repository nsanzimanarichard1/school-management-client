# School Management System - Frontend Applications

Complete frontend solution for School Management System with separate Client and Admin portals.

## Project Overview

This repository contains two React applications:

1. **Client App** - For students and parents
2. **Admin App** - For school administrators and staff

## Quick Start

### Client Application (Port 5173)
```bash
cd client-app
npm install
npm run dev
```

### Admin Application (Port 5174)
```bash
cd admin-app
npm install
npm run dev
```

## Features

### Client Application
- ✅ User registration and login
- ✅ Device verification system
- ✅ Dashboard with fee balance and attendance
- ✅ Fee management (deposits/withdrawals)
- ✅ Academic records (grades, attendance, timetable)
- ✅ Low balance alerts
- ✅ Payment history

### Admin Application
- ✅ Admin authentication
- ✅ Dashboard with statistics
- ✅ User management and device verification
- ✅ Class management
- ✅ Teacher assignment
- ✅ Fee monitoring
- ✅ Transaction tracking

## Technology Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (minimal, clean)

## Project Structure

```
school-management-client/
├── client-app/           # Student/Parent application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── utils/        # Utilities & context
│   │   └── styles/       # CSS files
│   ├── package.json
│   └── README.md
│
├── admin-app/            # Admin application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── utils/        # Utilities & context
│   │   └── styles/       # CSS files
│   ├── package.json
│   └── README.md
│
└── README.md             # This file
```

## Environment Setup

Both applications require a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Copy `.env.example` to `.env` in each app directory and update the API URL.

## API Integration

Both apps are designed to work with a backend API. Expected endpoints:

### Client API Endpoints
- Authentication: `/api/auth/register`, `/api/auth/login`
- Fees: `/api/fees/balance`, `/api/fees/history`, `/api/fees/deposit`, `/api/fees/withdraw`
- Academics: `/api/academics/grades`, `/api/academics/attendance`, `/api/academics/timetable`

### Admin API Endpoints
- Authentication: `/api/admin/login`
- Users: `/api/admin/users`, `/api/admin/users/:id/verify`
- Classes: `/api/admin/classes`
- Teachers: `/api/admin/teachers`
- Stats: `/api/admin/stats`
- Fees: `/api/admin/fees/payments`

## Security Features

- JWT token authentication
- Protected routes
- Device verification system
- Role-based access control
- Secure password handling (SHA-512 on backend)
- Session management
- Auto-logout on token expiry

## Development

### Install all dependencies
```bash
# Client app
cd client-app && npm install

# Admin app
cd ../admin-app && npm install
```

### Run both apps concurrently
```bash
# Terminal 1 - Client
cd client-app && npm run dev

# Terminal 2 - Admin
cd admin-app && npm run dev
```

### Build for production
```bash
# Client app
cd client-app && npm run build

# Admin app
cd admin-app && npm run build
```

## Key Implementation Details

### Authentication Flow
1. User registers/logs in
2. JWT token received and stored in localStorage
3. Token included in all API requests via Axios interceptor
4. Protected routes check for valid token
5. Auto-redirect to login if unauthorized

### State Management
- React Context API for authentication state
- Local component state for page-specific data
- No external state management library (minimal approach)

### Styling Approach
- Vanilla CSS with utility classes
- Responsive design
- Clean, professional UI
- Minimal dependencies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Vite for fast HMR (Hot Module Replacement)
- Code splitting via React Router
- Lazy loading ready
- Optimized production builds

## Testing

To add tests, install testing libraries:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

## Deployment

### Build
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Deploy to hosting
- Vercel: `vercel deploy`
- Netlify: `netlify deploy`
- AWS S3 + CloudFront
- Any static hosting service

## Contributing

1. Follow the existing code structure
2. Keep components minimal and focused
3. Use meaningful variable names
4. Add comments for complex logic
5. Test before committing

## License

MIT License

## Support

For issues or questions, contact: careers@elevandaventures.com

---

**Elevanda Ventures** - Empowering Education Through Technology
