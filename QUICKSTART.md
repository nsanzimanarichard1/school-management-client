# Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running (default: http://localhost:5000)

## Installation

### Option 1: Automated Setup (Windows)
```bash
setup.bat
```

### Option 2: Manual Setup

#### Client App
```bash
cd client-app
copy .env.example .env
npm install
npm run dev
```
Access at: http://localhost:5173

#### Admin App
```bash
cd admin-app
copy .env.example .env
npm install
npm run dev
```
Access at: http://localhost:5174

## Configuration

Update `.env` files in both apps:
```env
VITE_API_URL=http://localhost:5000/api
```

## Default Credentials (Backend Setup Required)

### Client App
- Register new account at `/register`
- Wait for admin verification
- Login at `/login`

### Admin App
- Use admin credentials from backend
- Login at `/login`

## Features Checklist

### Client App ✅
- [x] User Registration
- [x] User Login
- [x] Dashboard with Stats
- [x] Fee Balance Display
- [x] Payment History
- [x] Deposit (Payment)
- [x] Withdraw (Refund Request)
- [x] View Grades
- [x] View Attendance
- [x] View Timetable
- [x] Low Balance Alert

### Admin App ✅
- [x] Admin Login
- [x] Dashboard Statistics
- [x] User Management
- [x] Device Verification
- [x] Class Management
- [x] Teacher Assignment
- [x] Fee Monitoring
- [x] Transaction Tracking

## Troubleshooting

### Port Already in Use
```bash
# Change port in package.json scripts
"dev": "vite --port 3000"
```

### API Connection Failed
- Verify backend is running
- Check `.env` file has correct API URL
- Ensure CORS is enabled on backend

### Dependencies Installation Failed
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

1. **Hot Reload**: Both apps support hot module replacement
2. **API Mocking**: Use browser dev tools to test without backend
3. **Debugging**: React DevTools extension recommended
4. **Code Style**: Follow existing patterns for consistency

## Next Steps

1. ✅ Setup both frontend apps
2. ⏳ Setup backend API
3. ⏳ Connect frontend to backend
4. ⏳ Test all features
5. ⏳ Deploy to production

## Support

For issues:
1. Check README.md in each app folder
2. Review API endpoint documentation
3. Contact: careers@elevandaventures.com

---
**Happy Coding!** 🚀
