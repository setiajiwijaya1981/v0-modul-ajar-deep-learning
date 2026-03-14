# Testing Guide - ModulAjar Platform

## Quick Start Testing

### Prerequisites
```bash
# 1. Clone/download project
cd v0-project

# 2. Verify environment
bash scripts/verify-env.sh

# 3. Install dependencies
pnpm install

# 4. Setup environment variables
cp .env.example .env.local
# Edit .env.local with:
# - DATABASE_URL (from Neon)
# - JWT_SECRET (generate: openssl rand -base64 32)

# 5. Setup database
pnpm prisma migrate deploy
pnpm prisma db seed

# 6. Start dev server
pnpm dev
```

---

## Testing Workflow

### Step 1: Environment Verification (5 mins)
```bash
bash scripts/verify-env.sh
```

**Expected Output:**
```
✓ Node.js installed
✓ pnpm installed
✓ package.json exists
✓ All dependencies installed
✓ Environment variables set
✓ All checks passed!
```

**If failed:** Install missing dependencies or set environment variables

---

### Step 2: Unit & Integration Tests (10 mins)
```bash
pnpm node scripts/test-unit.js
```

**Expected Output:**
```
[PASS] Database connected
[PASS] Password hashed successfully
[PASS] Password verification passed
[PASS] Wrong password correctly rejected
[PASS] JWT token created
[PASS] JWT token verification passed
[PASS] Invalid token correctly rejected
[PASS] All schema tables exist
```

**If failed:** Check database connection and verify JWT_SECRET is set

---

### Step 3: Manual UI Testing (20 mins)

#### 3.1 Landing Page
```
URL: http://localhost:3000
Expected:
- Hero section visible
- Feature cards display
- "Get Started" button visible
- Navigation links work
```

#### 3.2 Registration Flow
```
1. Click "Get Started"
2. Fill registration form:
   - Email: test@example.com
   - Name: Test Teacher
   - Password: TestPass123!
   - Role: Teacher
   - School: Select one
3. Click Register
4. Expected: Dashboard redirected
```

#### 3.3 Login Flow
```
1. Go to /auth/login
2. Enter credentials:
   - Email: test@example.com
   - Password: TestPass123!
3. Click Login
4. Expected: Dashboard loads, user info shows
```

#### 3.4 Module Creation
```
1. From dashboard, click "Create Module"
2. Fill Step 1 (Basic Info):
   - Title: Test Modul IPA
   - Subject: IPA (Science)
   - Phase: D (Grade 10-12)
   - Grade: 10
   - School Year: 2024/2025
3. Click Next
4. Continue through all 18 steps
5. On Step 18, click Submit
6. Expected: Module created, redirected to modules list
```

#### 3.5 Module Browsing
```
1. Go to /dashboard/modules
2. Verify:
   - Module list displays
   - Filters work (by status)
   - Search functionality
   - Pagination works
3. Click on module
4. Expected: Module detail page loads
```

#### 3.6 Public Catalog
```
1. Go to /catalog (unauthenticated)
2. Verify:
   - Published modules display
   - Filter by subject works
   - Filter by phase works
   - Search functionality
   - Can view module details
```

#### 3.7 Admin Dashboard
```
1. Login as admin user
2. Go to /admin/dashboard
3. Verify:
   - Statistics display (total modules, users, etc)
   - Recent modules list
   - Pending reviews highlighted
```

---

### Step 4: API Testing (15 mins)

#### 4.1 Automated API Tests
```bash
# Make dev server is running, then:
bash scripts/test-api.sh
```

**Expected Output:**
```
[TEST] Register new user
[PASS] Got expected status code 201

[TEST] Login user
[PASS] Got expected status code 200
Got auth token: eyJhbGciOiJIUzI1...

[TEST] Get current user
[PASS] Got expected status code 200

[TEST] Get all subjects
[PASS] Got expected status code 200

...
```

#### 4.2 Manual API Testing with cURL

**Test Registration:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "TestPass123!",
    "role": "teacher",
    "schoolId": "school-1"
  }'

# Expected: 201 with { userId, token, user }
```

**Test Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'

# Expected: 200 with token
# Copy token for next requests
```

**Test Get Modules:**
```bash
curl -X GET http://localhost:3000/api/modules \
  -H "Authorization: Bearer <your-token>"

# Expected: 200 with array of modules
```

**Test Create Module:**
```bash
curl -X POST http://localhost:3000/api/modules \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "title": "Test Module",
    "subjectId": "mat-1",
    "phaseId": "phase-d",
    "grade": 9,
    "description": "Test"
  }'

# Expected: 201 with new module
```

---

### Step 5: Performance Testing (10 mins)

#### 5.1 Load Times (using Chrome DevTools)
```
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Visit each page and measure load time:

Page: / (Landing)
Expected: < 1.5s
Actual: ___

Page: /auth/login
Expected: < 1s
Actual: ___

Page: /dashboard
Expected: < 2s
Actual: ___

Page: /dashboard/modules
Expected: < 2s
Actual: ___

Page: /dashboard/modules/create
Expected: < 2s
Actual: ___

Page: /catalog
Expected: < 3s
Actual: ___
```

#### 5.2 API Response Times
```bash
# Test API response times
time curl -X GET http://localhost:3000/api/modules \
  -H "Authorization: Bearer <token>"

Expected: < 500ms
Actual: ___

time curl -X GET http://localhost:3000/api/admin/stats \
  -H "Authorization: Bearer <token>"

Expected: < 1s
Actual: ___
```

---

### Step 6: Security Testing (10 mins)

#### 6.1 Authentication Tests
```
Test 1: Unauthorized access
- Try accessing /dashboard without login
- Expected: Redirects to /auth/login
- Result: ✓ / ✗

Test 2: Invalid token
- Add invalid token to Authorization header
- Try GET /api/modules
- Expected: 401 Unauthorized
- Result: ✓ / ✗

Test 3: Expired token
- (Manually edit token)
- Try GET /api/modules
- Expected: 401 Unauthorized
- Result: ✓ / ✗

Test 4: Token in HTTP-only cookie
- Login and check cookies
- JWT should be in http-only cookie
- Result: ✓ / ✗
```

#### 6.2 Authorization Tests
```
Test 1: User cannot access other user's modules
- User A creates module
- Login as User B
- Try to access User A's module via /api/modules/:id
- Expected: 403 Forbidden or 404 Not Found
- Result: ✓ / ✗

Test 2: Non-admin cannot access /admin routes
- Login as teacher
- Try to access /admin/dashboard
- Expected: Redirects to /dashboard
- Result: ✓ / ✗

Test 3: Cannot edit published modules
- Create and publish module
- Try to update module
- Expected: 400 Cannot edit published module
- Result: ✓ / ✗
```

#### 6.3 SQL Injection Tests
```
Test: SQL Injection in search
- Try search with: ' OR '1'='1
- Expected: No injection, normal search behavior
- Result: ✓ / ✗

Test: SQL Injection in login
- Try email: admin' --
- Expected: No injection, normal error
- Result: ✓ / ✗
```

---

### Step 7: Data Validation Testing (10 mins)

```bash
# Test 1: Invalid email
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid-email","name":"Test","password":"Pass123!"}'
# Expected: 400 Invalid email

# Test 2: Weak password
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@ex.com","name":"Test","password":"123"}'
# Expected: 400 Password too weak

# Test 3: Missing required field
curl -X POST http://localhost:3000/api/modules \
  -H "Authorization: Bearer <token>"
  -d '{"title":"Test"}'
# Expected: 400 Missing required fields

# Test 4: Title too short
curl -X POST http://localhost:3000/api/modules \
  -H "Authorization: Bearer <token>"
  -d '{"title":"Hi","subjectId":"s1","phaseId":"p1","grade":9}'
# Expected: 400 Title too short
```

---

### Step 8: Responsive Design Testing (10 mins)

#### 8.1 Mobile (320px)
```bash
# Using Chrome DevTools
1. Press F12 to open DevTools
2. Click device toggle (Ctrl+Shift+M)
3. Select iPhone SE (375x667)
4. Test:
   - [ ] Landing page responsive
   - [ ] Login form works
   - [ ] Dashboard readable
   - [ ] Module list scrollable
   - [ ] Navigation accessible
   - [ ] Buttons clickable (large enough)
```

#### 8.2 Tablet (768px)
```bash
# Select iPad (768x1024) in DevTools
   - [ ] All content visible
   - [ ] Columns appropriate
   - [ ] Forms usable
   - [ ] Navigation works
```

#### 8.3 Desktop (1440px)
```bash
   - [ ] Layout optimized
   - [ ] Content readable
   - [ ] No horizontal scroll
   - [ ] All features visible
```

---

### Step 9: Accessibility Testing (10 mins)

#### 9.1 Keyboard Navigation
```
1. Close mouse
2. Use Tab key to navigate
3. Test:
   - [ ] Can reach all interactive elements
   - [ ] Focus indicator visible on all elements
   - [ ] Enter/Space activates buttons
   - [ ] Forms fillable with keyboard
```

#### 9.2 Screen Reader (using Firefox/NVDA or Chrome/ChromeVox)
```
1. Enable screen reader
2. Navigate page
3. Test:
   - [ ] Page title announced
   - [ ] Headings navigable
   - [ ] Form labels read
   - [ ] Alt text on images
   - [ ] Button purposes clear
```

#### 9.3 Color Contrast
```
1. Use Chrome DevTools or WebAIM
2. Check contrast ratios
3. Test:
   - [ ] Text vs background: >= 4.5:1 (AA)
   - [ ] UI components: >= 3:1
```

---

## Testing Checklist

### Pre-Testing
- [ ] Dependencies installed (`pnpm install`)
- [ ] Environment variables set (`.env.local`)
- [ ] Database migrations run (`pnpm prisma migrate deploy`)
- [ ] Seed data populated (`pnpm prisma db seed`)
- [ ] Dev server running (`pnpm dev`)
- [ ] Environment verification passed (`bash scripts/verify-env.sh`)

### Unit Tests
- [ ] Password hashing works
- [ ] JWT token creation works
- [ ] JWT verification works
- [ ] Database connection works
- [ ] All tables exist

### API Tests
- [ ] Authentication endpoints work
- [ ] Module endpoints work
- [ ] Subject/Phase endpoints work
- [ ] Admin endpoints work
- [ ] Public catalog endpoints work
- [ ] Authorization checks working
- [ ] Error responses correct

### UI Tests
- [ ] Landing page displays
- [ ] Registration works
- [ ] Login works
- [ ] Dashboard loads
- [ ] Module creation wizard works
- [ ] Module list displays
- [ ] Module detail shows
- [ ] Admin dashboard works
- [ ] Public catalog works

### Integration Tests
- [ ] Register → Login → Create Module flow
- [ ] Create Module → Submit Review → Admin Approve flow
- [ ] User cannot access other user's modules
- [ ] Published modules appear in catalog

### Performance Tests
- [ ] Load times within acceptable range
- [ ] API responses fast
- [ ] No N+1 queries
- [ ] Pagination efficient

### Security Tests
- [ ] Unauthorized access blocked
- [ ] Invalid tokens rejected
- [ ] User data isolated
- [ ] Admin routes protected
- [ ] No SQL injection
- [ ] No XSS vulnerabilities

### Responsive Tests
- [ ] Mobile (320px) works
- [ ] Tablet (768px) works
- [ ] Desktop (1440px) works

### Accessibility Tests
- [ ] Keyboard navigable
- [ ] Screen reader compatible
- [ ] Color contrast acceptable

---

## Test Results Template

```
Testing Date: [Date]
Tester: [Name]
Environment: [Dev/Staging/Production]
Browser: [Chrome/Firefox/Safari/Edge]

### Summary
Total Tests: __
Passed: __
Failed: __
Skipped: __
Pass Rate: __%

### Failed Tests
1. [Test Name] - [Issue] - [Steps to Reproduce]

### Issues Found
| Priority | Issue | Severity | Status |
|----------|-------|----------|--------|
| 1 | [Issue] | [Critical/High/Medium/Low] | [Open/Fixed] |

### Performance Metrics
- Home page load: __ms
- Dashboard load: __ms
- API response: __ms
- Database query: __ms

### Sign-off
- [ ] Ready for production
- [ ] Ready with minor fixes
- [ ] Not ready

Date: __ Signature: __
```

---

## Troubleshooting

### Issue: "Module not found: Can't resolve 'bcryptjs'"
**Solution:**
```bash
pnpm install bcryptjs
# The issue occurs when dependencies aren't installed
```

### Issue: Database connection failed
**Solution:**
```bash
# 1. Check DATABASE_URL is set
echo $DATABASE_URL

# 2. Verify Neon connection
pnpm prisma db push

# 3. Check migrations
pnpm prisma migrate status
```

### Issue: JWT token verification fails
**Solution:**
```bash
# 1. Verify JWT_SECRET is set
echo $JWT_SECRET

# 2. Check token is valid
pnpm node -e "console.log(process.env.JWT_SECRET)"

# 3. Regenerate if needed
openssl rand -base64 32
```

### Issue: Tests fail with "Cannot find module"
**Solution:**
```bash
# Clear build cache
rm -rf .next
pnpm dev
```

### Issue: API returns 401 Unauthorized
**Solution:**
```bash
# 1. Check token in request
# 2. Verify token not expired
# 3. Check Authorization header format: "Bearer <token>"
# 4. Verify JWT_SECRET hasn't changed
```

---

## Next Steps After Testing

If all tests pass:
1. ✓ Fix any critical issues
2. ✓ Document known limitations
3. ✓ Create deployment checklist
4. ✓ Schedule production deployment
5. ✓ Setup monitoring

If tests fail:
1. ✓ Document all failures
2. ✓ Prioritize by severity
3. ✓ Create bug tickets
4. ✓ Re-test after fixes
5. ✓ Repeat until all pass
