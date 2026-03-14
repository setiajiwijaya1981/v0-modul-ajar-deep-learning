# DOKUMENTASI PROJECT - GEMINI AI HANDOFF

Selamat datang! Folder `/docs/` ini berisi semua dokumentasi yang Anda butuhkan untuk memahami dan melanjutkan development project **Platform Manajemen Modul Ajar Kurikulum Merdeka**.

---

## 📚 DAFTAR DOKUMENTASI

### 1. **PROJECT_HANDOFF_GUIDE.md** (MULAI DARI SINI!)
   - **Durasi membaca:** ~30 menit
   - **Isi:** Overview project, tech stack, struktur folder, status completion
   - **Tujuan:** Pahami big picture project
   - **Action:** Baca terlebih dahulu sebelum file lain

### 2. **GEMINI_AI_CONTINUATION_PROMPT.md**
   - **Durasi membaca:** ~20 menit
   - **Isi:** Guidelines & best practices, code patterns, prioritas task
   - **Tujuan:** Pahami cara development yang sudah diterapkan
   - **Action:** Reference guide selama development

### 3. **KEY_FILES_REFERENCE.md**
   - **Durasi membaca:** ~30 menit
   - **Isi:** Deep dive ke existing code, file-by-file explanation
   - **Tujuan:** Pahami implementation details
   - **Action:** Reference ketika butuh understand existing code

### 4. **GEMINI_DEVELOPMENT_CHECKLIST.md**
   - **Durasi membaca:** ~20 menit
   - **Isi:** Task breakdown dengan detailed checklist
   - **Tujuan:** Track progress & ensure quality
   - **Action:** Follow checklist untuk setiap task

### 5. **GEMINI_STARTER_PROMPT.md**
   - **Durasi membaca:** ~10 menit
   - **Isi:** Prompt siap pakai untuk mulai dengan Gemini
   - **Tujuan:** Copy-paste ke Gemini AI
   - **Action:** Gunakan setelah memahami dokumentasi lain

---

## 🚀 QUICK START (5 MENIT)

```bash
# 1. Install dependencies
pnpm install

# 2. Setup Firebase
# - Buat project di firebase.google.com
# - Copy credentials ke .env.local
# - Setup Firestore collections

# 3. Run dev server
pnpm dev

# 4. Buka http://localhost:3000
```

---

## 📖 READING ORDER

**Untuk developers baru:**

1. ✅ Baca **PROJECT_HANDOFF_GUIDE.md** (pahami project overview)
2. ✅ Baca **KEY_FILES_REFERENCE.md** (pahami existing code)
3. ✅ Baca **GEMINI_AI_CONTINUATION_PROMPT.md** (pahami guidelines)
4. ✅ Baca **GEMINI_DEVELOPMENT_CHECKLIST.md** (pahami task breakdown)
5. ✅ Gunakan **GEMINI_STARTER_PROMPT.md** (mulai dengan Gemini)

**Estimated total reading time: ~90 menit**

---

## 🎯 PROJECT STATUS

### ✅ COMPLETED (50%)
- Firebase integration & authentication
- Database layer dengan 20+ functions
- Module builder framework (2/18 sections)
- Module management pages
- Basic API routes
- Form context dengan auto-save

### ⏳ TODO (50%)
- Add 16 remaining form sections (3-18)
- Implement export (PDF, DOCX, HTML)
- Admin dashboard
- Sharing & collaboration features
- Testing & optimization

---

## 🔧 TECH STACK

```
Frontend:
- Next.js 16 (App Router)
- React 18
- TypeScript
- Tailwind CSS v4

Backend:
- Firebase Auth
- Firebase Firestore
- Firebase Storage

Form & Validation:
- react-hook-form
- Zod

UI & Export:
- Shadcn/ui
- Lucide icons
- Sonner (toasts)
- docx library
- html2pdf.js
```

---

## 📁 PROJECT STRUCTURE

```
/vercel/share/v0-project/
├── app/                        # Next.js pages & routes
│   ├── dashboard/
│   │   └── modules/            # Module management pages
│   ├── auth/                   # Authentication pages
│   ├── api/                    # API routes
│   └── globals.css             # Global styling
├── lib/
│   ├── firebase/               # Firebase utilities
│   └── contexts/               # React contexts
├── components/
│   └── modules/                # Module-specific components
├── docs/ (ANDA DI SINI)        # Project documentation
├── package.json
├── next.config.mjs
├── tsconfig.json
└── middleware.ts
```

---

## 🎓 LEARNING RESOURCES

### Sebelum Mulai Development

1. **Next.js 16**
   - Docs: https://nextjs.org/docs
   - Focus: App Router, Server Components, API Routes

2. **Firebase**
   - Docs: https://firebase.google.com/docs
   - Focus: Firestore, Authentication

3. **React Hook Form**
   - Docs: https://react-hook-form.com/
   - Focus: Form management, validation

4. **Zod**
   - Docs: https://zod.dev/
   - Focus: Schema validation

---

## 🤝 COLLABORATION GUIDELINES

### Dengan Gemini AI

1. **Clear Communication**
   - Provide detailed requirements
   - Share code examples & patterns
   - Clarify ambiguities

2. **Code Review**
   - Test locally sebelum merge
   - Check TypeScript types
   - Verify mobile responsiveness
   - Test error cases

3. **Iteration**
   - Gemini submit → You test → Feedback → Gemini refine
   - Repeat sampai perfection

4. **Documentation**
   - Update docs ketika ada perubahan
   - Comment code yang kompleks
   - Keep README updated

---

## ⚠️ IMPORTANT NOTES

### Firebase Setup
- Buat Firebase project di console.firebase.google.com
- Enable Email/Password authentication
- Create Firestore database
- Copy credentials ke `.env.local`
- Setup Firestore security rules

### Environment Variables
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### Code Patterns
- **Always use TypeScript types** (dari `/lib/firebase/collections.ts`)
- **Use auto-save** (form context handles this)
- **Mobile-first design** (test di 320px, 768px, 1024px)
- **Error handling** (try-catch + toast notifications)
- **Debug logging** (use `console.log("[v0] ...")`)

---

## 🚨 TROUBLESHOOTING

### Problem: "Firebase not found"
**Solution:** Pastikan `.env.local` sudah dikonfigurasi dengan credentials

### Problem: "TypeScript errors"
**Solution:** Run `pnpm build` untuk check, ikuti error messages

### Problem: "Module not found"
**Solution:** Pastikan import paths benar (gunakan `@/` alias)

### Problem: "Form not auto-saving"
**Solution:** Check bahwa component wrapped di `ModuleFormProvider`

---

## 📞 QUICK REFERENCE

### Frequently Used Files
- **Types:** `/lib/firebase/collections.ts`
- **DB Ops:** `/lib/firebase/db.ts`
- **Auth:** `/lib/firebase/auth.ts`
- **Form Context:** `/lib/contexts/module-form-context.tsx`
- **Form Sections:** `/components/modules/module-form-sections.tsx`

### Frequently Used Commands
```bash
pnpm install          # Install dependencies
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm type-check       # Check TypeScript
```

### Frequently Used Patterns
```typescript
// Database operation
import { getModule } from '@/lib/firebase/db';
const module = await getModule(id);

// Form with auto-save
const { formData, updateFormData } = useModuleForm();
await updateFormData({ content: { section: data } });

// API route with auth
const authToken = request.headers.get('authorization');
if (!authToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
```

---

## ✅ BEFORE STARTING

- [ ] Read PROJECT_HANDOFF_GUIDE.md
- [ ] Read KEY_FILES_REFERENCE.md
- [ ] Run `pnpm install`
- [ ] Configure Firebase in `.env.local`
- [ ] Run `pnpm dev` successfully
- [ ] Open http://localhost:3000 in browser
- [ ] Understand project structure
- [ ] Ready untuk start development

---

## 🎉 LET'S BUILD SOMETHING GREAT!

Semua dokumentasi sudah siap. Anda memiliki panduan lengkap untuk:

1. **Memahami** project structure & existing code
2. **Melanjutkan** development dengan guidelines yang jelas
3. **Bekerja dengan Gemini AI** menggunakan starter prompt
4. **Track progress** dengan development checklist
5. **Deliver quality** dengan testing & optimization

**Next step:** Baca PROJECT_HANDOFF_GUIDE.md sekarang! 

Good luck! 🚀

---

**Last Updated:** March 15, 2026  
**Status:** Ready for development  
**Version:** 1.0
