# Quick Start Guide

Get Iterativ Analytics up and running in 5 minutes.

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- Terminal/Command Line access

## 🚀 Setup Steps

### 1. Install Dependencies (1 minute)

```bash
cd "/Users/iterativai/Downloads/IterativAnalytics 2"
npm install
```

### 2. Configure Environment (1 minute)

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
nano .env  # or use any text editor
```

**Minimum required:**
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/iterativ_analytics
```

### 3. Setup Database (1 minute)

```bash
# Create database
createdb iterativ_analytics

# Push schema
npm run db:push
```

### 4. Start Development Server (30 seconds)

```bash
npm run dev
```

✅ **Server running at:** http://localhost:5000
✅ **API available at:** http://localhost:5000/api
✅ **Health check:** http://localhost:5000/health

## 🧪 Verify Installation

### Test Health Endpoint

```bash
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

### Test API Endpoint

```bash
curl http://localhost:5000/api/users
```

## 📚 Next Steps

1. **Read Documentation**
   - [README.md](./README.md) - Full documentation
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture guide
   - [TESTING.md](./TESTING.md) - Testing guide

2. **Explore API**
   - Check [README.md](./README.md#api-documentation) for all endpoints
   - Try creating users, documents, analyses

3. **Start Development**
   - Hot reload enabled
   - Check console for logs
   - Modify files and see changes

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Database Connection Error

```bash
# Verify PostgreSQL is running
pg_isready

# Check connection string format
echo $DATABASE_URL
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📖 Common Commands

```bash
# Development
npm run dev         # Start dev server
npm run check       # Type check

# Database
npm run db:push     # Push schema changes

# Production
npm run build       # Build for production
npm start          # Start production server
```

## 🎯 Development Workflow

1. **Make changes** to code files
2. **Save** - Hot reload updates automatically
3. **Check console** for logs and errors
4. **Test** API endpoints with curl or Postman
5. **Commit** changes when ready

## 💡 Pro Tips

- Use VS Code for best TypeScript experience
- Install recommended extensions for linting
- Check terminal logs for detailed error messages
- Use React DevTools for frontend debugging
- Enable React Query DevTools (see code comments)

## 🔗 Quick Links

- **Frontend:** http://localhost:5000
- **API Base:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/health

## 🆘 Need Help?

1. Check [TESTING.md](./TESTING.md) for testing guide
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for structure
3. Read error messages carefully - they're descriptive!
4. Check server logs in terminal

---

**Ready to build! 🚀**
