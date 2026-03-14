#!/bin/bash

# ModulAjar API Testing Script
# This script tests all major API endpoints

set -e

BASE_URL="http://localhost:3000"
REPORT_FILE="test_report.json"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Initialize report
echo "{\"tests\": [], \"summary\": {}}" > $REPORT_FILE

# Helper functions
log_test() {
  echo -e "${YELLOW}[TEST]${NC} $1"
}

log_pass() {
  echo -e "${GREEN}[PASS]${NC} $1"
}

log_fail() {
  echo -e "${RED}[FAIL]${NC} $1"
}

test_endpoint() {
  local method=$1
  local endpoint=$2
  local data=$3
  local expected_code=$4
  local test_name=$5

  log_test "$test_name ($method $endpoint)"

  if [ -z "$data" ]; then
    response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint" \
      -H "Content-Type: application/json")
  else
    response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint" \
      -H "Content-Type: application/json" \
      -d "$data")
  fi

  status_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | head -n-1)

  if [ "$status_code" -eq "$expected_code" ]; then
    log_pass "Got expected status code $status_code"
    echo "$body"
    return 0
  else
    log_fail "Expected $expected_code, got $status_code"
    echo "$body"
    return 1
  fi
}

# Test endpoints
echo "========================================="
echo "Starting API Tests for ModulAjar"
echo "========================================="
echo ""

# 1. Health Check
log_test "Health Check"
curl -s "$BASE_URL/" | head -c 100
echo ""
echo ""

# 2. Authentication Endpoints
echo "========================================="
echo "Testing Authentication Endpoints"
echo "========================================="

# Register
REGISTER_DATA='{"email":"test@example.com","name":"Test User","password":"Password123!","role":"teacher","schoolId":"test-school"}'
test_endpoint "POST" "/api/auth/register" "$REGISTER_DATA" 201 "Register new user"

# Login
LOGIN_DATA='{"email":"test@example.com","password":"Password123!"}'
AUTH_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "$LOGIN_DATA")
AUTH_TOKEN=$(echo $AUTH_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
log_pass "Got auth token: ${AUTH_TOKEN:0:20}..."

# Get current user
log_test "Get current user"
curl -s -X GET "$BASE_URL/api/auth/me" \
  -H "Authorization: Bearer $AUTH_TOKEN" | head -c 200
echo ""
echo ""

# 3. Subject Endpoints
echo "========================================="
echo "Testing Subject Endpoints"
echo "========================================="

test_endpoint "GET" "/api/subjects" "" 200 "Get all subjects"
echo ""

# 4. Phase Endpoints
echo "========================================="
echo "Testing Phase Endpoints"
echo "========================================="

test_endpoint "GET" "/api/phases" "" 200 "Get all phases"
echo ""

# 5. Module Endpoints
echo "========================================="
echo "Testing Module Endpoints"
echo "========================================="

# Create module
CREATE_MODULE_DATA='{"title":"Test Module","subjectId":"mat-1","phaseId":"phase-d","grade":9,"description":"Test module"}'
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/api/modules" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -d "$CREATE_MODULE_DATA")
MODULE_ID=$(echo $CREATE_RESPONSE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

if [ ! -z "$MODULE_ID" ]; then
  log_pass "Created module with ID: $MODULE_ID"
  
  # Get modules
  test_endpoint "GET" "/api/modules" "" 200 "Get user modules"
  echo ""
  
  # Get specific module
  test_endpoint "GET" "/api/modules/$MODULE_ID" "" 200 "Get module details"
  echo ""
  
  # Update module
  UPDATE_DATA='{"title":"Updated Test Module"}'
  test_endpoint "PUT" "/api/modules/$MODULE_ID" "$UPDATE_DATA" 200 "Update module"
  echo ""
else
  log_fail "Failed to create module"
fi

# 6. Public Catalog Endpoints
echo "========================================="
echo "Testing Public Catalog"
echo "========================================="

test_endpoint "GET" "/api/modules/published" "" 200 "Get published modules"
echo ""

# 7. Admin Endpoints (if admin)
echo "========================================="
echo "Testing Admin Endpoints"
echo "========================================="

test_endpoint "GET" "/api/admin/modules" "" 200 "Get admin modules"
echo ""

test_endpoint "GET" "/api/admin/stats" "" 200 "Get admin statistics"
echo ""

echo "========================================="
echo "API Testing Complete"
echo "========================================="
