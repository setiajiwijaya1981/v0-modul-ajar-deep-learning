# Installation & Setup Checklist

Complete checklist untuk setup ModulAjar platform di local machine atau production.

## Pre-Installation Requirements

- [ ] Node.js 18+ installed
- [ ] pnpm package manager installed (`npm i -g pnpm`)
- [ ] PostgreSQL client tools (for local testing)
- [ ] Git installed
- [ ] Vercel account (optional, for deployment)
- [ ] Neon database account (for production)

## Local Development Setup

### Step 1: Clone & Install

```bash
# Clone repository
git clone <repository-url> modulajar
cd modulajar

# Install dependencies
pnpm install
```

Checklist:
- [ ] Repository cloned successfully
- [ ] Dependencies installed (check `node_modules/`)
- [ ] No installation errors

### Step 2: Environment Configuration

```bash
# Copy environment template
cp .env.example .env.local

# Edit with your settings
nano .env.local
```

Set these variables:
```
DATABASE_URL=postgresql://user:password@localhost:5432/modulajar
JWT_SECRET=your-random-secret-key-min-32-chars
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

Checklist:
- [ ] .env.local created
- [ ] DATABASE_URL set correctly
- [ ] JWT_SECRET generated (use: `openssl rand -base64 32`)
- [ ] NEXT_PUBLIC_API_URL set
- [ ] No .env.local in git

### Step 3: Database Setup

```bash
# Create local database (PostgreSQL)
createdb modulajar

# Run migrations
pnpm prisma migrate deploy

# Seed initial data (subjects, phases)
pnpm prisma db seed

# Verify (optional - opens Prisma Studio)
pnpm prisma studio
```

Checklist:
- [ ] PostgreSQL running
- [ ] Database "modulajar" created
- [ ] Migrations executed successfully
- [ ] Seed data loaded
- [ ] Can access Prisma Studio

### Step 4: Run Development Server

```bash
pnpm dev
```

Server starts on http://localhost:3000

Checklist:
- [ ] Development server running
- [ ] No build errors
- [ ] Can access http://localhost:3000
- [ ] Landing page loading

### Step 5: Test Core Functionality

```bash
# In browser, test these flows:

# 1. Homepage
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Feature cards visible

# 2. Registration
- [ ] Go to /auth/register
- [ ] Register with test account
- [ ] Receive success message

# 3. Login
- [ ] Go to /auth/login
- [ ] Login with credentials
- [ ] Redirected to dashboard

# 4. Create Module
- [ ] Click "Buat Modul Baru"
- [ ] Fill all 18 steps
- [ ] Module published successfully

# 5. Module Library
- [ ] Go to /dashboard/modules
- [ ] List shows created module
- [ ] Can view module details

# 6. Public Catalog
- [ ] Go to /catalog
- [ ] See published modules
- [ ] Filter by subject/phase works

# 7. API Test
- [ ] curl http://localhost:3000/api/subjects
- [ ] Returns list of subjects
```

## Production Deployment (Vercel + Neon)

### Step 1: Prepare Repository

```bash
# Ensure clean git history
git status
# All changes committed

# Push to GitHub
git push origin main
```

Checklist:
- [ ] All code committed
- [ ] No uncommitted changes
- [ ] Pushed to main branch
- [ ] GitHub repo accessible

### Step 2: Setup Neon Database

1. Go to https://neon.tech
2. Create account or login
3. Create new project "modulajar"
4. Create database "modulajar"
5. Copy connection string
6. Keep this string secure (save in password manager)

Checklist:
- [ ] Neon account created
- [ ] Project created
- [ ] Database created
- [ ] Connection string copied

### Step 3: Setup Vercel Project

1. Go to https://vercel.com
2. Login or create account
3. Import from GitHub
4. Select your repository
5. Project created automatically

Checklist:
- [ ] Vercel account created
- [ ] GitHub connected
- [ ] Project imported
- [ ] Auto-deployment enabled

### Step 4: Add Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```
DATABASE_URL = <neon-connection-string>
JWT_SECRET = <generate-with-openssl-rand-base64-32>
NEXT_PUBLIC_API_URL = https://modulajar.vercel.app
NODE_ENV = production
```

Checklist:
- [ ] DATABASE_URL added
- [ ] JWT_SECRET added
- [ ] NEXT_PUBLIC_API_URL set to your domain
- [ ] NODE_ENV set to production
- [ ] All vars saved

### Step 5: Deploy

In Vercel dashboard, click "Deploy"
- Vercel builds project automatically
- Runs migrations if specified
- Deploy completes (takes 2-5 min)

Checklist:
- [ ] Build successful
- [ ] No deployment errors
- [ ] Site live at https://modulajar.vercel.app
- [ ] Database migrations complete

### Step 6: Verify Production

```bash
# Test API endpoints
curl https://modulajar.vercel.app/api/subjects
curl https://modulajar.vercel.app/api/phases

# Test in browser
- Visit https://modulajar.vercel.app
- Register & login
- Create test module
- Verify everything works
```

Checklist:
- [ ] Homepage loads
- [ ] API endpoints respond
- [ ] Authentication works
- [ ] Can create modules
- [ ] Database connected

### Step 7: Backup & Monitoring

1. Enable Neon automated backups
2. Setup Vercel analytics
3. Configure email notifications
4. Create admin user

Checklist:
- [ ] Database backups enabled
- [ ] Analytics configured
- [ ] Notifications enabled
- [ ] Admin user created
- [ ] Monitoring setup

## Troubleshooting

### Build Fails: Prisma Migration Error

```bash
# Solution 1: Verify locally
pnpm prisma migrate deploy

# Solution 2: Check DATABASE_URL
echo $DATABASE_URL

# Solution 3: Reset migrations (careful!)
pnpm prisma migrate reset
```

### Database Connection Error

```bash
# Check connection
pnpm prisma db execute

# Test directly
psql $DATABASE_URL -c "SELECT version();"
```

### Environment Variables Not Loaded

```bash
# In Vercel: Re-deploy after adding vars
# Trigger redeploy in Vercel dashboard

# Locally: Verify .env.local in root directory
ls -la .env.local
```

### Module Creator Wizard Not Working

```bash
# Check browser console for errors
# Verify all form fields have values
# Check API endpoint responses
# Try creating in incognito window
```

## Performance Optimization Checklist

- [ ] Database indexes created (automatic via Prisma)
- [ ] API response time < 200ms
- [ ] Initial page load < 2s
- [ ] No console errors
- [ ] Pagination implemented (10-12 items)
- [ ] Images optimized

## Security Checklist

- [ ] JWT_SECRET is strong (32+ chars)
- [ ] DATABASE_URL never committed to git
- [ ] .env.local in .gitignore
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Security headers configured
- [ ] SQL injection prevention (Prisma)
- [ ] CORS properly configured
- [ ] Password hashing working

## Post-Deployment Tasks

```bash
# 1. Create admin user (via API or database)
# 2. Configure backup schedule
# 3. Setup monitoring alerts
# 4. Document admin password (secure storage)
# 5. Create user documentation
# 6. Setup support email
# 7. Configure domain (if using custom domain)
# 8. SSL certificate (automatic on Vercel)
```

Checklist:
- [ ] Admin user created
- [ ] Backups configured
- [ ] Monitoring alerts setup
- [ ] Documentation prepared
- [ ] Team trained
- [ ] Support ready

## Maintenance Schedule

```bash
# Daily
- [ ] Monitor error logs

# Weekly
- [ ] Check database usage
- [ ] Review analytics

# Monthly
- [ ] Update dependencies (pnpm update)
- [ ] Database maintenance
- [ ] Security audit

# Quarterly
- [ ] Full backup verification
- [ ] Performance review
- [ ] Update documentation

# Yearly
- [ ] Security assessment
- [ ] Archive old data
- [ ] Plan improvements
```

---

## Support Contacts

- **Vercel Support**: https://vercel.com/support
- **Neon Support**: https://neon.tech/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs

---

**Congratulations! ModulAjar is now ready to use.** 🎉

For questions or issues, refer to README.md or DEPLOYMENT.md files.
