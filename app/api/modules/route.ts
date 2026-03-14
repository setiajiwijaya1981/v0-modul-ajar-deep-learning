import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import { createModule, getUserModules } from '@/lib/firebase/db';

export async function POST(request: NextRequest) {
  try {
    const authToken = request.headers.get('authorization')?.split('Bearer ')[1];
    if (!authToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify token
    const decodedToken = await auth.currentUser;
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, subject, phase, grade, description, theme, duration } = body;

    // Validation
    if (!title || !subject || !phase) {
      return NextResponse.json(
        { error: 'Title, subject, and phase are required' },
        { status: 400 }
      );
    }

    // Create module
    const moduleId = await createModule(decodedToken.uid, {
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      description: description || '',
      status: 'draft',
      subject,
      phase,
      grade: grade || 0,
      theme: theme || '',
      duration: duration || 0,
      content: {},
      cpTpReferences: [],
      tags: [],
    });

    return NextResponse.json({ id: moduleId, message: 'Module created successfully' }, { status: 201 });
  } catch (error) {
    console.error('[v0] Create module error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authToken = request.headers.get('authorization')?.split('Bearer ')[1];
    if (!authToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify token
    const decodedToken = await auth.currentUser;
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const modules = await getUserModules(decodedToken.uid);

    return NextResponse.json({
      modules,
      total: modules.length,
    });
  } catch (error) {
    console.error('[v0] Get modules error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
