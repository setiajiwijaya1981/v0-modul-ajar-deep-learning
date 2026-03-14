# CONTINUATION PROMPT FOR GEMINI AI

Anda adalah AI assistant yang ahli dalam Full-Stack Development dengan Next.js 16 dan Firebase. Anda diminta untuk melanjutkan development aplikasi "Platform Manajemen Modul Ajar Kurikulum Merdeka" yang sudah 50% selesai.

---

## INSTRUKSI UMUM

1. **JANGAN mengganti code** yang sudah ada tanpa alasan kuat
2. **IKUTI struktur project** yang sudah ada di PROJECT_HANDOFF_GUIDE.md
3. **GUNAKAN TypeScript** dengan tipe yang strict dan complete
4. **IKUTI design system:** Tailwind CSS v4 + Shadcn/ui components
5. **Client/Server Components:** Selalu tandai dengan `'use client'` atau buat sebagai Server Components
6. **Type Safety:** Import types dari `@/lib/firebase/collections.ts`
7. **Error Handling:** Gunakan try-catch + toast notifications
8. **Auto-save:** Setiap form harus auto-save ke Firestore
9. **Mobile First:** Design harus responsive di semua ukuran
10. **Performance:** Optimize images, use lazy loading, minimize bundle size

---

## PRIORITAS TASK (URUTAN PENGERJAAN)

### TASK 1: LENGKAPI FORM SECTIONS 3-18 (Priority: CRITICAL)

**Objective:** Buat 16 form section yang tersisa untuk module builder

**Scope:**
- Section 3: Materi Pembelajaran
- Section 4: Relevansi dengan Kehidupan Nyata
- Section 5: Struktur Materi
- Section 6: Dimensi Profil Pelajar Pancasila
- Section 7: Capaian Pembelajaran
- Section 8: Tujuan Pembelajaran
- Section 9: Lintas Disiplin Ilmu
- Section 10: Topik Pembelajaran & Pertanyaan Pemantik
- Section 11: Praktik Pedagogis
- Section 12: Media & Sumber Belajar
- Section 13: Langkah Pembelajaran (Pertemuan)
- Section 14: Asesmen Awal (Diagnostik)
- Section 15: Asesmen Proses (Formatif)
- Section 16: Asesmen Akhir (Sumatif)
- Section 17: Rubrik Penilaian
- Section 18: Kriteria Ketercapaian + Remedial + Pengayaan + Refleksi

**Requirements per section:**
- [ ] Use react-hook-form untuk state management
- [ ] Zod schema untuk validation
- [ ] Auto-save ke Firebase Firestore
- [ ] Progress bar update otomatis
- [ ] Error states dan loading indicators
- [ ] Mobile responsive
- [ ] Accessible (WCAG AA)
- [ ] Toast feedback untuk user

**Code Pattern:**
```typescript
// /components/modules/form-section-[N].tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useModuleForm } from '@/lib/contexts/module-form-context';

const schema = z.object({
  // Define fields
});

export function FormSection[N]() {
  const { formData, updateFormData } = useModuleForm();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: formData.content.sectionKey || {}
  });

  const onSubmit = async (data) => {
    await updateFormData({ content: { ...formData.content, sectionKey: data } });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

---

### TASK 2: IMPLEMENT EXPORT FUNCTIONALITY (Priority: HIGH)

**Objective:** Buat fitur export modul ke PDF, DOCX, dan HTML

**Scope:**
- [ ] Create `/app/api/modules/[id]/export/pdf` endpoint
- [ ] Create `/app/api/modules/[id]/export/docx` endpoint
- [ ] Create `/app/api/modules/[id]/export/html` endpoint
- [ ] Add export button di module detail page
- [ ] Format output dengan professional styling
- [ ] Include all 18 sections dalam export
- [ ] Test semua format

**Libraries:**
- PDF: Use PDFKit atau html2pdf.js
- DOCX: Use docx library v8.5.0
- HTML: Use React to HTML conversion

**API Pattern:**
```typescript
// /app/api/modules/[id]/export/pdf/route.ts
export async function POST(request: NextRequest, { params }: Props) {
  const { id } = params;
  const moduleData = await getModule(id);
  
  // Generate PDF from moduleData
  const pdfBuffer = generatePDF(moduleData);
  
  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${moduleData.title}.pdf"`
    }
  });
}
```

---

### TASK 3: CREATE ADMIN DASHBOARD (Priority: MEDIUM)

**Objective:** Buat admin interface untuk master data management

**Scope:**
- [ ] Create `/app/admin` layout dengan authentication check
- [ ] `/app/admin/users` - User management
- [ ] `/app/admin/master-data` - CP/TP management
- [ ] `/app/admin/analytics` - Usage statistics
- [ ] Role-based access control
- [ ] Bulk import CSV untuk master data
- [ ] User CRUD operations

**Features:**
- List users dengan filter & search
- Create/Edit/Delete user roles
- Import CP/TP dari CSV
- View/Edit master data
- Export analytics

---

### TASK 4: ADD SHARING & COLLABORATION (Priority: MEDIUM)

**Objective:** Enable guru untuk berbagi modul dengan kolega

**Scope:**
- [ ] Create sharing modal component
- [ ] Implement permission model (view, edit, comment)
- [ ] Public/Private toggle
- [ ] Shared modules library page
- [ ] Comments system
- [ ] Version history viewer

**Collections to use:**
- shared_modules
- comments
- module_versions

---

## CODE PATTERNS YANG DIGUNAKAN

### 1. Database Operations
```typescript
import { getModule, updateModule, createModule } from '@/lib/firebase/db';

// Read
const module = await getModule(moduleId);

// Update
await updateModule(moduleId, { status: 'published' });

// Create
const newId = await createModule(userId, moduleData);
```

### 2. Form Handling dengan Auto-save
```typescript
'use client';
import { useForm } from 'react-hook-form';
import { useModuleForm } from '@/lib/contexts/module-form-context';

export function SectionForm() {
  const { formData, updateFormData } = useModuleForm();
  const form = useForm({
    defaultValues: formData.content.section3 || {}
  });

  // Auto-save on change
  const onSubmit = async (data) => {
    try {
      await updateFormData({
        content: { ...formData.content, section3: data }
      });
      toast.success('Tersimpan otomatis');
    } catch (error) {
      toast.error('Gagal menyimpan');
    }
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>{/* fields */}</form>;
}
```

### 3. API Routes dengan Auth
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const authToken = request.headers.get('authorization')?.split('Bearer ')[1];
    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const decodedToken = await auth.currentUser;
    if (!decodedToken) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    // Process request
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[v0] Error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

### 4. Component Structure
```typescript
// Server Component untuk data fetching
export async function PageComponent() {
  const data = await getModule(id);
  return <ClientComponent initialData={data} />;
}

// Client Component untuk interaksi
'use client';
export function ClientComponent({ initialData }) {
  const [state, setState] = useState(initialData);
  
  return <div>{state}</div>;
}
```

### 5. Loading & Error States
```typescript
import { toast } from 'sonner';

const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleAction = async () => {
  setLoading(true);
  setError(null);
  try {
    await performAction();
    toast.success('Aksi berhasil');
  } catch (err) {
    setError(err.message);
    toast.error(`Error: ${err.message}`);
  } finally {
    setLoading(false);
  }
};
```

---

## IMPORTANT NOTES

### Firestore Rules
- All modules tracked dengan `authorId` untuk permission
- Use `__session` cookie untuk authentication
- Implement RLS (Row Level Security) untuk data access

### Form Context
```typescript
const { formData, updateFormData, completedComponents, getProgress } = useModuleForm();

// formData memiliki struktur:
{
  title, subject, phase, grade, theme, duration,
  content: {
    basicInfo: {...},
    pesertaDidik: {...},
    materiPembelajaran: {...},
    // ... semua 18 sections
  },
  completedComponents: ['basicInfo', 'pesertaDidik'],
  status: 'draft'
}
```

### TypeScript Types
Semua types ada di `/lib/firebase/collections.ts`:
```typescript
export interface Module {
  id: string;
  title: string;
  subject: string;
  phase: string;
  grade: number;
  theme: string;
  duration: number;
  status: 'draft' | 'published' | 'archived';
  content: Record<string, any>;
  completedComponents: string[];
  authorId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
  viewCount: number;
}
```

### Constants & Enums
```typescript
// Status
export const MODULE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
};

// Phases
export const PHASES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Roles
export const ROLES = ['admin', 'guru', 'kepala_sekolah', 'peserta_didik'];
```

---

## TESTING & QUALITY CHECKLIST

Per task completion:
- [ ] Kode mengikuti existing patterns
- [ ] TypeScript types complete (no `any`)
- [ ] Mobile responsive (test di 320px, 768px, 1024px)
- [ ] Accessible - WCAG AA compliance
- [ ] Error handling lengkap
- [ ] Loading states ditampilkan
- [ ] Toast notifications untuk user feedback
- [ ] Console logs hanya [v0] debug statements
- [ ] No console.error tanpa handling
- [ ] Firebase operations tested
- [ ] Forms auto-save tested

---

## FILE NAMING & STRUCTURE

**Ketika membuat file baru, ikuti struktur:**

```
Pages:
  /app/[route]/page.tsx
  /app/api/[endpoint]/route.ts

Components:
  /components/[feature]/[component].tsx
  Use PascalCase untuk component names

Utilities:
  /lib/[category]/[utility].ts
  Use camelCase untuk function names

Styles:
  /app/globals.css untuk global styles
  Use Tailwind classes dalam components
```

---

## DEPLOYMENT & OPTIMIZATION

- Firestore indexes untuk frequently queried collections
- Add Redis caching untuk master data
- Implement rate limiting di API routes
- Optimize images dengan next/image
- Implement proper error logging
- Add Sentry untuk error tracking

---

## NEXT STEPS

1. Baca PROJECT_HANDOFF_GUIDE.md untuk full context
2. Baca KEY_FILES_REFERENCE.md untuk understand existing code
3. Start dengan TASK 1: Add form sections 3-18
4. Test locally sebelum push
5. Submit results dengan pull request format

---

**Ready to start development? Confirm bahwa Anda sudah siap dengan struktur ini!**
