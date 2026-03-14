#!/bin/bash

# Environment Verification Script for ModulAjar

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}ModulAjar - Environment Verification${NC}"
echo -e "${BLUE}========================================${NC}\n"

CHECKS_PASSED=0
CHECKS_FAILED=0

# Function to check if command exists
check_command() {
  if command -v $1 &> /dev/null; then
    VERSION=$($1 --version 2>&1 | head -n1)
    echo -e "${GREEN}✓${NC} $1 installed - $VERSION"
    ((CHECKS_PASSED++))
  else
    echo -e "${RED}✗${NC} $1 NOT installed"
    ((CHECKS_FAILED++))
  fi
}

# Function to check file exists
check_file() {
  if [ -f "$1" ]; then
    echo -e "${GREEN}✓${NC} $1 exists"
    ((CHECKS_PASSED++))
  else
    echo -e "${RED}✗${NC} $1 NOT found"
    ((CHECKS_FAILED++))
  fi
}

# Function to check environment variable
check_env() {
  if [ -z "${!1}" ]; then
    echo -e "${RED}✗${NC} Environment variable $1 NOT set"
    ((CHECKS_FAILED++))
  else
    VALUE=${!1}
    if [ ${#VALUE} -gt 20 ]; then
      VALUE="${VALUE:0:20}..."
    fi
    echo -e "${GREEN}✓${NC} Environment variable $1 is set ($VALUE)"
    ((CHECKS_PASSED++))
  fi
}

# 1. Check Node.js and Package Manager
echo -e "${YELLOW}1. Checking Node.js and Package Manager${NC}"
check_command "node"
check_command "pnpm"
echo ""

# 2. Check Project Files
echo -e "${YELLOW}2. Checking Project Files${NC}"
check_file "package.json"
check_file "next.config.mjs"
check_file "tsconfig.json"
check_file "prisma/schema.prisma"
check_file ".env.local"
echo ""

# 3. Check Dependencies
echo -e "${YELLOW}3. Checking Key Dependencies${NC}"
if [ -d "node_modules" ]; then
  echo -e "${GREEN}✓${NC} node_modules directory exists"
  ((CHECKS_PASSED++))
  
  if [ -d "node_modules/next" ]; then
    echo -e "${GREEN}✓${NC} Next.js installed"
    ((CHECKS_PASSED++))
  else
    echo -e "${RED}✗${NC} Next.js NOT installed (run pnpm install)"
    ((CHECKS_FAILED++))
  fi
  
  if [ -d "node_modules/@prisma/client" ]; then
    echo -e "${GREEN}✓${NC} Prisma client installed"
    ((CHECKS_PASSED++))
  else
    echo -e "${RED}✗${NC} Prisma client NOT installed"
    ((CHECKS_FAILED++))
  fi
  
  if [ -d "node_modules/jose" ]; then
    echo -e "${GREEN}✓${NC} Jose (JWT) installed"
    ((CHECKS_PASSED++))
  else
    echo -e "${RED}✗${NC} Jose NOT installed"
    ((CHECKS_FAILED++))
  fi
  
  if [ -d "node_modules/bcryptjs" ]; then
    echo -e "${GREEN}✓${NC} bcryptjs installed"
    ((CHECKS_PASSED++))
  else
    echo -e "${YELLOW}⚠${NC}  bcryptjs NOT installed (only needed for auth API)"
    ((CHECKS_FAILED++))
  fi
else
  echo -e "${RED}✗${NC} node_modules NOT found (run pnpm install)"
  ((CHECKS_FAILED++))
fi
echo ""

# 4. Check Environment Variables
echo -e "${YELLOW}4. Checking Environment Variables${NC}"
check_env "DATABASE_URL"
check_env "JWT_SECRET"
echo ""

# 5. Check Library Files
echo -e "${YELLOW}5. Checking Library Files${NC}"
check_file "lib/db.ts"
check_file "lib/jwt.ts"
check_file "lib/password.ts"
check_file "lib/auth.ts"
check_file "lib/session.ts"
echo ""

# 6. Check API Routes
echo -e "${YELLOW}6. Checking API Routes${NC}"
check_file "app/api/auth/login/route.ts"
check_file "app/api/auth/register/route.ts"
check_file "app/api/auth/logout/route.ts"
check_file "app/api/modules/route.ts"
check_file "app/api/subjects/route.ts"
check_file "app/api/admin/modules/route.ts"
echo ""

# 7. Check Page Components
echo -e "${YELLOW}7. Checking Page Components${NC}"
check_file "app/page.tsx"
check_file "app/auth/login/page.tsx"
check_file "app/auth/register/page.tsx"
check_file "app/dashboard/page.tsx"
check_file "app/dashboard/modules/page.tsx"
check_file "app/admin/dashboard/page.tsx"
echo ""

# 8. Check Middleware
echo -e "${YELLOW}8. Checking Middleware${NC}"
check_file "middleware.ts"
echo ""

# 9. Check Database Schema
echo -e "${YELLOW}9. Checking Database Schema${NC}"
if [ ! -z "$DATABASE_URL" ]; then
  echo -e "${BLUE}ℹ${NC}  DATABASE_URL is set"
  ((CHECKS_PASSED++))
else
  echo -e "${YELLOW}⚠${NC}  DATABASE_URL not set - database check skipped"
fi
echo ""

# 10. Check Build Configuration
echo -e "${YELLOW}10. Checking Build Configuration${NC}"
if grep -q "\"build\"" package.json; then
  echo -e "${GREEN}✓${NC} Build script configured"
  ((CHECKS_PASSED++))
else
  echo -e "${YELLOW}⚠${NC}  Build script not found"
fi

if grep -q "\"dev\"" package.json; then
  echo -e "${GREEN}✓${NC} Dev script configured"
  ((CHECKS_PASSED++))
else
  echo -e "${RED}✗${NC} Dev script not found"
  ((CHECKS_FAILED++))
fi
echo ""

# Summary
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Summary${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Passed: $CHECKS_PASSED${NC}"
echo -e "${RED}Failed: $CHECKS_FAILED${NC}"
echo -e "Total: $((CHECKS_PASSED + CHECKS_FAILED))"
echo ""

if [ $CHECKS_FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All checks passed! Ready to start development.${NC}"
  echo ""
  echo -e "Next steps:"
  echo -e "  1. Start dev server: ${YELLOW}pnpm dev${NC}"
  echo -e "  2. Open browser: http://localhost:3000"
  echo -e "  3. Run tests: ${YELLOW}pnpm test${NC}"
  exit 0
else
  echo -e "${RED}✗ Some checks failed. Please fix the issues above.${NC}"
  echo ""
  echo -e "To get started:"
  echo -e "  1. Install dependencies: ${YELLOW}pnpm install${NC}"
  echo -e "  2. Run migrations: ${YELLOW}pnpm prisma migrate deploy${NC}"
  echo -e "  3. Seed data: ${YELLOW}pnpm prisma db seed${NC}"
  exit 1
fi
