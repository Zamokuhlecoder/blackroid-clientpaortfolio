# 📋 Quick Reference Card

## Essential Commands

### Development
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
```

### Database
```bash
npm run prisma:push      # Create/update database schema
npm run prisma:migrate   # Run migrations
npm run prisma:generate  # Generate Prisma types
npm run prisma:studio    # Open GUI database viewer
```

### Code Quality
```bash
npm run lint             # Check for errors
npm run typecheck        # TypeScript validation
npm run format           # Format code
```

---

## Environment Variables

Required in `.env.local`:
```
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="[generated hex]"
NEXTAUTH_URL="http://localhost:3000"
```

Generate secret:
```bash
openssl rand -hex 32
```

---

## URLs

### Development
```
Home:       http://localhost:3000
Sign Up:    http://localhost:3000/auth/signup
Sign In:    http://localhost:3000/auth/signin
Dashboard:  http://localhost:3000/dashboard
```

### Production (Vercel)
```
Replace localhost:3000 with your domain
Example: https://yourdomain.vercel.app
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/signin` | Sign in user |
| POST | `/api/auth/signup` | Create account |
| POST | `/api/auth/signout` | Sign out user |
| GET | `/api/auth/session` | Get session info |

### Projects
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Create new project |
| GET | `/api/projects/[id]` | Get project details |
| PUT | `/api/projects/[id]` | Update project |
| DELETE | `/api/projects/[id]` | Delete project |

---

## Project Status Values

```
planning      - Project in planning phase
in-progress   - Work actively happening
completed     - Project finished
```

---

## Project Progress

```
0-25%    = Early stage
25-50%   = Mid-way
50-75%   = Nearly done
75-100%  = Finishing touches
100%     = Completed
```

---

## Troubleshooting Quick Fixes

### Database Won't Connect
```bash
# Check DATABASE_URL is correct
# Restart server: npm run dev
```

### Sign Up Fails
```bash
# Check NEXTAUTH_SECRET is set
# Verify database is running
# Restart server
```

### Dashboard Shows No Projects
```bash
# Verify user is logged in
# Check database has projects
# Run: npm run prisma:studio
```

### Type Errors
```bash
npm run typecheck
npm run prisma:generate
npm run dev
```

---

## File Locations

| File | Purpose |
|------|---------|
| `src/auth.ts` | Authentication config |
| `src/app/auth/` | Auth pages |
| `src/app/dashboard/` | Dashboard page |
| `src/app/api/` | API routes |
| `prisma/schema.prisma` | Database schema |
| `.env.local` | Environment variables |
| `package.json` | Dependencies |

---

## Git Commands

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit"

# After changes
git add .
git commit -m "Description of changes"
git push origin main
```

---

## Deployment to Vercel

1. Push code to GitHub
2. Import repo in Vercel
3. Add environment variables
4. Deploy
5. Verify at: https://yourdomain.vercel.app

---

## Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad request |
| 401 | Unauthorized |
| 404 | Not found |
| 500 | Server error |

---

## Project Fields

```json
{
  "id": "unique-id",
  "title": "Project Name",
  "description": "What the project is about",
  "status": "planning|in-progress|completed",
  "progress": 50,
  "startDate": "2024-01-15T00:00:00Z",
  "targetDate": "2024-03-15T00:00:00Z",
  "completedDate": null,
  "notes": "Project updates here"
}
```

---

## User Fields

```json
{
  "id": "unique-id",
  "email": "user@example.com",
  "name": "Full Name",
  "password": "hashed-and-salted",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-02T00:00:00Z"
}
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Search in VS Code |
| `Ctrl+S` | Save file |
| `Ctrl+/` | Comment code |
| `F12` | Browser DevTools |

---

## Important Reminders

✅ **Never**
- Commit .env.local to git
- Share NEXTAUTH_SECRET
- Use admin accounts for testing
- Delete database without backup

✅ **Always**
- Use HTTPS in production
- Validate user input
- Hash passwords
- Test before deploying
- Keep dependencies updated

---

## Support Resources

| Resource | Link |
|----------|------|
| NextAuth | https://next-auth.js.org/ |
| Prisma | https://www.prisma.io/docs |
| Next.js | https://nextjs.org/docs |
| Neon | https://neon.tech/docs |
| Vercel | https://vercel.com/docs |

---

## Performance Tips

- Use `npm run prisma:studio` to debug queries
- Clear `.next` folder if cache issues
- Use browser DevTools to check load time
- Monitor database queries in Prisma Studio

---

## Security Checklist

- [x] Passwords hashed
- [x] Sessions secured
- [x] Routes protected
- [x] Input validated
- [x] User isolated
- [x] No secrets in code
- [x] HTTPS configured
- [x] CSRF protected

---

## Common Errors & Solutions

| Error | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` |
| "Database connection failed" | Check DATABASE_URL |
| "Session undefined" | Check NEXTAUTH_SECRET |
| "Port already in use" | Kill process or use different port |
| "Module not found @/" | Check tsconfig.json paths |

---

**Keep this card handy! 📌**
