import bcrypt from 'bcryptjs';
import { jwtVerify, jwtSign } from './jwt';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export interface AuthPayload {
  userId: string;
  email: string;
  role: 'teacher' | 'admin' | 'school_admin';
  schoolId?: string;
}

export async function createAuthToken(payload: AuthPayload): Promise<string> {
  const expiresIn = 7 * 24 * 60 * 60; // 7 days
  return jwtSign(payload, expiresIn);
}

export async function verifyAuthToken(token: string): Promise<AuthPayload | null> {
  try {
    const verified = await jwtVerify(token);
    return verified as AuthPayload;
  } catch {
    return null;
  }
}
