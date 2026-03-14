# Testing Plan - ModulAjar Platform

## Overview
Comprehensive testing guide untuk Platform Manajemen Modul Ajar sebelum production deployment.

---

## Phase 1: Pre-Testing Setup

### 1.1 Environment Verification
- [x] Database schema created in Neon (13 tables)
- [ ] Dependencies installed: `pnpm install`
- [ ] Environment variables configured: `cp .env.example .env.local`
- [ ] JWT_SECRET generated and set
- [ ] DATABASE_URL connected to Neon
- [ ] Prisma migrations applied: `pnpm prisma migrate deploy`
- [ ] Seed data populated: `pnpm prisma db seed`

### 1.2 Project Structure Validation
- [ ] All API routes exist (16 routes)
- [ ] All page components exist (8+ pages)
- [ ] Library utilities present (auth.ts, jwt.ts, password.ts, db.ts, session.ts)
- [ ] Middleware configured
- [ ] No missing imports or dependencies

---

## Phase 2: Unit Testing

### 2.1 Authentication System Tests

#### 2.1.1 Password Hashing (lib/password.ts)
```
Test: hashPassword() correctly hashes password
- Input: plain password
- Output: bcrypt hash (different from input)
- Verify: Hash is different every time (salt)

Test: verifyPassword() validates passwords correctly
- Input: correct password with hash
- Output: true
- Input: wrong password with hash
- Output: false
```

#### 2.1.2 JWT Token Operations (lib/jwt.ts)
```
Test: createAuthToken() generates valid JWT
- Input: AuthPayload object
- Output: JWT token string
- Verify: Token can be verified

Test: verifyAuthToken() validates token
- Input: valid token
- Output: AuthPayload object
- Input: invalid/expired token
- Output: null
```

### 2.2 Database Operations Tests

#### 2.2.1 Prisma Client
```
Test: Database connection
- Query: Count users
- Expected: >= 0

Test: Create record
- Create new User
- Verify: Record exists in database

Test: Update record
- Update existing Module
- Verify: Changes persisted

Test: Delete record
- Delete Module
- Verify: Soft delete (deletedAt set)
```

---

## Phase 3: API Endpoint Testing

### 3.1 Authentication API Routes

#### POST /api/auth/register
```
Test: Valid registration
- Input: { email, name, password, role, schoolId }
- Expected: 201, { userId, token, user }
- Database: New user created with hashed password

Test: Duplicate email
- Input: Existing email
- Expected: 400, error message

Test: Invalid email format
- Input: Malformed email
- Expected: 400, error message

Test: Weak password
- Input: Short password
- Expected: 400, error message
```

#### POST /api/auth/login
```
Test: Valid login
- Input: { email, password }
- Expected: 200, { token, user }
- Cookie: auth_session set with JWT

Test: Wrong password
- Input: { email, wrong_password }
- Expected: 401, error message

Test: Non-existent user
- Input: { non-existent-email, password }
- Expected: 401, error message
```

#### POST /api/auth/logout
```
Test: Clear session
- Input: Valid token in cookie
- Expected: 200, cookie cleared
```

#### GET /api/auth/me
```
Test: Get current user
- With valid token
- Expected: 200, user profile
- Without token
- Expected: 401
```

### 3.2 Module API Routes

#### GET /api/modules
```
Test: List user modules
- Expected: 200, array of modules
- Pagination working
- Filtering by status working
```

#### POST /api/modules
```
Test: Create new module
- Input: Module data (title, subjectId, phaseId, grade)
- Expected: 201, new module object
- Verify: Created by current user

Test: Missing required fields
- Expected: 400, validation error
```

#### GET /api/modules/[id]
```
Test: Get module details
- Expected: 200, full module with content
- Authorization: User can only see own modules
```

#### PUT /api/modules/[id]
```
Test: Update module
- Expected: 200, updated module
- Authorization check

Test: Update published module
- Expected: 400, cannot edit published module
```

#### DELETE /api/modules/[id]
```
Test: Delete module
- Expected: 200, soft delete
- Verify: deletedAt timestamp set
```

### 3.3 Subject & Phase API Routes

#### GET /api/subjects
```
Test: List all subjects
- Expected: 200, array of subjects
- Verify: Correct count
```

#### GET /api/phases
```
Test: List phases by subject
- Expected: 200, array of phases
```

### 3.4 Module Content API

#### POST /api/modules/[id]/content
```
Test: Save module content (18 components)
- Input: All 18 pedagogical components
- Expected: 201, content saved
- Verify: Content persisted in ModuleContent table
```

#### PUT /api/modules/[id]/content
```
Test: Update module content
- Expected: 200, content updated
```

### 3.5 Module Review API

#### POST /api/modules/[id]/reviews
```
Test: Submit review (admin only)
- Input: { status, comments, suggestions, rating }
- Expected: 201, review created
- Authorization: Admin only
```

#### GET /api/modules/[id]/reviews
```
Test: Get reviews for module
- Expected: 200, array of reviews
```

### 3.6 Admin APIs

#### GET /api/admin/modules
```
Test: List all modules (admin only)
- Expected: 200, all modules
- Authorization check

Test: Non-admin user
- Expected: 403, forbidden
```

#### GET /api/admin/users
```
Test: List all users (admin only)
- Expected: 200, array of users
- Authorization check
```

#### GET /api/admin/stats
```
Test: Get platform statistics
- Expected: 200, stats object
- Fields: { totalUsers, totalModules, publishedCount, etc }
```

### 3.7 Published Modules API

#### GET /api/modules/published
```
Test: List published modules (public)
- Expected: 200, public modules
- Filtering by subject, phase, grade
- Search functionality
```

---

## Phase 4: Frontend Testing

### 4.1 Landing Page
```
Test: Load page
- Expected: 200, page renders
- Features visible: Hero, CTA, Features, FAQ
- Links work correctly
```

### 4.2 Authentication Pages

#### Login Page
```
Test: Submit login form
- Valid credentials → Redirect to dashboard
- Invalid credentials → Error message
- Remember me functionality
- Password visibility toggle
```

#### Register Page
```
Test: Submit registration form
- Valid data → Create user, redirect to dashboard
- Duplicate email → Error
- Weak password → Error
- Role selection working
- School selection working
```

### 4.3 Dashboard Pages

#### Dashboard Home
```
Test: Load dashboard
- Authenticated redirect (login if needed)
- Show user modules count
- Recent modules list
- Quick action buttons
```

#### Modules List
```
Test: List modules
- Display all user modules
- Filter by status (draft, published, reviewing)
- Search functionality
- Sorting by date, title, status
- Pagination working
- Create module button
```

#### Module Creator Wizard
```
Test: 18-Step Wizard
- Step 1-18 navigation working
- Form validation on each step
- Data persistence between steps
- Save as draft functionality
- Back/Next buttons working
- Progress indicator accurate
- Final submission creates module
```

#### Module Detail View
```
Test: View module
- Display all 18 components
- Edit button available (if not published)
- View reviews (if reviewed)
- Download option
- Share module
```

#### Analytics Page
```
Test: Load analytics
- Display user module statistics
- Show view counts
- Recent activity list
```

### 4.4 Admin Pages

#### Admin Dashboard
```
Test: Load admin page
- Statistics displayed: total users, modules, published
- Recent modules list
- Users list
- Modules pending review highlighted
- Role check: non-admin redirected
```

#### Module Review Interface
```
Test: Review module
- Load module content for review
- Checklist items completable
- Can add comments/suggestions
- Can rate module (1-5)
- Can approve/reject/send-back
- Submission saves review
```

#### Users Management
```
Test: List users
- Display all users
- Filter by role
- Edit user role
- Deactivate user
```

### 4.5 Public Catalog

#### Catalog Page
```
Test: View catalog
- Load published modules
- Filter by subject
- Filter by phase
- Filter by grade
- Search functionality
- Pagination
- Module cards display correctly
```

#### Module View (Public)
```
Test: View published module
- Display all content
- Cannot edit (read-only)
- Download option
- Share option
```

---

## Phase 5: Middleware Testing

### 5.1 Authentication Middleware
```
Test: Public routes
- /, /auth/login, /auth/register, /catalog → Accessible without auth

Test: Protected routes
- /dashboard, /admin → Requires auth
- Without token → Redirect to /auth/login
- With invalid token → Redirect to /auth/login
- With valid token → Allow access

Test: Role-based access
- /admin routes only for admin/school_admin
- Non-admin trying /admin → Redirect to /dashboard
```

---

## Phase 6: Integration Testing

### 6.1 End-to-End Workflows

#### Workflow 1: Teacher Creates Module
```
1. User registers as teacher
2. Login to dashboard
3. Click "Create Module"
4. Fill 18-step wizard
5. Save as draft
6. Edit module (add more content)
7. Submit for review
8. Verify in admin dashboard
9. Admin reviews and approves
10. Verify module appears in catalog
11. Verify module is viewable publicly
```

#### Workflow 2: Admin Approves Module
```
1. Admin login to dashboard
2. Navigate to pending modules
3. Open module for review
4. Fill review checklist
5. Add comments/suggestions
6. Set rating
7. Click approve
8. Verify module status changes to published
9. Verify module appears in catalog
```

#### Workflow 3: User Browses Catalog
```
1. Visit /catalog
2. View all published modules
3. Filter by subject
4. Filter by phase
5. Search for keyword
6. Click on module
7. View full content
8. Verify cannot edit
9. Download/share options work
```

---

## Phase 7: Performance Testing

### 7.1 Load Times
```
- Home page: < 1.5s
- Login/Register: < 1s
- Dashboard load: < 2s
- Module list (50 items): < 2s
- Module creator wizard: < 2s per page
- Catalog (100 modules): < 3s
```

### 7.2 API Response Times
```
- GET /api/modules: < 500ms
- POST /api/modules: < 1s
- POST /api/auth/login: < 800ms
- GET /api/admin/modules: < 1s
```

### 7.3 Database Queries
```
- Check for N+1 queries
- Verify indexes are used
- Monitor query performance
```

---

## Phase 8: Security Testing

### 8.1 Authentication Security
```
Test: SQL Injection
- Test login with SQL injection attempts
- Verify parameterized queries used

Test: Cross-Site Scripting (XSS)
- Test form inputs with script tags
- Verify input sanitization

Test: CSRF Protection
- Verify CSRF tokens on forms

Test: Password Security
- Verify passwords hashed with bcrypt
- Verify salt rounds >= 10
```

### 8.2 Authorization Security
```
Test: Access Control
- User cannot access other user's modules
- User cannot access admin endpoints
- Admin can access all endpoints
```

### 8.3 Data Protection
```
Test: JWT Token
- Verify token expiration (7 days)
- Verify token invalidation on logout
- Verify token in HTTP-only cookie
```

---

## Phase 9: Data Validation Testing

### 9.1 Input Validation
```
Test: Email validation
- Valid emails accepted
- Invalid formats rejected

Test: Password requirements
- Minimum 8 characters
- Mix of letters, numbers, special chars

Test: Module fields
- Title required, min 5 chars
- Description optional, max 1000 chars
- Subject required
- Phase required
```

### 9.2 Data Integrity
```
Test: Foreign key constraints
- Cannot create module without subject
- Cannot delete subject with modules

Test: Unique constraints
- Email unique per user
- Module slug unique
```

---

## Phase 10: Browser Compatibility Testing

### 10.1 Desktop Browsers
```
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
```

### 10.2 Mobile Browsers
```
- Chrome Mobile
- Safari Mobile
- Firefox Mobile
```

### 10.3 Responsive Design
```
- Test at 320px (mobile)
- Test at 768px (tablet)
- Test at 1440px (desktop)
- All features work on all breakpoints
```

---

## Phase 11: Accessibility Testing

### 11.1 WCAG 2.1 Compliance
```
Test: Keyboard navigation
- Can navigate all pages with keyboard
- Focus visible on all interactive elements

Test: Screen reader
- Page text readable
- Form labels associated
- Alt text on images

Test: Color contrast
- All text meets AA contrast ratio
```

---

## Testing Checklist

### Pre-Testing
- [ ] Dependencies installed
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Seed data populated
- [ ] Dev server running: `pnpm dev`

### Unit Tests
- [ ] Password hashing tests pass
- [ ] JWT token tests pass
- [ ] Database connection tests pass

### API Tests
- [ ] All 16 API routes tested
- [ ] Response codes correct
- [ ] Response data valid
- [ ] Error messages descriptive
- [ ] Authorization checks working

### Frontend Tests
- [ ] All pages load correctly
- [ ] Forms submit correctly
- [ ] Navigation works
- [ ] Responsive on all devices
- [ ] No console errors

### Integration Tests
- [ ] End-to-end workflows pass
- [ ] Data persists correctly
- [ ] Cross-feature interactions work

### Performance Tests
- [ ] Load times within acceptable range
- [ ] No N+1 queries
- [ ] Pagination efficient

### Security Tests
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Authorization enforced
- [ ] Passwords hashed

### Browser Tests
- [ ] Chrome passes
- [ ] Firefox passes
- [ ] Safari passes
- [ ] Mobile browsers pass

### Accessibility Tests
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigable
- [ ] Screen reader compatible

---

## Test Execution Steps

### 1. Setup
```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with real values

# Run migrations
pnpm prisma migrate deploy

# Seed data
pnpm prisma db seed

# Start dev server
pnpm dev
```

### 2. Manual API Testing
```bash
# Using curl or Postman
# Test endpoints documented in Phase 3
```

### 3. Manual UI Testing
```bash
# Navigate through UI
# Test all workflows
# Check responsive design
# Verify accessibility
```

### 4. Performance Testing
```bash
# Use Chrome DevTools
# Measure load times
# Check network requests
# Monitor CPU/Memory
```

### 5. Security Testing
```bash
# OWASP Top 10 checks
# SQL injection attempts
# XSS attempts
# CSRF verification
```

---

## Test Report Template

```
Date: [Date]
Tester: [Name]
Environment: [Dev/Staging/Production]

### Summary
- Total Tests: XX
- Passed: XX
- Failed: XX
- Skipped: XX

### Failed Tests
1. [Test Name] - [Details] - [Screenshots/Logs]

### Issues Found
1. [Issue] - [Severity: Critical/High/Medium/Low] - [Steps to reproduce]

### Recommendations
1. [Recommendation]

### Sign-off
- [ ] Ready for production
- [ ] Ready with minor issues fixed
- [ ] Not ready
```

---

## Notes

- All testing should be documented with timestamps
- Screenshots of failures should be attached
- Any critical bugs should be escalated immediately
- Performance should be measured multiple times for average
- Security testing should be thorough before production release
