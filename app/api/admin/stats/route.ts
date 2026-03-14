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

    const [totalModules, totalUsers, pendingReviews, publishedModules] = await Promise.all([
      prisma.module.count(),
      prisma.user.count(),
      prisma.module.count({ where: { status: 'draft' } }),
      prisma.module.count({ where: { status: 'published' } }),
    ]);

    return NextResponse.json({
      totalModules,
      totalUsers,
      pendingReviews,
      publishedModules,
    });
  } catch (error) {
    console.error('[v0] Get admin stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
