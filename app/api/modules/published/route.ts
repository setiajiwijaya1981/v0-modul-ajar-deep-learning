import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subject_id = searchParams.get('subject_id');
    const phase_id = searchParams.get('phase_id');
    const search = searchParams.get('search');
    const skip = parseInt(searchParams.get('skip') || '0');
    const take = parseInt(searchParams.get('take') || '12');

    const where: any = {
      status: 'published',
    };

    if (subject_id) where.subject_id = subject_id;
    if (phase_id) where.phase_id = phase_id;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [modules, total] = await Promise.all([
      prisma.module.findMany({
        where,
        include: {
          subject: true,
          phase: true,
        },
        orderBy: { created_at: 'desc' },
        skip,
        take,
      }),
      prisma.module.count({ where }),
    ]);

    return NextResponse.json({
      modules,
      total,
      skip,
      take,
    });
  } catch (error) {
    console.error('[v0] Get published modules error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
