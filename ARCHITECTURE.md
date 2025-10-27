# Architecture Documentation

## Overview

This document describes the architectural decisions, patterns, and best practices used in the Iterativ Analytics application.

## Design Principles

### 1. Separation of Concerns
- Clear separation between presentation, business logic, and data layers
- Each module has a single, well-defined responsibility
- No circular dependencies

### 2. Type Safety
- Strict TypeScript throughout the application
- Zod schemas for runtime validation
- Shared types between client and server

### 3. Error Handling
- Centralized error handling on both client and server
- Graceful degradation
- User-friendly error messages

### 4. Security First
- Input validation and sanitization
- Rate limiting
- Security headers
- CORS configuration
- SQL injection prevention

### 5. Performance
- Code splitting and lazy loading
- Efficient database queries
- Caching strategies
- Connection pooling

## Server Architecture

### Layer Structure

```
┌─────────────────────────────────────────┐
│          Routes (HTTP endpoints)         │
├─────────────────────────────────────────┤
│        Controllers (Request handlers)    │
├─────────────────────────────────────────┤
│        Services (Business logic)         │
├─────────────────────────────────────────┤
│       Database (Data persistence)        │
└─────────────────────────────────────────┘

         Middleware (Cross-cutting concerns)
```

### Directory Structure

```
server/
├── config/              # Configuration modules
│   ├── environment.ts   # Environment variables (singleton)
│   ├── logger.ts        # Structured logging (singleton)
│   └── database.ts      # Database connection (singleton)
│
├── middleware/          # Express middleware
│   ├── errorHandler.ts  # Error handling & custom error classes
│   ├── validation.ts    # Request validation with Zod
│   ├── requestLogger.ts # HTTP request logging
│   └── security.ts      # Rate limiting, CORS, security headers
│
├── routes/              # API route definitions
│   ├── index.ts         # Route registration
│   ├── userRoutes.ts
│   ├── documentRoutes.ts
│   ├── analysisRoutes.ts
│   └── activityRoutes.ts
│
├── controllers/         # Request handlers
│   ├── userController.ts
│   ├── documentController.ts
│   ├── analysisController.ts
│   └── activityController.ts
│
├── services/            # Business logic
│   ├── userService.ts
│   ├── documentService.ts
│   ├── analysisService.ts
│   └── activityService.ts
│
├── types/               # TypeScript declarations
│   └── cors.d.ts
│
└── index.ts             # Server entry point
```

### Key Patterns

#### 1. Singleton Pattern
Used for configuration and shared resources:
- `EnvironmentConfig` - Environment variables
- `Logger` - Logging system
- `DatabaseManager` - Database connection

#### 2. Service Layer Pattern
Business logic is isolated in service classes:
```typescript
export class UserService {
  static async createUser(userData: InsertUser): Promise<User> {
    // Validation
    // Business rules
    // Database operations
    // Logging
  }
}
```

#### 3. Controller Pattern
Controllers handle HTTP-specific concerns:
```typescript
export class UserController {
  static createUser = asyncHandler(async (req, res) => {
    const userData = insertUserSchema.parse(req.body);
    const user = await UserService.createUser(userData);
    res.status(201).json({ status: 'success', data: { user } });
  });
}
```

#### 4. Middleware Chain
Request processing pipeline:
```
Request → Security → CORS → Body Parser → Logger → 
  Routes → Validation → Controller → Service → Database
```

#### 5. Error Handling Strategy
```typescript
// Custom error classes
class AppError extends Error {
  constructor(public statusCode: number, public message: string) {}
}

// Centralized error handler
export const errorHandler = (err, req, res, next) => {
  // Log error
  // Transform to user-friendly message
  // Send appropriate HTTP response
};

// Async handler wrapper
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
```

### Configuration Management

#### Environment Variables
```typescript
class EnvironmentConfig {
  private static instance: EnvironmentConfig;
  private config: Environment;

  private constructor() {
    // Validate with Zod on startup
    this.config = envSchema.parse(process.env);
  }

  public get<K extends keyof Environment>(key: K): Environment[K] {
    return this.config[key];
  }
}
```

Benefits:
- Type-safe environment access
- Validation on startup (fail fast)
- Single source of truth
- No magic strings

### Database Layer

#### Connection Management
```typescript
class DatabaseManager {
  private static instance: DatabaseManager;
  private client: postgres.Sql | null = null;
  private db: ReturnType<typeof drizzle> | null = null;

  async connect(): Promise<void> {
    // Initialize connection
    // Test connection
    // Handle errors
  }

  async disconnect(): Promise<void> {
    // Graceful shutdown
  }
}
```

Benefits:
- Connection pooling
- Graceful shutdown
- Health checks
- Error recovery

#### Query Pattern
```typescript
// Service layer uses Drizzle ORM
const users = await db.getDb()
  .select()
  .from(schema.users)
  .where(eq(schema.users.id, id));
```

Benefits:
- Type-safe queries
- SQL injection prevention
- IntelliSense support
- Composable queries

## Client Architecture

### Component Structure

```
┌─────────────────────────────────────────┐
│         Pages (Route components)         │
├─────────────────────────────────────────┤
│    Feature Components (Domain logic)     │
├─────────────────────────────────────────┤
│      UI Components (Presentation)        │
└─────────────────────────────────────────┘

    Hooks → Services → API Client → Server
```

### Directory Structure

```
client/src/
├── components/
│   ├── common/          # Shared components
│   │   ├── ErrorBoundary.tsx
│   │   └── LoadingSpinner.tsx
│   ├── ui/              # shadcn/ui components
│   └── ...              # Feature components
│
├── hooks/               # Custom React hooks
│   ├── useApi.ts        # Data fetching hooks
│   ├── use-toast.ts     # Toast notifications
│   └── ...
│
├── lib/
│   ├── api/             # API layer
│   │   ├── client.ts    # HTTP client
│   │   └── services.ts  # API services
│   ├── constants/       # Application constants
│   │   └── app.ts
│   ├── helpers/         # Utility functions
│   │   ├── validation.ts
│   │   └── format.ts
│   └── utils.ts
│
├── pages/               # Page components
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   └── ...
│
├── context/             # React contexts
│   └── ThemeContext.tsx
│
└── main.tsx             # App entry point
```

### Key Patterns

#### 1. API Client Pattern
```typescript
class ApiClient {
  private baseUrl: string;

  async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    // Make request
    // Handle errors
    // Return typed data
  }

  async get<T>(endpoint: string): Promise<T> { }
  async post<T>(endpoint: string, data?: any): Promise<T> { }
  // ... other methods
}

export const apiClient = new ApiClient('/api');
```

Benefits:
- Centralized HTTP logic
- Type-safe responses
- Error handling
- Easy to mock

#### 2. Service Layer Pattern
```typescript
export const userService = {
  getAll: () => apiClient.get<{ users: User[] }>('/users'),
  getById: (id: number) => apiClient.get<{ user: User }>(`/users/${id}`),
  create: (data) => apiClient.post<{ user: User }>('/users', data),
  // ... other methods
};
```

Benefits:
- Organized by domain
- Easy to test
- Single source of truth
- Consistent interface

#### 3. React Query Hooks Pattern
```typescript
export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: () => userService.getAll(),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      toast({ title: 'Success' });
    },
  });
}
```

Benefits:
- Automatic caching
- Optimistic updates
- Loading states
- Error handling
- Cache invalidation

#### 4. Error Boundary Pattern
```typescript
export class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

Benefits:
- Prevents app crashes
- User-friendly error UI
- Error reporting
- Graceful recovery

### State Management Strategy

1. **Server State**: React Query
   - API data
   - Caching
   - Background updates

2. **Local UI State**: useState/useReducer
   - Form inputs
   - Modal states
   - UI toggles

3. **Global App State**: Context API
   - Authentication
   - Theme
   - User preferences

4. **URL State**: Wouter
   - Current page
   - Query parameters

### Type Safety

#### Shared Types
```typescript
// shared/schema.ts
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
```

Benefits:
- Single source of truth
- Type safety across layers
- No drift between client/server

#### Validation Schemas
```typescript
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

type LoginForm = z.infer<typeof loginSchema>;
```

Benefits:
- Runtime validation
- Type inference
- Consistent rules
- Error messages

## Security Considerations

### Input Validation
- Zod schemas on both client and server
- Whitelist approach (define allowed, reject rest)
- Sanitization of user input

### Authentication & Authorization
- Firebase Authentication integration
- Session management
- Token validation
- Role-based access (future enhancement)

### Data Protection
- Parameterized queries (SQL injection prevention)
- CORS configuration
- Rate limiting
- Security headers

### Error Handling
- No sensitive data in error messages
- Generic errors to clients
- Detailed logs server-side

## Performance Optimization

### Server
- Connection pooling
- Query optimization
- Caching strategies
- Compression
- Rate limiting

### Client
- Code splitting
- Lazy loading
- Image optimization
- React Query caching
- Memoization

### Database
- Indexes on foreign keys
- Query optimization
- Connection limits

## Testing Strategy

### Unit Tests
- Service layer functions
- Utility functions
- Validation logic

### Integration Tests
- API endpoints
- Database operations
- Authentication flow

### E2E Tests
- Critical user flows
- Form submissions
- Navigation

## Deployment Considerations

### Environment Setup
1. Production database with backups
2. Environment variables securely stored
3. SSL/TLS certificates
4. Monitoring and logging
5. CI/CD pipeline

### Scaling Strategy
1. Horizontal scaling (multiple instances)
2. Database read replicas
3. Caching layer (Redis)
4. CDN for static assets
5. Load balancing

### Monitoring
- Application logs
- Error tracking
- Performance metrics
- Database queries
- API response times

## Future Enhancements

1. **Authentication & Authorization**
   - JWT tokens
   - Refresh tokens
   - Role-based access control
   - OAuth providers

2. **Real-time Features**
   - WebSocket support
   - Live notifications
   - Collaborative editing

3. **Advanced Features**
   - File upload/download
   - Email notifications
   - Search functionality
   - Advanced analytics

4. **DevOps**
   - Docker containers
   - Kubernetes orchestration
   - Automated testing
   - CI/CD pipeline

5. **Testing**
   - Comprehensive test suite
   - E2E testing
   - Performance testing
   - Security testing

## Conclusion

This architecture provides a solid foundation for a scalable, maintainable, and secure application. The patterns and practices used ensure code quality, type safety, and developer productivity while maintaining flexibility for future enhancements.
