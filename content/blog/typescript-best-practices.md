---
title: "TypeScript Best Practices for React Developers"
date: "2024-01-05"
excerpt: "Learn essential TypeScript patterns and best practices that will make your React applications more robust and maintainable."
author: "Anand Jaiswal"
tags: ["TypeScript", "React", "Best Practices", "Development"]
---

# TypeScript Best Practices for React Developers

TypeScript has become the standard for building large-scale React applications. Here are the essential patterns and best practices every React developer should know.

## Component Props Typing

### Basic Props Interface
Always define interfaces for your component props:

```typescript
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  disabled = false 
}) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```

### Extending HTML Attributes
Extend native HTML attributes for better reusability:

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  )
}
```

## State Management

### useState with TypeScript
Properly type your state:

```typescript
// Simple state
const [count, setCount] = useState<number>(0)

// Complex state
interface User {
  id: string
  name: string
  email: string
}

const [user, setUser] = useState<User | null>(null)

// Array state
const [items, setItems] = useState<string[]>([])
```

### useReducer Pattern
For complex state logic:

```typescript
interface State {
  loading: boolean
  data: User[]
  error: string | null
}

type Action = 
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: User[] }
  | { type: 'FETCH_ERROR'; payload: string }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
```

## Custom Hooks

### Typed Custom Hooks
Create reusable, well-typed hooks:

```typescript
interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(url)
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
```

## Event Handling

### Properly Typed Event Handlers
Use specific event types:

```typescript
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  // Handle form submission
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value)
}

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log('Button clicked')
}
```

## Generic Components

### Flexible, Reusable Components
Create components that work with different data types:

```typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T) => string | number
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  )
}

// Usage
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/>
```

## API Integration

### Typed API Responses
Define interfaces for your API responses:

```typescript
interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

const fetchUsers = async (): Promise<ApiResponse<User[]>> => {
  const response = await fetch('/api/users')
  return response.json()
}
```

## Utility Types

### Leverage TypeScript's Built-in Utilities
Use utility types for better type safety:

```typescript
// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name'>

// Make all properties optional
type PartialUser = Partial<User>

// Make specific properties required
type RequiredUser = Required<Pick<User, 'name' | 'email'>>

// Exclude properties
type UserWithoutId = Omit<User, 'id'>

// Create union types
type Status = 'loading' | 'success' | 'error'
```

## Error Boundaries

### Typed Error Boundaries
Create type-safe error boundaries:

```typescript
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>
    }

    return this.props.children
  }
}
```

## Best Practices Summary

1. **Always Type Props**: Define interfaces for all component props
2. **Use Strict Mode**: Enable strict TypeScript settings
3. **Avoid `any`**: Use specific types or `unknown` instead
4. **Leverage Utility Types**: Use built-in TypeScript utilities
5. **Type Event Handlers**: Use specific event types
6. **Create Generic Components**: Build reusable, flexible components
7. **Type API Responses**: Define interfaces for external data
8. **Use Custom Hooks**: Extract logic into typed custom hooks

## Conclusion

TypeScript transforms React development by providing type safety, better IDE support, and improved maintainability. By following these patterns and best practices, you'll write more robust and scalable React applications.

Remember: good TypeScript is about finding the right balance between type safety and developer productivity.

---

*Ready to level up your TypeScript skills? Check out my other articles on advanced React patterns and modern web development!*
