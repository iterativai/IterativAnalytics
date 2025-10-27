# Iterativ Analytics

> AI-powered analytics platform for African startups and investors

## 🌟 Overview

Iterativ Analytics is an enterprise-grade full-stack application built with modern technologies and best practices. It provides comprehensive analytics, document management, and AI-powered insights for startups and investors.

## 🎨 Design System

IterativAnalytics features a comprehensive design system ensuring consistency, accessibility, and quality across all touchpoints.

**📚 Documentation:**
- **[DESIGN_PRINCIPLES.md](./DESIGN_PRINCIPLES.md)** - Core design principles that guide all decisions
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Complete design system guide with strategic guidelines
- **[DESIGN_SYSTEM_QUICKREF.md](./DESIGN_SYSTEM_QUICKREF.md)** - Quick reference for daily development

**Key Features:**
- 🎯 African-first design approach (optimized for connectivity and mobile)
- ♿ WCAG 2.1 AA accessibility standards
- 📱 Mobile-first responsive components
- ⚡ Performance-optimized patterns
- 🎨 Comprehensive component library (70+ components)
- 🌗 Dark mode and sector-based theming
- 🔧 Design tokens and CSS variables

**Quick Start:**
```tsx
import { Button, Card, Badge } from '@/components/ui';

<Card variant="premium">
  <CardContent>
    <h3>Revenue Growth</h3>
    <Badge variant="success">+12.5%</Badge>
  </CardContent>
</Card>
```

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- TanStack Query for data fetching
- Tailwind CSS + shadcn/ui for styling
- Wouter for routing
- Zod for validation
- Firebase Authentication

**Backend:**
- Node.js + Express
- TypeScript (ESM)
- Drizzle ORM + PostgreSQL
- Zod for validation
- Structured logging
- Comprehensive error handling

### Project Structure

```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── common/   # Reusable components
│   │   │   ├── ui/       # shadcn/ui components
│   │   │   └── ...
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and helpers
│   │   │   ├── api/      # API client and services
│   │   │   ├── constants/# Application constants
│   │   │   └── helpers/  # Helper functions
│   │   ├── pages/        # Page components
│   │   └── ...
├── server/                # Backend application
│   ├── config/           # Configuration modules
│   │   ├── database.ts   # Database connection
│   │   ├── environment.ts# Environment variables
│   │   └── logger.ts     # Logging configuration
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Express middleware
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── index.ts          # Server entry point
├── shared/               # Shared code
│   └── schema.ts         # Database schema & types
└── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd /path/to/IterativAnalytics
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**
   ```bash
   # Create PostgreSQL database
   createdb iterativ_analytics
   
   # Push schema to database
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## 📦 Available Scripts

### Development
- `npm run dev` - Start development server (frontend + backend)
- `npm run check` - Type check TypeScript code

### Database
- `npm run db:push` - Push database schema changes

### Production
- `npm run build` - Build for production
- `npm start` - Start production server

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | No | `development` |
| `PORT` | Server port | No | `5000` |
| `DATABASE_URL` | PostgreSQL connection string | Yes* | - |
| `SESSION_SECRET` | Session secret key | No | `dev-secret` |
| `FIREBASE_API_KEY` | Firebase API key | No | - |
| `AZURE_OPENAI_ENDPOINT` | Azure OpenAI endpoint | No | - |
| `CORS_ORIGIN` | CORS allowed origins | No | `http://localhost:5000` |
| `LOG_LEVEL` | Logging level | No | `info` |

*Required for full functionality

## 🏛️ Architecture Patterns

### Server Architecture

**Layered Architecture:**
```
Routes → Controllers → Services → Database
     ↓
Middleware (validation, auth, logging)
```

**Key Features:**
- ✅ Centralized error handling
- ✅ Request validation with Zod
- ✅ Structured logging
- ✅ Rate limiting
- ✅ Security headers
- ✅ Graceful shutdown
- ✅ Health check endpoint

### Client Architecture

**Component Organization:**
```
Pages → Feature Components → UI Components
    ↓
Hooks (data fetching, state management)
    ↓
API Services → API Client
```

**Key Features:**
- ✅ Type-safe API client
- ✅ React Query for data fetching
- ✅ Error boundaries
- ✅ Form validation
- ✅ Responsive design
- ✅ Progressive Web App (PWA)

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/username/:username` - Get user by username
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

#### Documents
- `GET /api/documents` - Get all documents
- `GET /api/documents/:id` - Get document by ID
- `GET /api/documents/user/:userId` - Get user documents
- `POST /api/documents` - Create document
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document

#### Analyses
- `GET /api/analyses` - Get all analyses
- `GET /api/analyses/:id` - Get analysis by ID
- `GET /api/analyses/document/:documentId` - Get document analysis
- `POST /api/analyses` - Create analysis
- `PUT /api/analyses/:id` - Update analysis
- `DELETE /api/analyses/:id` - Delete analysis

#### Activities
- `GET /api/activities/recent` - Get recent activities
- `GET /api/activities/:id` - Get activity by ID
- `GET /api/activities/user/:userId` - Get user activities
- `GET /api/activities/document/:documentId` - Get document activities
- `POST /api/activities` - Create activity
- `DELETE /api/activities/:id` - Delete activity

### Response Format

**Success Response:**
```json
{
  "status": "success",
  "data": {
    // Response data
  }
}
```

**Error Response:**
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Error message",
  "errors": {} // Optional validation errors
}
```

## 🔒 Security

- CORS configuration
- Security headers (X-Frame-Options, CSP, etc.)
- Rate limiting
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- XSS prevention
- CSRF protection

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Type checking
npm run check
```

## 📈 Performance Optimization

- Code splitting
- Lazy loading
- Image optimization
- Caching strategies
- Database query optimization
- Connection pooling

## 🚢 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Setup

1. Set `NODE_ENV=production`
2. Configure production database
3. Set strong `SESSION_SECRET`
4. Configure CORS origins
5. Set up SSL/TLS
6. Configure reverse proxy (nginx)

### Recommended Hosting

- **Frontend + Backend**: Vercel, Railway, Render
- **Database**: Neon, Supabase, Railway
- **Static Assets**: Cloudflare, AWS S3

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript strictly
3. Write meaningful commit messages
4. Add JSDoc comments to functions
5. Validate data with Zod schemas
6. Handle errors appropriately
7. Write tests for new features

## 📝 Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Consistent indentation
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: JSDoc for functions, inline for complex logic
- **Imports**: Absolute imports using `@/` alias

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
pg_isready

# Verify DATABASE_URL format
postgresql://user:password@host:port/database
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Resources

- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [TanStack Query](https://tanstack.com/query)
- [shadcn/ui](https://ui.shadcn.com/)

## 📄 License

MIT

## 👥 Support

For support, please contact the development team or open an issue in the repository.

---

**Built with ❤️ for African innovation**
