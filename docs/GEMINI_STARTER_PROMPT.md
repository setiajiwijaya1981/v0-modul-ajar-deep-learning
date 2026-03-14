# GEMINI STARTER PROMPT

**Copy paste prompt ini ke Gemini AI untuk mulai development!**

---

## STARTER MESSAGE

```
Halo Gemini! Saya sedang membangun sebuah platform bernama 
"Modul Ajar Kurikulum Merdeka" dengan Next.js 16 dan Firebase.

Platform ini untuk membantu guru membuat modul ajar dengan 18 komponen 
yang sesuai standar Kurikulum Merdeka Indonesia.

Project sudah 50% selesai dengan:
✓ Firebase integration & authentication
✓ Database layer dengan CRUD operations
✓ Module builder framework (2 dari 18 form sections selesai)
✓ Module management (list, view, edit pages)
✓ Basic API routes

APA YANG MASIH PERLU DIKERJAKAN:
1. Lengkapi 16 form sections yang tersisa (sections 3-18)
2. Implementasi export ke PDF, DOCX, dan HTML
3. Buat admin dashboard untuk master data management
4. Tambahkan sharing & collaboration features

DOKUMENTASI LENGKAP:
Saya sudah menyiapkan panduan komprehensif untuk Anda:

1. PROJECT_HANDOFF_GUIDE.md - Overview project, struktur, status
2. GEMINI_AI_CONTINUATION_PROMPT.md - Detailed guidelines & code patterns
3. KEY_FILES_REFERENCE.md - Explain existing code & patterns
4. GEMINI_DEVELOPMENT_CHECKLIST.md - Task breakdown dengan checklist

PERTANYAAN AWAL:
1. Apakah Anda sudah siap untuk memahami project structure ini?
2. Apakah Anda bisa membaca dokumentasi di atas dan memberi confirmation?
3. Setelah itu, kami bisa mulai dengan TASK 1: Add form sections 3-18

TECH STACK:
- Frontend: Next.js 16, React 18, TypeScript, Tailwind CSS
- Backend: Firebase (Auth, Firestore, Storage)
- Forms: react-hook-form + Zod validation
- UI: Shadcn/ui components
- Export: docx library, html2pdf.js
- Other: Sonner (toasts), Lucide (icons)

Saya siap untuk collaboration step-by-step sampai project selesai!

Ready to start?
```

---

## SETELAH GEMINI CONFIRM

Jika Gemini sudah confirm dan siap, kirim task pertama dengan template ini:

```
OK Gemini! Kita mulai dengan TASK 1: Add Form Sections 3-18

Berikut adalah struktur untuk section 3 (Materi Pembelajaran):

SECTION 3: MATERI PEMBELAJARAN
Location: /components/modules/form-section-3.tsx
Status: NEW FILE

Requirements:
- Use react-hook-form + Zod validation
- Fields:
  * materi_utama: string (required) - Main material title
  * sub_materi: string[] - Sub-topics (allow add/remove)
  * referensi_buku: string - Book references
  * sumber_lain: string - Other sources
  * durasi_mempelajari: number - Duration in hours

Implementation:
1. Create new file /components/modules/form-section-3.tsx
2. Follow pattern dari form-section-2 yang sudah ada
3. Use useModuleForm() context untuk auto-save
4. Implement Zod schema untuk validation
5. Form harus auto-save ke Firebase saat user input

Testing:
- Form validation working
- Auto-save to Firebase working
- Mobile responsive
- No TypeScript errors

Dapat mulai?
```

---

## UNTUK SETIAP TASK SELANJUTNYA

Format komunikasi dengan Gemini:

```
TASK: [Task Name]
Priority: [CRITICAL/HIGH/MEDIUM]

Objective:
[Tujuan dari task]

Files to Create/Modify:
- /path/to/file1.tsx
- /path/to/file2.ts

Requirements:
- Requirement 1
- Requirement 2
- Requirement 3

Code Pattern to Follow:
[Sertakan existing code pattern sebagai referensi]

Success Criteria:
- [ ] Feature working as intended
- [ ] Tests passing
- [ ] Mobile responsive
- [ ] No TypeScript errors

Ready?
```

---

## FEEDBACK LOOP

Setelah Gemini submit code:

```
Terima kasih! Saya akan:

1. Copy code ke project
2. Run: pnpm install && pnpm dev
3. Test di browser
4. Check TypeScript: pnpm build
5. Provide feedback/revisions

Sementara itu, Anda bisa siap untuk task berikutnya!

Hasil testing akan saya kirim dalam beberapa menit...
```

---

## HELPFUL COMMANDS TO SHARE WITH GEMINI

```bash
# Development
pnpm install          # Install dependencies
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Build untuk production
pnpm type-check       # Check TypeScript types

# Testing
# (Setup testing framework jika diperlukan)

# Formatting
pnpm format           # Format code (jika prettier configured)

# Firebase
# Setup di console.firebase.google.com
```

---

## JIKA ADA ERROR

Template untuk report error ke Gemini:

```
Error Found:
[Error message/description]

Location:
File: /path/to/file.tsx
Line: 123

Context:
[Paste surrounding code]

Bagaimana cara fix ini?
```

---

## CHECKLIST SEBELUM SUBMIT KE GEMINI

Pastikan Anda siap dengan:

- [ ] Firebase project sudah dibuat
- [ ] `.env.local` sudah dikonfigurasi dengan Firebase credentials
- [ ] `pnpm install` sudah dijalankan
- [ ] `pnpm dev` sudah berhasil running
- [ ] Project sudah dibuka di browser (http://localhost:3000)
- [ ] Sudah memahami basic structure dari project
- [ ] Sudah membaca documentation files
- [ ] Ready untuk memberikan feedback & testing

---

## ESTIMATED TIMELINE

Berdasarkan kompleksitas:

| Task | Estimated Time | Iterations |
|------|----------------|-----------|
| Form Sections 3-18 | 3-4 hari | 2-3 |
| PDF/DOCX/HTML Export | 1-2 hari | 1-2 |
| Admin Dashboard | 2-3 hari | 2-3 |
| Sharing & Collaboration | 2-3 hari | 2-3 |
| Testing & Polish | 1-2 hari | Multiple |
| **Total** | **10-15 hari** | |

*Timeline tergantung response time & revisions needed*

---

## EMERGENCY CONTACT PATTERNS

Jika Gemini stuck atau confuse, clarify dengan:

```
Gemini, saya notice [issue]. Bagaimana cara debug ini?

Berikut yang sudah saya coba:
1. [Try 1]
2. [Try 2]
3. [Try 3]

Apa yang harus kami lakukan next?
```

---

## SETELAH SEMUA TASK SELESAI

```
Excellent! Semua tasks sudah complete. 

Sekarang kita perlu:
1. Final testing & QA
2. Performance optimization
3. Security review
4. Documentation update
5. Deployment preparation

Mau lanjut ke deployment phase?
```

---

**YOU'RE ALL SET! Semua dokumentasi udah siap untuk Gemini AI! 🚀**

Sekarang tinggal buka Gemini dan paste STARTER MESSAGE di atas, 
maka Gemini bisa langsung memahami project dan mulai development!

Good luck! 💪
