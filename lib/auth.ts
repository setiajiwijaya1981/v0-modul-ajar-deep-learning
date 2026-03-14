// This file exports auth types and token creation
// For password hashing, import from './password' (Node.js only)
// For token verification, use './jwt' directly from middleware

export interface AuthPayload {
  userId: string;
  email: string;
  role: 'teacher' | 'admin' | 'school_admin';
  schoolId?: string;
}

// Token creation is handled in jwt.ts
export { createAuthToken, verifyAuthToken } from './jwt';

