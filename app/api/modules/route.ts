import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, subject_id, phase_id, description } = body;

    // Validation
    if (!title || !subject_id || !phase_id) {
      return NextResponse.json(
        { error: 'Title, subject_id, and phase_id are required' },
        { status: 400 }
      );
    }

    // Create module
    const module = await prisma.module.create({
      data: {
        title,
        description,
        subject_id,
        phase_id,
        created_by: session.userId,
        status: 'draft',
      },
      include: {
        subject: true,
        phase: true,
      },
    });

    return NextResponse.json(module, { status: 201 });
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
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get('skip') || '0');
    const take = parseInt(searchParams.get('take') || '10');

    const modules = await prisma.module.findMany({
      where: {
        created_by: session.userId,
      },
      include: {
        subject: true,
        phase: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      skip,
      take,
    });

    const total = await prisma.module.count({
      where: {
        created_by: session.userId,
      },
    });

    return NextResponse.json({
      modules,
      total,
      skip,
      take,
    });
  } catch (error) {
    console.error('[v0] Get modules error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
