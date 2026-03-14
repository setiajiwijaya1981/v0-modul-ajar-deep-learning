# DEPLOYMENT.md - Deployment Guide

## Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrated
- [ ] Seed data loaded
- [ ] All tests passing
- [ ] Security review completed
- [ ] Performance optimized
- [ ] Documentation updated

## Local Development

### 1. Setup Environment

```bash
# Create environment file
cp .env.example .env.local

# Edit with your settings
nano .env.local
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Database

```bash
# Create database
createdb modulajar

# Run migrations
pnpm prisma migrate deploy

# Seed data
pnpm prisma db seed
```

### 4. Run Development Server

```bash
pnpm dev
```

Server runs on http://localhost:3000

## Deployment to Vercel

### 1. Connect GitHub Repository

```bash
# Initialize git if needed
git init
git add .
git commit -m "Initial commit"
git remote add origin <github-repo-url>
git push -u origin main
```

### 2. Create Vercel Project

1. Go to https://vercel.com
2. Click "New Project"
3. Import from GitHub (select repository)
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./ (default)
   - **Build Command**: `pnpm build` (leave default)
   - **Install Command**: `pnpm install` (leave default)

### 3. Add Environment Variables

In Vercel dashboard, go to Settings > Environment Variables:

```
DATABASE_URL = <your-neon-connection-string>
JWT_SECRET = <generate-random-secure-key>
NEXT_PUBLIC_API_URL = https://modulajar.vercel.app
NODE_ENV = production
```

To generate secure JWT_SECRET:
```bash
openssl rand -base64 32
```

### 4. Deploy

Click "Deploy" - Vercel will automatically build and deploy.

## Database Setup (Neon PostgreSQL)

### 1. Create Neon Database

1. Go to https://neon.tech
2. Sign up or login
3. Create new project
4. Create database "modulajar"
5. Copy connection string

### 2. Format Connection String

Connection string format:
```
postgresql://user:password@host.neon.tech:5432/modulajar
```

### 3. Run Migrations

```bash
# Set DATABASE_URL
export DATABASE_URL="your-connection-string"

# Run migrations
pnpm prisma migrate deploy

# Verify (optional)
pnpm prisma studio
```

## Post-Deployment

### 1. Verify Deployment

```bash
# Test API
curl https://modulajar.vercel.app/api/subjects

# Test auth endpoint (should return 401)
curl https://modulajar.vercel.app/api/auth/me
```

### 2. Database Backup

Configure automated backups in Neon dashboard:
- Backup frequency: Daily
- Retention: 7 days minimum

### 3. Monitor Performance

1. Vercel Analytics:
   - Go to https://vercel.com/dashboard
   - Select project
   - Check Web Vitals

2. Database Monitoring:
   - Neon console
   - Check query performance
   - Monitor storage usage

### 4. Create Admin Account

After deployment, create initial admin user:

```bash
# SSH into production (if needed)
# Or use Prisma Studio
pnpm prisma studio

# Manually insert admin user or
# Use admin API to create user with admin role
```

## Scaling Configuration

### Database Connection Pooling

Neon supports connection pooling. Configure in .env:

```
DATABASE_URL = <connection-with-pooling>
```

### Next.js Image Optimization

Edit next.config.mjs:

```js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.neon.tech',
      },
    ],
  },
};
```

### Caching Strategy

Add to layout.tsx for better performance:

```tsx
export const revalidate = 3600; // Revalidate every hour
```

## Security Hardening

### 1. Rate Limiting

Add to API routes (nginx/reverse proxy recommended):

```
# nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req zone=api burst=20 nodelay;
```

### 2. CORS Configuration

Current CORS: Allow same origin (see middleware.ts)

### 3. Headers Security

Add to next.config.mjs:

```js
headers: async () => [
  {
    source: '/:path*',
    headers: [
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
    ],
  },
],
```

## Troubleshooting

### Database Connection Error

```
Error: Can't reach database server
```

**Solution:**
1. Check DATABASE_URL in Vercel env vars
2. Verify Neon database is running
3. Check firewall rules allow Vercel IP

### Build Failed

```
Error: Prisma migration failed
```

**Solution:**
```bash
# Verify locally first
pnpm prisma migrate deploy

# Check migration files exist
ls prisma/migrations/
```

### Slow Performance

1. Check database query performance
   ```bash
   pnpm prisma studio
   # Analyze slow queries
   ```

2. Enable query logging
   ```prisma
   log: ['query', 'error', 'warn'],
   ```

### Memory Issues

Check Vercel function size:
```bash
# Build analysis
npm install -g next-bundle-analyzer
npm run analyze
```

## Rollback Procedure

### 1. Keep Previous Deployment

Vercel automatically keeps previous deployments.

To rollback:
1. Go to Vercel dashboard
2. Select project
3. Find deployment to rollback to
4. Click "Promote to Production"

### 2. Database Rollback

For data issues:
1. Restore from backup (Neon dashboard)
2. Contact Neon support for point-in-time recovery

## Maintenance

### Regular Updates

```bash
# Check for updates
pnpm update --interactive

# Update Prisma schema
pnpm prisma migrate dev --name description

# Deploy migration
pnpm prisma migrate deploy
```

### Database Maintenance

1. **Monthly**: Analyze table statistics
   ```sql
   ANALYZE;
   ```

2. **Quarterly**: Vacuum tables
   ```sql
   VACUUM ANALYZE;
   ```

3. **Yearly**: Review and archive old data

### Monitoring Checklist

- [ ] Database space usage < 80%
- [ ] API response time < 200ms
- [ ] Error rate < 0.1%
- [ ] Uptime > 99.9%
- [ ] Backup created recently

## Support

- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
- Next.js Docs: https://nextjs.org/docs

---

**Happy Deploying!**
