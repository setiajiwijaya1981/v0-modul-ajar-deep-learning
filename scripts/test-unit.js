import { prisma } from '../lib/db.js';
import { hashPassword, verifyPassword } from '../lib/password.js';
import { createAuthToken, verifyAuthToken } from '../lib/jwt.js';

// Test utilities
function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',
    pass: '\x1b[32m',
    fail: '\x1b[31m',
    warn: '\x1b[33m',
    reset: '\x1b[0m',
  };
  console.log(`${colors[type]}[${type.toUpperCase()}]${colors.reset} ${message}`);
}

async function runTests() {
  console.log('\n========================================');
  console.log('Starting Unit & Integration Tests');
  console.log('========================================\n');

  let passed = 0;
  let failed = 0;

  try {
    // Test 1: Database Connection
    log('Testing database connection...', 'info');
    try {
      const userCount = await prisma.user.count();
      log(`Database connected. User count: ${userCount}`, 'pass');
      passed++;
    } catch (error) {
      log(`Database connection failed: ${error.message}`, 'fail');
      failed++;
    }

    // Test 2: Password Hashing
    log('\nTesting password hashing...', 'info');
    try {
      const plainPassword = 'TestPassword123!';
      const hash = await hashPassword(plainPassword);
      
      if (hash !== plainPassword) {
        log('Password hashed successfully', 'pass');
        passed++;
      } else {
        log('Password not hashed (same as input)', 'fail');
        failed++;
      }

      // Test password verification
      const verified = await verifyPassword(plainPassword, hash);
      if (verified) {
        log('Password verification passed', 'pass');
        passed++;
      } else {
        log('Password verification failed', 'fail');
        failed++;
      }

      const wrongVerified = await verifyPassword('WrongPassword123!', hash);
      if (!wrongVerified) {
        log('Wrong password correctly rejected', 'pass');
        passed++;
      } else {
        log('Wrong password incorrectly accepted', 'fail');
        failed++;
      }
    } catch (error) {
      log(`Password hashing test failed: ${error.message}`, 'fail');
      failed += 3;
    }

    // Test 3: JWT Token Creation
    log('\nTesting JWT token creation...', 'info');
    try {
      const payload = {
        userId: 'test-user-123',
        email: 'test@example.com',
        role: 'teacher',
        schoolId: 'school-123',
      };

      const token = await createAuthToken(payload);
      if (token && typeof token === 'string') {
        log(`JWT token created: ${token.substring(0, 30)}...`, 'pass');
        passed++;
      } else {
        log('JWT token creation failed', 'fail');
        failed++;
      }

      // Test token verification
      const verified = await verifyAuthToken(token);
      if (verified && verified.userId === payload.userId) {
        log('JWT token verification passed', 'pass');
        passed++;
      } else {
        log('JWT token verification failed', 'fail');
        failed++;
      }

      // Test invalid token
      const invalidVerified = await verifyAuthToken('invalid-token');
      if (!invalidVerified) {
        log('Invalid token correctly rejected', 'pass');
        passed++;
      } else {
        log('Invalid token incorrectly accepted', 'fail');
        failed++;
      }
    } catch (error) {
      log(`JWT token test failed: ${error.message}`, 'fail');
      failed += 3;
    }

    // Test 4: Database Schema
    log('\nTesting database schema...', 'info');
    try {
      // Test Subject table
      const subjects = await prisma.subject.findMany({ take: 1 });
      log(`Subjects table exists (found ${subjects.length} records)`, 'pass');
      passed++;

      // Test Phase table
      const phases = await prisma.phase.findMany({ take: 1 });
      log(`Phases table exists (found ${phases.length} records)`, 'pass');
      passed++;

      // Test School table
      const schools = await prisma.school.findMany({ take: 1 });
      log(`Schools table exists (found ${schools.length} records)`, 'pass');
      passed++;

      // Test User table
      const users = await prisma.user.findMany({ take: 1 });
      log(`Users table exists (found ${users.length} records)`, 'pass');
      passed++;

      // Test Module table
      const modules = await prisma.module.findMany({ take: 1 });
      log(`Modules table exists (found ${modules.length} records)`, 'pass');
      passed++;
    } catch (error) {
      log(`Database schema test failed: ${error.message}`, 'fail');
      failed += 5;
    }

    // Test 5: Data Integrity
    log('\nTesting data integrity...', 'info');
    try {
      // Check for orphaned modules
      const orphanedModules = await prisma.module.findMany({
        where: {
          subject: null,
        },
        take: 1,
      });

      if (orphanedModules.length === 0) {
        log('No orphaned modules found', 'pass');
        passed++;
      } else {
        log(`Found ${orphanedModules.length} orphaned modules`, 'warn');
      }

      // Check module content
      const modulesWithContent = await prisma.module.count({
        where: {
          content: {
            isNot: null,
          },
        },
      });
      log(`Found ${modulesWithContent} modules with content`, 'pass');
      passed++;
    } catch (error) {
      log(`Data integrity test failed: ${error.message}`, 'fail');
      failed += 2;
    }

  } catch (error) {
    log(`Unexpected error: ${error.message}`, 'fail');
    failed++;
  } finally {
    // Disconnect Prisma
    await prisma.$disconnect();

    // Print summary
    console.log('\n========================================');
    console.log('Test Summary');
    console.log('========================================');
    console.log(`${colors.pass}Passed: ${passed}${colors.reset}`);
    console.log(`${colors.fail}Failed: ${failed}${colors.reset}`);
    console.log(`Total: ${passed + failed}`);
    console.log('========================================\n');

    process.exit(failed > 0 ? 1 : 0);
  }
}

// Run tests
runTests().catch((error) => {
  log(`Fatal error: ${error.message}`, 'fail');
  process.exit(1);
});
