// Edge Runtime compatible JWT utilities using jose
// Works in middleware, API routes, and anywhere else

import { jwtVerify, SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

export interface AuthPayload {
  userId: string;
  email: string;
  role: 'teacher' | 'admin' | 'school_admin';
  schoolId?: string;
}

export async function createAuthToken(payload: AuthPayload): Promise<string> {
  const expiresIn = 7 * 24 * 60 * 60; // 7 days in seconds
  
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(`${expiresIn}s`)
    .setIssuedAt()
    .sign(JWT_SECRET);
  
  return token;
}

export async function verifyAuthToken(token: string): Promise<AuthPayload | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as AuthPayload;
  } catch (error) {
    console.error('[JWT] Verification failed:', error);
    return null;
  }
}
