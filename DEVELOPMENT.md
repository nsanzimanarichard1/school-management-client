# Development Guide

## Project Overview

This is a minimal, production-ready implementation of a School Management System frontend with two separate applications:

1. **Client App** - For students and parents
2. **Admin App** - For school administrators

## Architecture Decisions

### Why Two Separate Apps?
- **Security**: Separate authentication and authorization
- **Deployment**: Can be deployed independently
- **Scalability**: Easier to scale and maintain
- **Code Organization**: Clear separation of concerns

### Why Vite?
- Fast development server with HMR
- Optimized production builds
- Modern tooling
- Better developer experience than CRA

### Why Minimal Dependencies?
- Faster installation
- Smaller bundle size
- Less maintenance overhead
- Easier to understand and modify

### Why Context API Instead of Redux?
- Simpler for this use case
- Less boilerplate
- Built into React
- Sufficient for authentication state

## Code Structure

### Component Organization
```
/components  - Reusable UI components (Navbar, etc.)
/pages       - Route-level components (Dashboard, Login, etc.)
/services    - API integration layer
/utils       - Helper functions and context
/styles      - Global CSS
```

### Naming Conventions
- **Components**: PascalCase (e.g., `Dashboard.jsx`)
- **Services**: camelCase (e.g., `authService`)
- **Files**: Match component name
- **CSS Classes**: kebab-case (e.g., `btn-primary`)

## Key Patterns

### Protected Routes
```jsx
const PrivateRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}
```

### API Service Pattern
```javascript
// Centralized API configuration
const api = axios.create({ baseURL: API_URL })

// Interceptor for auth tokens
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Service methods
export const authService = {
  login: (data) => api.post('/auth/login', data)
}
```

### State Management
```jsx
// Context for global state (auth)
const AuthContext = createContext()

// Local state for component-specific data
const [data, setData] = useState([])
```

## Adding New Features

### Adding a New Page

1. **Create page component**
```jsx
// src/pages/NewPage.jsx
import Navbar from '../components/Navbar'

export default function NewPage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>New Page</h1>
      </div>
    </>
  )
}
```

2. **Add route**
```jsx
// src/App.jsx
<Route path="/new" element={<PrivateRoute><NewPage /></PrivateRoute>} />
```

3. **Add navigation link**
```jsx
// src/components/Navbar.jsx
<Link to="/new">New Page</Link>
```

### Adding a New API Service

```javascript
// src/services/api.js
export const newService = {
  getData: () => api.get('/new/data'),
  postData: (data) => api.post('/new/data', data)
}
```

### Adding a New Component

```jsx
// src/components/NewComponent.jsx
export default function NewComponent({ prop1, prop2 }) {
  return (
    <div className="card">
      {/* Component content */}
    </div>
  )
}
```

## Styling Guidelines

### Use Existing Classes
```jsx
<button className="btn btn-primary">Click Me</button>
<div className="card">Content</div>
<div className="alert alert-success">Success!</div>
```

### Add New Styles
```css
/* src/styles/index.css */
.new-class {
  /* styles */
}
```

### Inline Styles (Sparingly)
```jsx
<div style={{ marginBottom: '24px' }}>Content</div>
```

## API Integration

### Expected Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Success message"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message"
}
```

### Handling API Calls

```javascript
const loadData = async () => {
  try {
    const { data } = await service.getData()
    setData(data)
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to load')
  } finally {
    setLoading(false)
  }
}
```

## Environment Variables

### Client App
```env
VITE_API_URL=http://localhost:5000/api
```

### Admin App
```env
VITE_API_URL=http://localhost:5000/api
```

### Usage
```javascript
const API_URL = import.meta.env.VITE_API_URL
```

## Common Tasks

### Update API URL
1. Edit `.env` file
2. Restart dev server

### Add New Dependency
```bash
npm install package-name
```

### Remove Dependency
```bash
npm uninstall package-name
```

### Clear Cache
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Debugging Tips

### React DevTools
- Install React DevTools browser extension
- Inspect component state and props
- Track re-renders

### Network Tab
- Monitor API calls
- Check request/response data
- Verify authentication headers

### Console Logging
```javascript
console.log('Data:', data)
console.error('Error:', error)
```

### Error Boundaries (Optional)
```jsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    console.error('Error:', error, info)
  }
  render() {
    return this.props.children
  }
}
```

## Performance Optimization

### Code Splitting
```jsx
const LazyComponent = React.lazy(() => import('./Component'))

<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

### Memoization
```jsx
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b])
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b])
```

### Avoid Unnecessary Re-renders
```jsx
// Use React.memo for components
export default React.memo(Component)

// Use proper dependency arrays
useEffect(() => {
  // effect
}, [dependency])
```

## Testing (Optional)

### Setup Vitest
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### Example Test
```javascript
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('renders component', () => {
  render(<Component />)
  expect(screen.getByText('Hello')).toBeInTheDocument()
})
```

## Git Workflow

### Commit Messages
```
feat: add user management page
fix: resolve login redirect issue
style: update button styles
refactor: simplify API service
docs: update README
```

### Branch Strategy
```
main        - Production-ready code
develop     - Development branch
feature/*   - New features
fix/*       - Bug fixes
```

## Deployment

### Vercel
```bash
npm install -g vercel
vercel deploy
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Manual
1. Build: `npm run build`
2. Upload `dist/` folder to hosting
3. Configure environment variables
4. Setup redirects for SPA routing

## Security Best Practices

1. **Never commit `.env` files**
2. **Validate all user input**
3. **Use HTTPS in production**
4. **Implement rate limiting on backend**
5. **Sanitize data before display**
6. **Keep dependencies updated**
7. **Use secure headers (backend)**
8. **Implement CSRF protection (backend)**

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port
npx kill-port 5173
```

### Module Not Found
```bash
npm install
```

### Build Fails
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### API CORS Error
- Enable CORS on backend
- Check API URL in `.env`
- Verify backend is running

## Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [React Router Docs](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)

## Support

For questions or issues:
- Check existing documentation
- Review code comments
- Contact: careers@elevandaventures.com

---

**Happy Coding!** 🚀
