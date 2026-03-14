import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (session?.role !== 'admin' && session?.role !== 'school_admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const skip = parseInt(searchParams.get('skip') || '0');
    const take = parseInt(searchParams.get('take') || '10');

    const where: any = {};
    if (status && status !== 'all') {
      where.status = status;
    }

    const [modules, total] = await Promise.all([
      prisma.module.findMany({
        where,
        include: {
          subject: true,
          phase: true,
          created_by_user: {
            select: { id: true, name: true, email: true },
          },
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
    console.error('[v0] Get modules for admin error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
