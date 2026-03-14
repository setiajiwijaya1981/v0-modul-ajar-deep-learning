# GEMINI DEVELOPMENT CHECKLIST

Gunakan checklist ini untuk track progress dan ensure quality di setiap task.

---

## SEBELUM MULAI

- [ ] Baca PROJECT_HANDOFF_GUIDE.md (30 menit)
- [ ] Baca GEMINI_AI_CONTINUATION_PROMPT.md (20 menit)
- [ ] Baca KEY_FILES_REFERENCE.md (30 menit)
- [ ] Understand tech stack: Next.js 16, Firebase, Tailwind CSS, React Hook Form
- [ ] Understand project structure & file organization
- [ ] Understand Firebase Firestore collections
- [ ] Clone/access project dan run `pnpm install`
- [ ] Run `pnpm dev` dan test development server

---

## TASK 1: ADD FORM SECTIONS 3-18

### Preparation
- [ ] Understand existing sections 1-2 di `/components/modules/module-form-sections.tsx`
- [ ] Understand form context di `/lib/contexts/module-form-context.tsx`
- [ ] Understand progress sidebar di `/components/modules/progress-sidebar.tsx`
- [ ] Review Zod schema patterns
- [ ] Review react-hook-form patterns

### Section 3: Materi Pembelajaran
**Component:** `/components/modules/form-section-3.tsx` (NEW)

Checklist:
- [ ] Create component file
- [ ] Define Zod schema untuk fields:
  - [ ] materi_utama: string (required)
  - [ ] sub_materi: string[] (multiple topics)
  - [ ] referensi_buku: string (book references)
  - [ ] sumber_lain: string (additional sources)
  - [ ] durasi_mempelajari: number (hours)
- [ ] Create form dengan react-hook-form
- [ ] Add auto-save logic to context
- [ ] Connect to ProgressSidebar
- [ ] Test mobile responsiveness
- [ ] Test form validation
- [ ] Test auto-save to Firebase

### Section 4: Relevansi dengan Kehidupan Nyata
**Component:** `/components/modules/form-section-4.tsx` (NEW)

Checklist:
- [ ] Create component file
- [ ] Define Zod schema untuk fields:
  - [ ] konteks_nyata: string[] (real-world contexts)
  - [ ] contoh_kasus: string (case examples)
  - [ ] manfaat_praktis: string[] (practical benefits)
  - [ ] aplikasi_kehidupan: string (life application)
- [ ] Create form dengan react-hook-form
- [ ] Add textarea for long text input
- [ ] Add multi-select for arrays
- [ ] Implement auto-save
- [ ] Test validation

### Section 5: Struktur Materi
**Component:** `/components/modules/form-section-5.tsx` (NEW)

- [ ] Create component dengan hierarchy/tree structure
- [ ] Allow nested topics
- [ ] Add/remove hierarchy items
- [ ] Auto-save struktur

### Section 6: Dimensi Profil Pelajar Pancasila
**Component:** `/components/modules/form-section-6.tsx` (NEW)

- [ ] Create checklist untuk 6 dimensi:
  - [ ] Beriman, Bertakwa, Berakhlak Mulia
  - [ ] Berkebinekaan Global
  - [ ] Bergotong Royong
  - [ ] Mandiri
  - [ ] Bernalar Kritis
  - [ ] Kreatif
- [ ] Untuk setiap dimensi, allow textarea untuk implementasi
- [ ] Auto-save selections & descriptions

### Section 7: Capaian Pembelajaran
**Component:** `/components/modules/form-section-7.tsx` (NEW)

- [ ] Create dropdown/select dari master_cp collection
- [ ] Allow multiple CP selections
- [ ] Show CP description on hover
- [ ] Link dengan TP di section 8
- [ ] Auto-save selections

### Section 8: Tujuan Pembelajaran
**Component:** `/components/modules/form-section-8.tsx` (NEW)

- [ ] Create dependent dropdown dari selected CP (section 7)
- [ ] Show TP items & descriptions
- [ ] Allow multiple TP selections
- [ ] Show associated indicators
- [ ] Auto-save selections

### Section 9: Lintas Disiplin Ilmu
**Component:** `/components/modules/form-section-9.tsx` (NEW)

- [ ] Create multi-select untuk disciplines:
  - [ ] Bahasa Indonesia
  - [ ] Matematika
  - [ ] IPAS (IPA + IPS)
  - [ ] PJOK
  - [ ] Seni Budaya
  - [ ] Tekhnologi
- [ ] Allow custom descriptions per discipline
- [ ] Auto-save

### Section 10: Topik Pembelajaran & Pertanyaan Pemantik
**Component:** `/components/modules/form-section-10.tsx` (NEW)

- [ ] Fields:
  - [ ] topik_utama: string (main topic)
  - [ ] sub_topik: string[] (sub topics)
  - [ ] pertanyaan_pemantik: string[] (guiding questions)
- [ ] Allow add/remove topik & questions
- [ ] Auto-save

### Section 11: Praktik Pedagogis
**Component:** `/components/modules/form-section-11.tsx` (NEW)

- [ ] Fields:
  - [ ] pendekatan: enum (PBL, PJBL, Discovery, etc.)
  - [ ] model: enum (Cooperative, Collaborative, etc.)
  - [ ] metode: string[] (Discussion, Case Study, etc.)
- [ ] Dropdown selections
- [ ] Descriptions per choice
- [ ] Auto-save

### Section 12: Media & Sumber Belajar
**Component:** `/components/modules/form-section-12.tsx` (NEW)

- [ ] Fields:
  - [ ] media_digital: string[] (Videos, websites, etc.)
  - [ ] media_cetak: string[] (Books, magazines, etc.)
  - [ ] media_lingkungan: string (Environment sources)
  - [ ] narasumber: string[] (Expert sources)
  - [ ] file_lampiran: File[] (File uploads)
- [ ] File upload integration dengan Firebase Storage
- [ ] Preview uploaded files
- [ ] Auto-save with file references

### Section 13: Langkah Pembelajaran
**Component:** `/components/modules/form-section-13.tsx` (NEW)

- [ ] Complex section dengan multiple pertemuan (meetings)
- [ ] Per pertemuan:
  - [ ] Nomor pertemuan
  - [ ] Durasi
  - [ ] Kegiatan awal (opening)
  - [ ] Kegiatan inti (core) dengan activities
  - [ ] Kegiatan penutup (closing)
- [ ] Allow add/remove pertemuan
- [ ] Each activity has: nama, durasi, metode
- [ ] Auto-save

### Section 14: Asesmen Awal (Diagnostik)
**Component:** `/components/modules/form-section-14.tsx` (NEW)

- [ ] Fields:
  - [ ] jenis_asesmen: enum (Quiz, Observation, Interview, etc.)
  - [ ] instrumen: string (Assessment tool)
  - [ ] pertanyaan: string[] (Questions)
  - [ ] kunci_jawaban: string (Answer key)
- [ ] Allow add/remove questions
- [ ] Auto-save

### Section 15: Asesmen Proses (Formatif)
**Component:** `/components/modules/form-section-15.tsx` (NEW)

- [ ] Similar to Section 14
- [ ] Fields:
  - [ ] aktivitas: string
  - [ ] indikator: string[]
  - [ ] rubrik: object (rubric scoring)
- [ ] Auto-save

### Section 16: Asesmen Akhir (Sumatif)
**Component:** `/components/modules/form-section-16.tsx` (NEW)

- [ ] Similar pattern
- [ ] Include comprehensive assessment tools
- [ ] Scoring rubrics
- [ ] Auto-save

### Section 17: Rubrik Penilaian
**Component:** `/components/modules/form-section-17.tsx` (NEW)

- [ ] Table-based rubric builder
- [ ] Criteria rows, score columns
- [ ] Descriptors per cell
- [ ] Add/remove rows & columns
- [ ] Auto-save

### Section 18: Kriteria Ketercapaian + Remedial + Pengayaan + Refleksi
**Component:** `/components/modules/form-section-18.tsx` (NEW)

- [ ] Sub-section 1: Kriteria Ketercapaian
  - [ ] Target score
  - [ ] Passing grade
  - [ ] Descriptors for achievement levels
- [ ] Sub-section 2: Remedial
  - [ ] Strategi pembelajaran ulang
  - [ ] Material support
  - [ ] Timeline
- [ ] Sub-section 3: Pengayaan
  - [ ] Enrichment activities
  - [ ] Challenge tasks
- [ ] Sub-section 4: Refleksi
  - [ ] Teacher reflection questions
  - [ ] Student reflection prompts
- [ ] Auto-save all sub-sections

### Final Checklist for All Sections
- [ ] All sections integrated ke ProgressSidebar
- [ ] All sections show di module detail page
- [ ] Progress bar updates correctly
- [ ] Form validation working
- [ ] Auto-save to Firebase working
- [ ] Mobile responsive (test pada 320px, 768px, 1024px)
- [ ] Accessibility OK (WCAG AA)
- [ ] No console errors
- [ ] All imports correct
- [ ] TypeScript types complete (no `any`)

---

## TASK 2: IMPLEMENT EXPORT FUNCTIONALITY

### Preparation
- [ ] Understand export requirements (PDF, DOCX, HTML)
- [ ] Review library documentation:
  - [ ] PDFKit atau html2pdf.js
  - [ ] docx v8.5.0
- [ ] Test libraries locally

### PDF Export
**Files to create:**
- [ ] `/app/api/modules/[id]/export/pdf/route.ts` (API endpoint)
- [ ] `/lib/export/pdf.ts` (PDF generation utility)

Checklist:
- [ ] API endpoint untuk POST request
- [ ] Auth verification
- [ ] Fetch module data dengan all sections
- [ ] Format data untuk PDF
- [ ] Generate PDF with proper styling
- [ ] Include all 18 sections dalam PDF
- [ ] Add header (title, author, date)
- [ ] Add table of contents
- [ ] Add page numbers
- [ ] Test PDF output quality
- [ ] Test file download

### DOCX Export
**Files to create:**
- [ ] `/app/api/modules/[id]/export/docx/route.ts` (API endpoint)
- [ ] `/lib/export/docx.ts` (DOCX generation utility)

Checklist:
- [ ] API endpoint
- [ ] Auth verification
- [ ] Fetch module data
- [ ] Create Word document structure
- [ ] Format text, headings, tables
- [ ] Include all sections
- [ ] Make it editable (DOCX format)
- [ ] Add page breaks between sections
- [ ] Test DOCX can open di Word/Google Docs
- [ ] Verify formatting

### HTML Export
**Files to create:**
- [ ] `/app/api/modules/[id]/export/html/route.ts` (API endpoint)
- [ ] `/lib/export/html.ts` (HTML generation utility)

Checklist:
- [ ] API endpoint
- [ ] Fetch module data
- [ ] Generate semantic HTML
- [ ] Add CSS styling (embedded or linked)
- [ ] Include table of contents
- [ ] Make responsive
- [ ] Test HTML rendering di browser
- [ ] Verify all content visible

### Export UI Integration
**File to update:**
- [ ] `/app/dashboard/modules/[id]/page.tsx` (Module detail page)

Checklist:
- [ ] Add export dropdown button
- [ ] Add loading state during export
- [ ] Show success toast after download
- [ ] Handle errors with error toast
- [ ] Test all 3 export formats
- [ ] Test on mobile (button accessible)

### Quality Checks
- [ ] All exports include complete module data
- [ ] Formatting consistent & professional
- [ ] File sizes reasonable
- [ ] Download naming convention: `{moduleName}-{date}.{ext}`
- [ ] Error handling untuk failed exports
- [ ] Performance OK (not too slow)

---

## TASK 3: CREATE ADMIN DASHBOARD

### Preparation
- [ ] Review admin requirements
- [ ] Understand role-based access control
- [ ] Plan admin layout structure

### Admin Layout
**Files to create:**
- [ ] `/app/admin/layout.tsx` (Admin layout)

Checklist:
- [ ] Verify user is admin
- [ ] Create sidebar dengan admin links
- [ ] Create header
- [ ] Auth protection middleware

### Admin Users Page
**File:** `/app/admin/users/page.tsx`

Checklist:
- [ ] Fetch all users dari Firestore
- [ ] Display users dalam table
- [ ] Search users by name/email
- [ ] Filter by role
- [ ] Edit user role
- [ ] Delete user account
- [ ] Create new user
- [ ] Confirm dialogs untuk destructive actions
- [ ] Toast notifications for actions
- [ ] Pagination if many users

### Admin Master Data Page
**File:** `/app/admin/master-data/page.tsx`

Checklist:
- [ ] CP/TP management UI
- [ ] Display existing CP & TP
- [ ] Edit CP & TP
- [ ] Delete CP & TP
- [ ] Create new CP & TP
- [ ] Bulk import CSV functionality
- [ ] Download CP/TP as CSV
- [ ] Search & filter master data
- [ ] Validation for import

### Admin Analytics Page
**File:** `/app/admin/analytics/page.tsx`

Checklist:
- [ ] Show statistics:
  - [ ] Total modules created
  - [ ] Total modules published
  - [ ] Total users
  - [ ] Active users (last 30 days)
  - [ ] Most used subjects
  - [ ] Most viewed modules
- [ ] Charts untuk visualization (optional)
- [ ] Date range filtering
- [ ] Export analytics as CSV

### Quality Checks
- [ ] Only admins can access `/admin`
- [ ] All operations require confirmation
- [ ] Error handling
- [ ] Loading states
- [ ] Mobile responsive
- [ ] Audit logging (optional)

---

## TASK 4: ADD SHARING & COLLABORATION

### Sharing Modal
**File:** `/components/sharing-modal.tsx`

Checklist:
- [ ] Modal untuk share configuration
- [ ] Search untuk find users
- [ ] Checkboxes para select users
- [ ] Permission selection (view, edit, comment)
- [ ] Public/Private toggle
- [ ] Share link copy functionality
- [ ] Unshare options
- [ ] Toast notifications

### Shared Modules Library
**File:** `/app/dashboard/shared/page.tsx`

Checklist:
- [ ] Display modules shared dengan current user
- [ ] Filter by permission level
- [ ] Show owner information
- [ ] Sort options
- [ ] Access shared module untuk view/edit
- [ ] Unshare option

### Comments System
**Files:**
- [ ] `/components/comments-section.tsx` (Comments UI)
- [ ] `/app/api/modules/[id]/comments/route.ts` (Comments API)

Checklist:
- [ ] Display comments sa module
- [ ] Add comment form
- [ ] Real-time comment updates (optional)
- [ ] Delete own comments
- [ ] Edit own comments
- [ ] Reply to comments (nested)
- [ ] Timestamp display
- [ ] User avatar display

### Version History
**File:** `/components/version-history.tsx`

Checklist:
- [ ] Display version list
- [ ] Show version timestamp & author
- [ ] Show changelog
- [ ] Compare versions (diff view)
- [ ] Restore to previous version
- [ ] Delete old versions

### Quality Checks
- [ ] Permission checks on backend
- [ ] Real-time updates working
- [ ] Comments moderation ready (optional)
- [ ] Version storage optimized
- [ ] UI intuitive & easy to use

---

## TESTING & QA

### Before Committing Each Task

**Functional Testing:**
- [ ] Feature works as intended
- [ ] All CRUD operations tested
- [ ] Error cases handled
- [ ] Success/failure feedback clear

**UI/UX Testing:**
- [ ] Responsive on mobile (320px)
- [ ] Responsive on tablet (768px)
- [ ] Responsive on desktop (1024px+)
- [ ] Buttons/inputs easily clickable
- [ ] Loading states visible
- [ ] Success/error toasts appear

**TypeScript/Code Quality:**
- [ ] No TypeScript errors (`pnpm build`)
- [ ] No console.error (except [v0] debug)
- [ ] All imports correct
- [ ] No unused variables
- [ ] Types complete (no `any`)
- [ ] Code follows existing patterns

**Performance:**
- [ ] Page loads quickly
- [ ] Forms responsive (no lag)
- [ ] Exports don't timeout
- [ ] Database queries optimized

**Security:**
- [ ] Auth checks on all protected routes
- [ ] Input validation on forms
- [ ] API auth verification
- [ ] No sensitive data in logs
- [ ] CORS configured correctly

---

## DEPLOYMENT CHECKLIST

Before final deployment to production:
- [ ] All tasks completed
- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] Performance optimized
- [ ] Security reviewed
- [ ] Error logging configured
- [ ] Environment variables set
- [ ] Firebase rules configured
- [ ] Database indexes created
- [ ] Backup strategy defined
- [ ] Documentation updated

---

## PROGRESS TRACKING

Use this table to track task completion:

| Task | Status | Start Date | End Date | Notes |
|------|--------|-----------|---------|-------|
| Form Sections 3-18 | ⏳ IN PROGRESS | | | |
| PDF Export | ⏳ NOT STARTED | | | |
| DOCX Export | ⏳ NOT STARTED | | | |
| HTML Export | ⏳ NOT STARTED | | | |
| Admin Dashboard | ⏳ NOT STARTED | | | |
| Sharing Features | ⏳ NOT STARTED | | | |
| Testing & QA | ⏳ NOT STARTED | | | |
| Deployment | ⏳ NOT STARTED | | | |

---

**Good luck! 🚀 Follow this checklist step-by-step untuk ensure quality delivery!**
