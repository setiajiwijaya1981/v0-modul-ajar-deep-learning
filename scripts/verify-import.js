#!/usr/bin/env node

/**
 * Master Data Import Verification Script
 * Verifies the integrity and completeness of imported CP/TP data
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyImport() {
  console.log('\n📊 Master Data Import Verification\n');
  console.log('=' .repeat(60));

  try {
    // 1. Subject Verification
    console.log('\n1️⃣  SUBJECT VERIFICATION');
    const subjects = await prisma.subject.count();
    const subjectDetails = await prisma.subject.findMany({
      select: { code: true, name: true, _count: { select: { cPTP: true } } }
    });
    
    console.log(`   Total subjects: ${subjects}`);
    console.log(`   Subjects with CP/TP data:`);
    subjectDetails.forEach(s => {
      console.log(`     • ${s.code}: ${s.name} (${s._count.cPTP} records)`);
    });

    // 2. Phase Verification
    console.log('\n2️⃣  PHASE VERIFICATION');
    const phases = await prisma.phase.findMany({
      select: { code: true, name: true, _count: { select: { cPTP: true } } }
    });
    
    console.log(`   Total phases: ${phases.length}`);
    phases.forEach(p => {
      console.log(`     • ${p.code}: ${p.name} (${p._count.cPTP} records)`);
    });

    // 3. CP/TP Data Verification
    console.log('\n3️⃣  CP/TP DATA VERIFICATION');
    const totalCPTP = await prisma.cPTP.count();
    console.log(`   Total CP/TP records: ${totalCPTP}`);
    
    const distinctElements = await prisma.cPTP.groupBy({
      by: ['elemen'],
    });
    console.log(`   Distinct elements: ${distinctElements.length}`);
    
    const distinctDimensions = await prisma.cPTP.groupBy({
      by: ['dimensiProfil'],
    });
    console.log(`   Distinct profile dimensions: ${distinctDimensions.length}`);

    // 4. Data Distribution
    console.log('\n4️⃣  DATA DISTRIBUTION');
    const byPhase = await prisma.cPTP.groupBy({
      by: ['phaseId'],
      _count: true,
      orderBy: { phaseId: 'asc' }
    });
    
    console.log(`   Distribution by phase:`);
    for (const item of byPhase) {
      const phase = await prisma.phase.findUnique({
        where: { id: item.phaseId }
      });
      console.log(`     • Phase ${phase?.code} (${phase?.name}): ${item._count} records`);
    }

    // 5. Data Quality Checks
    console.log('\n5️⃣  DATA QUALITY CHECKS');
    
    // Check for null values
    const nullCapaian = await prisma.cPTP.count({
      where: { capaianPembelajaran: null }
    });
    console.log(`   Records with null capaianPembelajaran: ${nullCapaian}`);
    
    const nullDimensi = await prisma.cPTP.count({
      where: { dimensiProfil: null }
    });
    console.log(`   Records with null dimensiProfil: ${nullDimensi}`);
    
    // Check for duplicates
    const duplicates = await prisma.$queryRaw`
      SELECT "subjectId", "phaseId", "elemen", COUNT(*) as count
      FROM "CPTP"
      GROUP BY "subjectId", "phaseId", "elemen"
      HAVING COUNT(*) > 1
    `;
    console.log(`   Potential duplicate records: ${(duplicates as any[]).length}`);

    // 6. Sample Data
    console.log('\n6️⃣  SAMPLE DATA');
    const samples = await prisma.cPTP.findMany({
      take: 3,
      include: { subject: true, phase: true }
    });
    
    samples.forEach((sample, i) => {
      console.log(`\n   Sample ${i + 1}:`);
      console.log(`     Subject: ${sample.subject.name}`);
      console.log(`     Phase: ${sample.phase.name}`);
      console.log(`     Element: ${sample.elemen?.substring(0, 50)}...`);
      console.log(`     Achievement: ${sample.capaianPembelajaran?.substring(0, 60)}...`);
    });

    // 7. Summary & Status
    console.log('\n' + '='.repeat(60));
    console.log('\n📈 IMPORT SUMMARY');
    console.log(`   Status: ${totalCPTP > 10000 ? '✅ COMPLETE' : '⚠️  INCOMPLETE'}`);
    console.log(`   Total records imported: ${totalCPTP} / ~13,590`);
    console.log(`   Coverage: ${((totalCPTP / 13590) * 100).toFixed(1)}%`);
    console.log(`   Subjects: ${subjects}`);
    console.log(`   Phases: ${phases.length}`);
    console.log(`   Data quality: ${nullCapaian === 0 && nullDimensi === 0 ? '✅ Good' : '⚠️  Issues detected'}`);

    console.log('\n✅ Verification complete!\n');

  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run verification
verifyImport().catch(error => {
  console.error(error);
  process.exit(1);
});
