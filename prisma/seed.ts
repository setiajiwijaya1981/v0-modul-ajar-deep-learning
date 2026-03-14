import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const subjects = [
  { code: 'MTK', name: 'Matematika' },
  { code: 'BIN', name: 'Bahasa Indonesia' },
  { code: 'BIN', name: 'Bahasa Inggris' },
  { code: 'IPA', name: 'Ilmu Pengetahuan Alam' },
  { code: 'IPS', name: 'Ilmu Pengetahuan Sosial' },
  { code: 'PKN', name: 'Pendidikan Kewarganegaraan' },
  { code: 'SB', name: 'Seni Budaya' },
  { code: 'PJOK', name: 'Pendidikan Jasmani, Olahraga, dan Kesehatan' },
  { code: 'TIK', name: 'Teknologi Informasi dan Komunikasi' },
  { code: 'PAI', name: 'Pendidikan Agama Islam' },
];

const phases = [
  { phase: 'A', description: 'Fase A (Kelas 1-2)', start_grade: 1, end_grade: 2 },
  { phase: 'B', description: 'Fase B (Kelas 3-4)', start_grade: 3, end_grade: 4 },
  { phase: 'C', description: 'Fase C (Kelas 5-6)', start_grade: 5, end_grade: 6 },
  { phase: 'D', description: 'Fase D (Kelas 7-9)', start_grade: 7, end_grade: 9 },
  { phase: 'E', description: 'Fase E (Kelas 10-11)', start_grade: 10, end_grade: 11 },
  { phase: 'F', description: 'Fase F (Kelas 12)', start_grade: 12, end_grade: 12 },
];

async function main() {
  console.log('Seeding database...');

  // Seed subjects
  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { code: subject.code },
      update: {},
      create: subject,
    });
  }
  console.log('✓ Subjects seeded');

  // Seed phases
  for (const phase of phases) {
    await prisma.phase.upsert({
      where: { phase: phase.phase },
      update: {},
      create: phase,
    });
  }
  console.log('✓ Phases seeded');

  console.log('Seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
