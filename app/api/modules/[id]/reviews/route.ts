import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (session?.role !== 'admin' && session?.role !== 'school_admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status, notes } = body;

    const review = await prisma.moduleReview.create({
      data: {
        module_id: id,
        reviewed_by: session.userId,
        status,
        notes,
      },
    });

    // Update module status
    await prisma.module.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('[v0] Create review error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const reviews = await prisma.moduleReview.findMany({
      where: { module_id: id },
      include: {
        reviewed_by_user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('[v0] Get reviews error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
