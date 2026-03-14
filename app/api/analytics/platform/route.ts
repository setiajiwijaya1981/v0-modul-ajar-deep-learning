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

    // Overall platform stats
    const [totalModules, totalUsers, publishedModules, totalViews, recentModules] = await Promise.all([
      prisma.module.count(),
      prisma.user.count(),
      prisma.module.count({ where: { status: 'published' } }),
      prisma.module.aggregate({
        _sum: { views_count: true },
      }),
      prisma.module.findMany({
        select: {
          id: true,
          title: true,
          views_count: true,
          created_by_user: { select: { name: true } },
          created_at: true,
        },
        orderBy: { created_at: 'desc' },
        take: 10,
      }),
    ]);

    // Users by role
    const usersByRole = await prisma.user.groupBy({
      by: ['role'],
      _count: true,
    });

    return NextResponse.json({
      totalModules,
      totalUsers,
      publishedModules,
      totalViews: totalViews._sum.views_count || 0,
      usersByRole,
      recentModules,
    });
  } catch (error) {
    console.error('[v0] Get platform analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
