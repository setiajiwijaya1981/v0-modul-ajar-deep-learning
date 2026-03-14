import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/password';
import { createAuthToken } from '@/lib/jwt';
import { setSessionCookie } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, school_id, role } = body;

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: (role as any) || 'teacher',
        school_id: school_id || null,
      },
    });

    // Create auth token
    const token = await createAuthToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      schoolId: user.school_id || undefined,
    });

    // Set session cookie
    await setSessionCookie(token);

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Register error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
