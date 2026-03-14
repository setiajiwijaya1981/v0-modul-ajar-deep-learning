import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Verify module exists and user owns it
    const module = await prisma.module.findUnique({
      where: { id },
    });

    if (!module) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      );
    }

    if (module.created_by !== session.userId) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Delete existing content if any
    await prisma.moduleContent.deleteMany({
      where: { moduleId: id },
    });

    // Create new content
    const content = await prisma.moduleContent.create({
      data: {
        moduleId: id,
        pesertaDidikIdentifikasi: body.pesertaDidikIdentifikasi,
        materiPembelajaran: body.materiPembelajaran,
        relevansiKehidupanNyata: body.relevansiKehidupanNyata,
        strukturMateri: body.strukturMateri,
        dimensiProfilPelajar: body.dimensiProfilPelajar,
        capaianPembelajaran: body.capaianPembelajaran,
        elemenCapaian: body.elemenCapaian,
        tujuanPembelajaran: body.tujuanPembelajaran,
        lintasDisiplinIlmu: body.lintasDisiplinIlmu,
        topikUtama: body.topikUtama,
        subTopik: body.subTopik,
        pertanyaanPemantik: body.pertanyaanPemantik,
        pendekatanPembelajaran: body.pendekatanPembelajaran,
        modelPembelajaran: body.modelPembelajaran,
        metodePembelajaran: body.metodePembelajaran,
        mediaSourceBelajar: body.mediaSourceBelajar,
        langkahPembelajaran: body.langkahPembelajaran,
        asesmenAwal: body.asesmenAwal,
        asesmenProses: body.asesmenProses,
        asesmenAkhir: body.asesmenAkhir,
        rubrikPenilaian: body.rubrikPenilaian,
        kriteriaKetercapaian: body.kriteriaKetercapaian,
        remedial: body.remedial,
        pengayaan: body.pengayaan,
        refleksi: body.refleksi,
      },
    });

    // Update module status
    await prisma.module.update({
      where: { id },
      data: { status: 'published' },
    });

    return NextResponse.json(content, { status: 201 });
  } catch (error) {
    console.error('[v0] Create content error:', error);
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

    const content = await prisma.moduleContent.findFirst({
      where: { moduleId: id },
    });

    if (!content) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('[v0] Get content error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
