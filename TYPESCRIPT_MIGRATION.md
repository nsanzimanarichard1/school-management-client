# 🚀 School Management System - TypeScript + React Query + Zod

Modern, type-safe implementation with automatic error handling and data validation.

## ✨ Tech Stack Upgrade

### Previous Stack
- ❌ JavaScript
- ❌ Manual error handling
- ❌ No validation
- ❌ Manual loading states

### New Stack
- ✅ **TypeScript** - Full type safety
- ✅ **React Query** - Automatic caching, refetching, error handling
- ✅ **Zod** - Runtime validation with type inference
- ✅ **Axios** - HTTP client with interceptors

## 🎯 Key Benefits

### TypeScript
- Catch errors at compile time
- Better IDE autocomplete
- Self-documenting code
- Refactoring confidence

### React Query
- Automatic caching
- Background refetching
- Optimistic updates
- Loading/error states handled
- Query invalidation
- No manual useState/useEffect

### Zod
- Runtime validation
- Type inference
- Clear error messages
- Schema composition

## 📦 Installation

```bash
# Client App
cd client-app
npm install
npm run dev

# Admin App
cd admin-app
npm install
npm run dev
```

## 🏗️ Project Structure

```
client-app/src/
├── types/          # TypeScript interfaces
├── schemas/        # Zod validation schemas
├── services/
│   ├── api.ts      # Axios API client
│   └── queries.ts  # React Query hooks
├── pages/          # Page components
├── components/     # Reusable components
└── utils/          # Auth context

admin-app/src/
├── types/          # TypeScript interfaces
├── schemas/        # Zod validation schemas
├── services/
│   ├── api.ts      # Axios API client
│   └── queries.ts  # React Query hooks
├── pages/          # Page components
├── components/     # Reusable components
└── utils/          # Auth context
```

## 🔥 React Query Usage

### Before (Manual)
```typescript
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await api.get('/data')
      setData(res.data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [])
```

### After (React Query)
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['data'],
  queryFn: () => api.get('/data')
})
```

## 🛡️ Zod Validation

### Schema Definition
```typescript
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type LoginInput = z.infer<typeof loginSchema>
```

### Usage in Forms
```typescript
const result = loginSchema.safeParse(formData)
if (!result.success) {
  // Handle validation errors
  result.error.errors.forEach(err => {
    console.log(err.path, err.message)
  })
}
```

## 🎨 React Query Hooks

### Queries (GET)
```typescript
export const useFeeBalance = () => {
  return useQuery({
    queryKey: ['feeBalance'],
    queryFn: feeService.getBalance
  })
}
```

### Mutations (POST/PUT/DELETE)
```typescript
export const useDeposit = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: feeService.deposit,
    onSuccess: () => {
      // Auto-refresh related queries
      queryClient.invalidateQueries({ queryKey: ['feeBalance'] })
    }
  })
}
```

## 📝 Type Safety Examples

### API Response Types
```typescript
interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'parent'
  isVerified: boolean
}

interface AuthResponse {
  user: User
  token: string
}
```

### Typed API Functions
```typescript
const login = async (data: LoginInput): Promise<AuthResponse> => {
  const res = await api.post('/auth/login', data)
  return res.data
}
```

## 🚀 Features

### Automatic Features from React Query
- ✅ Caching (5 min default)
- ✅ Background refetching
- ✅ Retry on failure (1 retry)
- ✅ Loading states
- ✅ Error handling
- ✅ Query invalidation
- ✅ Optimistic updates

### Type Safety
- ✅ Compile-time error checking
- ✅ IDE autocomplete
- ✅ Refactoring safety
- ✅ Self-documenting code

### Validation
- ✅ Runtime validation with Zod
- ✅ Type inference
- ✅ Clear error messages
- ✅ Form validation

## 📊 Performance

- **Bundle Size**: Minimal increase (~50KB for React Query + Zod)
- **Runtime**: Faster with caching
- **Developer Experience**: Significantly improved
- **Type Safety**: 100%

## 🔧 Configuration

### React Query Config
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000 // 5 minutes
    }
  }
})
```

### TypeScript Config
- Strict mode enabled
- No unused locals/parameters
- Full type checking

## 📚 Documentation

- [React Query Docs](https://tanstack.com/query/latest)
- [Zod Docs](https://zod.dev)
- [TypeScript Docs](https://www.typescriptlang.org)

## 🎯 Migration Benefits

| Feature | Before | After |
|---------|--------|-------|
| Type Safety | ❌ None | ✅ Full |
| Error Handling | ❌ Manual | ✅ Automatic |
| Loading States | ❌ Manual | ✅ Automatic |
| Caching | ❌ None | ✅ Built-in |
| Validation | ❌ Manual | ✅ Zod schemas |
| Refetching | ❌ Manual | ✅ Automatic |
| Code Size | Smaller | Slightly larger |
| DX | Good | Excellent |

## 🚀 Next Steps

1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Build for production: `npm run build`

---

**Status**: ✅ Complete with TypeScript, React Query, and Zod
