# Testing Guide

## Overview

This guide provides instructions for testing the Iterativ Analytics application.

## Quick Start Testing

### 1. Health Check

After starting the server, verify it's running:

```bash
# Start the server
npm run dev

# In another terminal, test the health endpoint
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development",
  "database": "connected"
}
```

### 2. API Endpoint Testing

#### Test User Creation

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "SecurePass123",
    "name": "Test User",
    "userType": "startup"
  }'
```

Expected response:
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "username": "testuser",
      "name": "Test User",
      "userType": "startup",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### Test Getting Users

```bash
curl http://localhost:5000/api/users
```

#### Test Error Handling

```bash
# Invalid data should return 400
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ab",
    "password": "short"
  }'
```

Expected response:
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [...]
}
```

## Manual Testing Checklist

### Server Endpoints

#### Users API
- [ ] POST /api/users - Create user with valid data
- [ ] POST /api/users - Reject invalid username (too short)
- [ ] POST /api/users - Reject duplicate username
- [ ] GET /api/users - List all users
- [ ] GET /api/users/:id - Get specific user
- [ ] GET /api/users/username/:username - Get user by username
- [ ] PUT /api/users/:id - Update user
- [ ] DELETE /api/users/:id - Delete user
- [ ] Verify passwords are not returned in responses

#### Documents API
- [ ] POST /api/documents - Create document
- [ ] GET /api/documents - List all documents
- [ ] GET /api/documents/:id - Get specific document
- [ ] GET /api/documents/user/:userId - Get user's documents
- [ ] PUT /api/documents/:id - Update document
- [ ] DELETE /api/documents/:id - Delete document

#### Analyses API
- [ ] POST /api/analyses - Create analysis
- [ ] GET /api/analyses - List all analyses
- [ ] GET /api/analyses/:id - Get specific analysis
- [ ] GET /api/analyses/document/:documentId - Get document analysis
- [ ] PUT /api/analyses/:id - Update analysis
- [ ] DELETE /api/analyses/:id - Delete analysis

#### Activities API
- [ ] POST /api/activities - Create activity
- [ ] GET /api/activities/recent - Get recent activities
- [ ] GET /api/activities/:id - Get specific activity
- [ ] GET /api/activities/user/:userId - Get user activities
- [ ] GET /api/activities/document/:documentId - Get document activities
- [ ] DELETE /api/activities/:id - Delete activity

### Error Handling
- [ ] 404 for non-existent routes
- [ ] 400 for validation errors
- [ ] 404 for non-existent resources
- [ ] 500 for server errors (with proper logging)
- [ ] No sensitive data in error responses

### Security
- [ ] CORS headers present
- [ ] Security headers (X-Frame-Options, etc.)
- [ ] Rate limiting works (try 100+ requests)
- [ ] SQL injection prevention (try malicious input)
- [ ] XSS prevention (try script tags in input)

### Client Application

#### Pages
- [ ] Home page loads
- [ ] Dashboard loads (if authenticated)
- [ ] 404 page for invalid routes
- [ ] Navigation works between pages

#### Authentication (Firebase)
- [ ] Login form validation
- [ ] Registration form validation
- [ ] Login succeeds with valid credentials
- [ ] Login fails with invalid credentials
- [ ] Logout works
- [ ] Protected routes redirect to login

#### Error Handling
- [ ] Error boundary catches errors
- [ ] Toast notifications show for API errors
- [ ] Loading states display correctly
- [ ] Network errors handled gracefully

#### Performance
- [ ] Pages load quickly
- [ ] No console errors
- [ ] No memory leaks
- [ ] Responsive on mobile devices

## Integration Testing

### Database Operations

```bash
# Push schema to database
npm run db:push

# Verify tables created
psql $DATABASE_URL -c "\dt"
```

Expected tables:
- users
- documents
- analyses
- activities

### End-to-End User Flow

1. **User Registration**
   - Navigate to registration page
   - Fill form with valid data
   - Submit and verify success
   - Check database for new user

2. **User Login**
   - Navigate to login page
   - Enter credentials
   - Verify redirect to dashboard
   - Check session/token stored

3. **Document Upload**
   - Navigate to documents page
   - Upload a document
   - Verify document appears in list
   - Check database for document record

4. **View Analysis**
   - Select a document
   - View its analysis
   - Verify scores displayed correctly
   - Check database for analysis record

5. **Activity Tracking**
   - Perform various actions
   - Check activities list
   - Verify recent activities displayed

## Performance Testing

### Load Testing with curl

```bash
# Test rate limiting (should fail after 100 requests)
for i in {1..150}; do
  curl -s http://localhost:5000/api/users > /dev/null &
done
wait
```

### Database Query Performance

```sql
-- Check slow queries
SELECT query, mean_exec_time, calls 
FROM pg_stat_statements 
ORDER BY mean_exec_time DESC 
LIMIT 10;
```

## Common Issues & Solutions

### Database Connection Failed
```bash
# Verify DATABASE_URL is correct
echo $DATABASE_URL

# Check PostgreSQL is running
pg_isready

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Port Already in Use
```bash
# Find process using port 5000
lsof -ti:5000

# Kill the process
lsof -ti:5000 | xargs kill -9
```

### TypeScript Errors
```bash
# Run type check
npm run check

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Issues
- Verify `CORS_ORIGIN` in `.env`
- Check browser console for CORS errors
- Ensure frontend and backend URLs match

## Automated Testing (Future)

### Unit Tests Structure
```
tests/
├── server/
│   ├── services/
│   │   ├── userService.test.ts
│   │   ├── documentService.test.ts
│   │   └── ...
│   └── utils/
│       └── validation.test.ts
└── client/
    ├── components/
    │   └── ...
    └── hooks/
        └── useApi.test.ts
```

### Running Tests
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

## Continuous Integration

### Pre-commit Checks
```bash
# Type check
npm run check

# Lint
npm run lint

# Format
npm run format
```

### CI/CD Pipeline
1. Run type checks
2. Run linter
3. Run tests
4. Build application
5. Deploy if all pass

## Monitoring & Debugging

### Server Logs

```bash
# View server logs
tail -f server.log

# Filter errors only
tail -f server.log | grep ERROR
```

### Database Monitoring

```sql
-- Active connections
SELECT * FROM pg_stat_activity;

-- Table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Client Debugging

```javascript
// Enable React Query DevTools (add to main.tsx)
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

## Quality Assurance Checklist

### Code Quality
- [ ] No TypeScript errors
- [ ] No console.log in production code
- [ ] Consistent code formatting
- [ ] Meaningful variable names
- [ ] JSDoc comments on functions
- [ ] Error handling implemented
- [ ] Input validation present

### Security
- [ ] No hardcoded secrets
- [ ] Environment variables used
- [ ] SQL injection prevented
- [ ] XSS attacks prevented
- [ ] CSRF protection (if needed)
- [ ] Rate limiting active
- [ ] Security headers set

### Performance
- [ ] Database queries optimized
- [ ] Images optimized
- [ ] Code split appropriately
- [ ] Lazy loading implemented
- [ ] No memory leaks
- [ ] Fast page load times

### Accessibility
- [ ] Semantic HTML used
- [ ] ARIA labels present
- [ ] Keyboard navigation works
- [ ] Color contrast sufficient
- [ ] Screen reader friendly

### User Experience
- [ ] Loading states shown
- [ ] Error messages clear
- [ ] Success feedback given
- [ ] Forms validate properly
- [ ] Mobile responsive
- [ ] Intuitive navigation

## Reporting Issues

When reporting bugs, include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Error messages/screenshots
5. Environment (browser, OS, Node version)
6. Request/response data (if API issue)

## Conclusion

Regular testing ensures application quality and reliability. Follow this guide to thoroughly test all aspects of the application before deployment.
