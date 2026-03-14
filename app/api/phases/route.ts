import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const phases = await prisma.phase.findMany({
      orderBy: { phase: 'asc' },
    });

    return NextResponse.json(phases);
  } catch (error) {
    console.error('[v0] Get phases error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
