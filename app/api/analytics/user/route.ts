import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.userId;

    // Get user's modules stats
    const [totalModules, publishedModules, draftModules, totalViews] = await Promise.all([
      prisma.module.count({
        where: { created_by: userId },
      }),
      prisma.module.count({
        where: { created_by: userId, status: 'published' },
      }),
      prisma.module.count({
        where: { created_by: userId, status: 'draft' },
      }),
      prisma.module.aggregate({
        where: { created_by: userId },
        _sum: { views_count: true },
      }),
    ]);

    // Get recent modules
    const recentModules = await prisma.module.findMany({
      where: { created_by: userId },
      select: {
        id: true,
        title: true,
        views_count: true,
        created_at: true,
        status: true,
      },
      orderBy: { created_at: 'desc' },
      take: 5,
    });

    return NextResponse.json({
      totalModules,
      publishedModules,
      draftModules,
      totalViews: totalViews._sum.views_count || 0,
      recentModules,
    });
  } catch (error) {
    console.error('[v0] Get user analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
