Master Data CP/TP Import Guide
==============================

## Overview

This guide explains how to import ~13,590 Capaian Pembelajaran (CP) and Teaching Objectives (TP) from the Master Data PDF into the ModulAjar database.

## Prerequisites

- Node.js 18+ installed
- Dependencies installed: `pnpm install`
- Environment variables configured (.env.local)
- Neon database connection active
- Prisma migrations applied: `pnpm prisma migrate deploy`

## Master Data Structure

The Trial Master Data PDF contains curriculum data with the following columns:

```
ID | Mata Pelajaran | Kelas | Fase | Paket | Elemen | Capaian Pembelajaran | Dimensi Profil Lulusan
```

**Fields:**
- **ID**: Unique identifier (001-13590)
- **Mata Pelajaran**: Subject (e.g., Pendidikan Agama Islam, Bahasa Indonesia)
- **Kelas**: Grade level (1-2, 3-4, 5-6, 7-9, 10-12)
- **Fase**: Learning phase (A-F)
- **Paket**: Package type (Paket A, Paket B)
- **Elemen**: Curriculum element/component
- **Capaian Pembelajaran**: Learning achievement description
- **Dimensi Profil Lulusan**: Pancasila graduate profile dimension

## Subjects Supported

### Religious Education (6 subjects)
- Pendidikan Agama Islam dan Budi Pekerti (PAI)
- Pendidikan Agama Kristen dan Budi Pekerti (PAK)
- Pendidikan Agama Katolik dan Budi Pekerti (PAKK)
- Pendidikan Agama Hindu dan Budi Pekerti (PAH)
- Pendidikan Agama Buddha dan Budi Pekerti (PAB)
- Pendidikan Agama Khonghucu dan Budi Pekerti (PAKh)

### Core Subjects (10 subjects)
- Pendidikan Pancasila (PP)
- Bahasa Indonesia (BI)
- Bahasa Inggris (BI_ENG)
- Matematika (MTK)
- IPA (Ilmu Pengetahuan Alam) (IPA)
- IPS (Ilmu Pengetahuan Sosial) (IPS)
- Pendidikan Jasmani, Olahraga dan Kesehatan (PJOK)
- Seni dan Budaya (SB)
- Teknologi Informasi dan Komputer (TIK)
- Muatan Lokal (ML)

### Elective/Support Subjects (2+ subjects)
- Bimbingan dan Konseling (BK)
- Program Peminatan (specialized tracks)

**Total: 45+ subjects across all education levels**

## Learning Phases

| Phase | Grade | Duration | Description |
|-------|-------|----------|-------------|
| A | 1-2 | 2 years | Elementary Lower |
| B | 3-4 | 2 years | Elementary Middle |
| C | 5-6 | 2 years | Elementary Upper |
| D | 7-9 | 3 years | Junior Secondary |
| E | 10-12 | 3 years | Senior Secondary |
| F | 13+ | Variable | Higher Education |

## Graduate Profile Dimensions (Profil Pelajar Pancasila)

Each CP/TP is tagged with one or more of these dimensions:

1. **Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia**
2. **Berkebinekaan Global**
3. **Bergotong Royong**
4. **Mandiri**
5. **Bernalar Kritis**
6. **Kreatif**

## Import Process

### Step 1: Prepare Data

Extract CP/TP data from PDF:
```bash
# Manual export to CSV/TSV format from PDF
# File should be saved as: data/master-data.csv
```

**CSV Format:**
```csv
id,mata_pelajaran,kelas,fase,paket,elemen,capaian_pembelajaran,dimensi_profil
001,Pendidikan Agama Islam,1-2,A,Paket A,Al-Qur'an Hadis,Peserta didik memahami huruf hijaiah berharakat...,Beriman
```

### Step 2: Run Import Script

```bash
# Run the import script
pnpm node scripts/import-master-data.js

# Or with TypeScript:
pnpm ts-node scripts/import-master-data.ts
```

**Output:**
```
🚀 Starting Master Data Import...
📊 Target: ~13,590 CP/TP records

Step 1: Setting up subjects and phases...
✓ Prepared 45 subjects and 6 phases

Step 2: Parsing master data records...
✓ Prepared 13590 records for import

Step 3: Validating and transforming data...
✓ Validated 13590 / 13590 records

Step 4: Importing CP/TP to database...
  Processed: 100 / 13590
  Processed: 200 / 13590
  ...
✓ Imported 13590 records

Step 5: Verifying import...
✓ Verification complete:
  - Total CP/TP records: 13590
  - Subjects: 45
  - Phases: 6
  - Elements: ~2400

✅ Master Data Import Complete!
```

### Step 3: Verify Import

```bash
# Connect to database and verify
pnpm prisma studio

# Or run verification query:
pnpm ts-node scripts/verify-import.ts
```

## Database Schema

### Subject Table
```sql
SELECT COUNT(*) FROM "Subject";
-- Expected: 45+ subjects
```

### Phase Table
```sql
SELECT COUNT(*) FROM "Phase";
-- Expected: 6 phases (A-F)
```

### CP/TP Table
```sql
SELECT COUNT(*) FROM "CPTP";
-- Expected: ~13,590 records

SELECT COUNT(DISTINCT "subjectId") FROM "CPTP";
-- Expected: 45+ unique subjects

SELECT COUNT(DISTINCT "phaseId") FROM "CPTP";
-- Expected: 6 phases
```

## Using Imported Data

### In Module Creator Wizard

1. **Select Subject** → Dropdown populated from Subject table
2. **Select Phase** → Dropdown populated from Phase table
3. **Select CP/TP** → Filtered based on subject & phase
4. **Auto-fill Learning Achievement** → From capaianPembelajaran field
5. **Suggest Dimensions** → From dimensiProfil field

### API Endpoints for Data Selection

**Get subjects:**
```bash
GET /api/subjects
```

**Get phases:**
```bash
GET /api/phases
```

**Get CP/TP by subject & phase:**
```bash
GET /api/cptp?subjectId=<id>&phaseId=<id>
```

**Get all CP/TP for a phase:**
```bash
GET /api/cptp?phaseId=<id>
```

## Troubleshooting

### Issue: "Module not found: 'CPTP'"

**Solution:** Ensure Prisma schema is updated:
```bash
pnpm prisma generate
pnpm prisma migrate deploy
```

### Issue: Duplicate records

**Solution:** Script checks for existing records:
```javascript
const existing = await prisma.cPTP.findFirst({
  where: {
    subjectId,
    phaseId,
    elemen,
  }
});
```

### Issue: Import timeout

**Solution:** Increase timeout or batch import:
```bash
# Batch processing: 100 records per iteration (built-in)
# Adjust batch size in import-master-data.js
```

### Issue: Missing subjects/phases

**Solution:** Run setup separately:
```bash
pnpm ts-node scripts/setup-subjects.ts
pnpm ts-node scripts/setup-phases.ts
```

## Performance

- **Import time**: ~5-15 minutes for 13,590 records
- **Database size increase**: ~50-100 MB
- **Query performance**: Indexed by subjectId, phaseId
- **Batch size**: 100 records per insert (configurable)

## Next Steps

After import:

1. **Verify data** - Use Prisma Studio or admin dashboard
2. **Test module creation** - Create sample module with imported CP/TP
3. **Validate completeness** - Check all subjects have data
4. **Backup database** - Save snapshot of imported data
5. **Deploy to production** - Migration script included in deployment

## Support

For issues or questions about master data import:
- Check CPTP table schema: `pnpm prisma studio`
- Review import logs: `scripts/import-master-data.js`
- Verify database connection: `pnpm prisma db execute --stdin < schema.sql`

## References

- Kurikulum Merdeka Documentation
- Pancasila Pelajar Profile (Profil Pelajar Pancasila)
- Master Data Trial PDF (Trial Master Data CP02)
