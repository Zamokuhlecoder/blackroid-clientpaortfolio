# Troubleshooting Guide

## 🔧 Common Issues & Solutions

### Installation Issues

#### Issue: `npm install` fails with peer dependency errors

**Solution:**
```bash
npm install --legacy-peer-deps
```

#### Issue: `Prisma` not found

**Solution:**
```bash
npm install @prisma/client prisma
npx prisma generate
```

---

### Database Issues

#### Issue: "Cannot connect to database"

**Check:**
1. Verify DATABASE_URL in `.env.local` is correct
2. Test connection:
   ```bash
   npm run prisma:push
   ```
3. Check Neon database is running
4. Verify IP is whitelisted in Neon

**Solution:**
```bash
# Check connection string format
# Should look like: postgresql://user:password@hostname/database
# From Neon: https://console.neon.tech/app/projects
```

#### Issue: "Migration failed"

**Solution:**
```bash
# Reset database (careful - this deletes all data!)
npm run prisma:push -- --force-reset
```

#### Issue: Prisma type errors

**Solution:**
```bash
npm run prisma:generate
# Then restart your dev server
```

---

### Authentication Issues

#### Issue: "NEXTAUTH_SECRET is undefined"

**Solution:**
1. Add to `.env.local`:
   ```bash
   NEXTAUTH_SECRET="generate-with-openssl"
   ```
2. Generate secret:
   ```bash
   openssl rand -hex 32
   ```

#### Issue: "Cannot POST /api/auth/signin"

**Check:**
1. `src/app/api/auth/[...nextauth]/route.ts` exists
2. `.env.local` has NEXTAUTH_SECRET
3. Restart dev server: `npm run dev`

#### Issue: "Sign in works but can't access dashboard"

**Solution:**
1. Check middleware.ts exists
2. Clear browser cookies
3. Restart dev server
4. Try private/incognito window

#### Issue: "Password hashing fails"

**Check:**
```bash
npm list bcryptjs
# Should be installed, run:
npm install bcryptjs
```

---

### Frontend Issues

#### Issue: "Module not found: @/lib/prisma"

**Solution:**
Check `tsconfig.json` has correct path alias:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### Issue: "Dashboard shows 'No projects'"

**Check:**
1. User is logged in correctly
2. Database has projects for this user
3. Check Prisma Studio: `npm run prisma:studio`

#### Issue: "Sign out doesn't work"

**Solution:**
```bash
# Check NextAuth handlers in route.ts
# Should export { GET, POST } = handlers
# Restart dev server
```

---

### Performance Issues

#### Issue: "Development server slow"

**Solutions:**
```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

#### Issue: "Dashboard loads slowly"

**Check:**
1. Database queries in browser DevTools
2. Optimize Prisma queries
3. Add pagination to projects list

---

### Deployment Issues

#### Issue: "Cannot deploy to Vercel"

**Check:**
1. Push to GitHub first
2. Connect GitHub to Vercel
3. Add environment variables in Vercel dashboard:
   - DATABASE_URL
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL (your Vercel domain)

#### Issue: "Database connection fails on Vercel"

**Solution:**
```bash
# After deploying, run migrations:
vercel env pull .env.local
npm run prisma:push
```

#### Issue: "NEXTAUTH_URL is wrong after deployment"

**Solution:**
Update in Vercel dashboard:
1. Settings → Environment Variables
2. Set NEXTAUTH_URL to your domain:
   ```
   https://myportfolio.vercel.app
   ```
3. Redeploy

---

### TypeScript Issues

#### Issue: "Type errors after changes"

**Solution:**
```bash
npm run typecheck
# Then fix errors shown
```

#### Issue: "Session type not recognized"

**Solution:**
Check `src/auth.d.ts` exists with proper definitions:
```typescript
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
```

---

### API Issues

#### Issue: "API returns 401 Unauthorized"

**Check:**
1. User is logged in
2. Session cookie is valid
3. NEXTAUTH_SECRET is set
4. Browser DevTools → Application → Cookies

#### Issue: "API returns 404 Not Found"

**Check:**
1. API route file exists in correct location
2. File path matches URL path
3. No typos in route
4. Restart dev server

#### Issue: "CORS errors"

**Note:** CORS shouldn't occur - same origin
**Check:**
1. Using relative URLs (/api/...)
2. Not making cross-origin requests
3. Browser console for actual error

---

## 🐛 Debugging Tips

### Enable Debug Logging

Add to `.env.local`:
```
DEBUG=prisma:*
```

### View Database

```bash
npm run prisma:studio
# Opens browser UI to view/edit database
```

### Check NextAuth Session

Create a debug page:
```typescript
"use client";
import { useSession } from "next-auth/react";

export default function Debug() {
  const { data: session } = useSession();
  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
```

### View Environment Variables

Create a debug route:
```typescript
export function GET() {
  return Response.json({
    nextAuthUrl: process.env.NEXTAUTH_URL,
    dbConnected: !!process.env.DATABASE_URL,
    secretSet: !!process.env.NEXTAUTH_SECRET,
  });
}
```

---

## 📞 Getting Help

### Resources

1. **Prisma Issues**: https://github.com/prisma/prisma/discussions
2. **NextAuth Issues**: https://github.com/nextauthjs/next-auth/discussions
3. **Next.js Issues**: https://github.com/vercel/next.js/discussions
4. **Neon Database**: https://neon.tech/docs/connect/connect-from-any-app

### Error Messages to Search

- Copy the full error message
- Search on GitHub issues for the package
- Check official documentation

---

**Still stuck? Check the logs carefully - they usually tell you exactly what's wrong! 🔍**
