# KEY FILES REFERENCE - CODE PATTERNS TO UNDERSTAND

Sebelum Gemini mulai development, pahami file-file kunci ini dan code patterns yang digunakan.

---

## 1. FIREBASE CONFIGURATION

### File: `/lib/firebase.ts` (33 lines)
**Tujuan:** Inisialisasi Firebase client SDK

**Key Functions:**
- Koneksi ke Firebase project
- Client SDK initialization
- Exported `db`, `auth`, `storage` untuk digunakan di app

**Import Pattern:**
```typescript
import { db, auth, storage } from '@/lib/firebase';
```

**Penggunaan:**
- Di client components untuk real-time data
- Di API routes untuk Firestore access

---

## 2. DATABASE LAYER

### File: `/lib/firebase/db.ts` (293 lines)
**Tujuan:** Semua database operations untuk Firestore

**Key Functions:**
```typescript
// User operations
async getUser(userId: string): Promise<User>
async updateUser(userId: string, data: Partial<User>): Promise<void>
async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<string>

// Module operations
async createModule(userId: string, data: CreateModuleInput): Promise<string>
async getModule(moduleId: string): Promise<Module>
async updateModule(moduleId: string, updates: Partial<Module>): Promise<void>
async deleteModule(moduleId: string): Promise<void>
async getUserModules(userId: string): Promise<Module[]>
async searchModules(query: string, filters?: ModuleFilters): Promise<Module[]>
async publishModule(moduleId: string): Promise<void>

// Master data operations
async getMasterCP(): Promise<CP[]>
async getMasterTP(): Promise<TP[]>
async importMasterData(data: ImportData): Promise<void>

// Sharing operations
async shareModule(moduleId: string, userId: string, permission: Permission): Promise<void>
async getSharedModules(userId: string): Promise<Module[]>

// Comments & versions
async addComment(moduleId: string, userId: string, content: string): Promise<void>
async getComments(moduleId: string): Promise<Comment[]>
async createModuleVersion(moduleId: string, snapshot: object): Promise<void>
async getModuleVersions(moduleId: string): Promise<ModuleVersion[]>
```

**Type Definitions:**
```typescript
export interface Module {
  id: string;
  title: string;
  slug: string;
  description: string;
  authorId: string;
  subject: string;
  phase: string;
  grade: number;
  theme: string;
  duration: number;
  status: 'draft' | 'published' | 'archived';
  content: Record<string, any>;
  completedComponents: string[];
  viewCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
  version: number;
  tags: string[];
}
```

**Import Pattern:**
```typescript
import { 
  getModule, 
  updateModule, 
  getUserModules,
  createModule,
  searchModules 
} from '@/lib/firebase/db';
```

**Usage Example:**
```typescript
// Server Component
async function ModuleDetail({ params }: { params: { id: string } }) {
  const module = await getModule(params.id);
  return <ModuleDisplay module={module} />;
}

// Client Component
'use client';
export function ModuleForm() {
  const handleSave = async (data) => {
    await updateModule(moduleId, data);
  };
}
```

---

## 3. AUTHENTICATION

### File: `/lib/firebase/auth.ts` (125 lines)
**Tujuan:** Auth utilities dan user management

**Key Functions:**
```typescript
export async function signUp(email: string, password: string, userData: UserData): Promise<User>
export async function login(email: string, password: string): Promise<User>
export async function logout(): Promise<void>
export function getCurrentUser(): User | null
export async function resetPassword(email: string): Promise<void>
export async function signInWithGoogle(): Promise<User>
export async function signInWithGitHub(): Promise<User>
```

**Session Management:**
```typescript
// Firebase sets __session cookie automatically
// Middleware checks for this cookie
// getCurrentUser() reads from Firebase Auth context
```

**Usage:**
```typescript
import { getCurrentUser, login, signUp } from '@/lib/firebase/auth';

// In client component
'use client';
const user = getCurrentUser();

// In API route
const user = await getCurrentUser();
if (!user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

---

## 4. MODULE FORM CONTEXT

### File: `/lib/contexts/module-form-context.tsx` (126 lines)
**Tujuan:** Manage form state dengan auto-save

**Key Functions:**
```typescript
export function useModuleForm() {
  return {
    formData: ModuleFormData,           // Current form data
    updateFormData: (data) => void,     // Update & auto-save
    completedComponents: string[],      // Completed sections
    markComponentDone: (key) => void,   // Mark section complete
    getProgress: () => number,          // Get completion %
    isLoading: boolean,                 // Loading state
    isSaving: boolean,                  // Saving state
  }
}
```

**Form Data Structure:**
```typescript
interface ModuleFormData {
  // Basic info
  title: string;
  subject: string;
  phase: string;
  grade: number;
  theme: string;
  duration: number;
  
  // Content per section
  content: {
    basicInfo?: { /* Section 1 data */ };
    pesertaDidik?: { /* Section 2 data */ };
    materiPembelajaran?: { /* Section 3 data */ };
    // ... 15 more sections
  };
  
  // Tracking
  completedComponents: string[];
  status: 'draft' | 'published';
}
```

**Usage:**
```typescript
'use client';
import { useModuleForm } from '@/lib/contexts/module-form-context';

export function FormSection() {
  const { formData, updateFormData } = useModuleForm();
  
  const handleSave = async (data) => {
    // This auto-saves to Firebase
    await updateFormData({
      content: { ...formData.content, sectionKey: data }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSave)}>
      {/* Form fields */}
    </form>
  );
}
```

---

## 5. MODULE BUILDER PAGE

### File: `/app/dashboard/modules/create/page.tsx`
**Tujuan:** Main module builder interface

**Structure:**
```typescript
// Wrapped in ModuleFormProvider for context
export default function CreateModulePage() {
  return (
    <ModuleFormProvider>
      <ModuleBuilderContent />
    </ModuleFormProvider>
  );
}

// Main content
function ModuleBuilderContent() {
  const [activeComponent, setActiveComponent] = useState('basicInfo');
  const { formData, completedComponents, getProgress } = useModuleForm();
  
  // Sidebar shows all 18 components with progress
  // Main area shows form section for activeComponent
  // Auto-save on every change
}
```

**Key Features:**
- Sidebar navigation untuk 18 sections
- Progress bar
- Auto-save
- Real-time validation feedback

---

## 6. FORM SECTIONS COMPONENTS

### File: `/components/modules/module-form-sections.tsx` (227 lines)
**Tujuan:** Form sections 1-2 implementation

**Sections Included:**
1. BasicInfoForm - Title, subject, phase, grade, etc.
2. PesertaDidikForm - Student characteristics, learning styles

**Pattern untuk Setiap Section:**
```typescript
export function FormSection3() {
  const { formData, updateFormData } = useModuleForm();
  
  const schema = z.object({
    // Define fields for this section
  });
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: formData.content.section3 || {}
  });
  
  const onSubmit = async (data) => {
    await updateFormData({
      content: { ...formData.content, section3: data }
    });
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields using shadcn components */}
    </form>
  );
}
```

---

## 7. PROGRESS SIDEBAR

### File: `/components/modules/progress-sidebar.tsx` (94 lines)
**Tujuan:** Show 18 sections dengan completion status

**Features:**
- List all 18 sections
- Highlight active section
- Show completion check mark
- Navigation onClick handler

**Props:**
```typescript
interface ProgressSidebarProps {
  activeComponent: string;
  onComponentClick: (key: string) => void;
}
```

---

## 8. MODULE LIST PAGE

### File: `/app/dashboard/modules/page.tsx`
**Tujuan:** Display user's modules

**Features:**
- Grid/List view
- Search & filter by status/subject
- Sort options
- Card per module showing:
  - Title, description
  - Subject, phase
  - Status badge
  - View count
  - Created date

**Implementation Pattern:**
```typescript
'use client';

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  useEffect(() => {
    const loadModules = async () => {
      const user = getCurrentUser();
      const userModules = await getUserModules(user.uid);
      setModules(userModules);
    };
    loadModules();
  }, []);
  
  // Filter & display modules
}
```

---

## 9. MODULE DETAIL PAGE

### File: `/app/dashboard/modules/[id]/page.tsx`
**Tujuan:** View module details dengan edit capability

**Sections:**
- Header dengan title & status
- Info grid (subject, phase, views)
- Tabbed content showing all sections
- Action buttons (edit, publish, export, share, delete)

**Implementation:**
```typescript
'use client';

export default function ModuleDetailPage() {
  const [module, setModule] = useState<Module | null>(null);
  
  useEffect(() => {
    const module = await getModule(params.id);
    setModule(module);
  }, []);
  
  return (
    <div>
      {/* Header */}
      {/* Content tabs */}
      {/* Action buttons */}
    </div>
  );
}
```

---

## 10. API ROUTES

### File: `/app/api/modules/route.ts`
**Tujuan:** CRUD endpoints untuk modules

**Endpoints:**
```typescript
POST /api/modules
  - Create new module
  - Body: { title, subject, phase, grade, description, theme, duration }
  - Returns: { id, message }

GET /api/modules
  - Get user's modules
  - Returns: { modules: Module[], total: number }

// Per module endpoints (next to implement)
GET /api/modules/[id]
POST /api/modules/[id]
DELETE /api/modules/[id]

// Export endpoints
POST /api/modules/[id]/export/pdf
POST /api/modules/[id]/export/docx
POST /api/modules/[id]/export/html

// Share endpoints
POST /api/modules/[id]/share
GET /api/modules/[id]/shared-with

// Comment endpoints
POST /api/modules/[id]/comments
GET /api/modules/[id]/comments
```

**Auth Pattern:**
```typescript
export async function POST(request: NextRequest) {
  const authToken = request.headers.get('authorization')?.split('Bearer ')[1];
  if (!authToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Verify token & process
}
```

---

## 11. MIDDLEWARE

### File: `/middleware.ts`
**Tujuan:** Route protection

**Current Logic:**
```typescript
// Public routes - no auth needed
if (publicRoutes.includes(pathname)) return NextResponse.next();

// Protected routes - check __session cookie
if (protectedRoutes.includes(pathname)) {
  if (!request.cookies.get('__session')?.value) {
    return NextResponse.redirect('/auth/login');
  }
}
```

**To add new protected routes:**
- Add route pattern ke protectedRoutes array

---

## 12. COLLECTIONS & TYPES

### File: `/lib/firebase/collections.ts` (51 lines)
**Tujuan:** Firestore schema & TypeScript types

**Key Exports:**
```typescript
export interface User { /* ... */ }
export interface Module { /* ... */ }
export interface MasterCP { /* ... */ }
export interface MasterTP { /* ... */ }
export interface SharedModule { /* ... */ }
export interface Comment { /* ... */ }
export interface ModuleVersion { /* ... */ }

export const MODULE_STATUS = { DRAFT, PUBLISHED, ARCHIVED }
export const PHASES = [A, B, C, D, E, F, G, H]
export const ROLES = [admin, guru, kepala_sekolah, peserta_didik]
```

**Import untuk type safety:**
```typescript
import { Module, User, MasterCP } from '@/lib/firebase/collections';
```

---

## 13. LAYOUT & STYLING

### File: `/app/layout.tsx`
**Providers:**
- Sonner for toast notifications
- Tailwind CSS
- Firebase context (implicitly via __session)

### File: `/app/globals.css`
**Contains:**
- Tailwind directives
- Design tokens (colors, spacing)
- Custom CSS utilities

---

## COMMON PATTERNS

### 1. Server Component fetching data
```typescript
export async function Page() {
  const data = await getModule(id);
  return <ClientComponent initialData={data} />;
}
```

### 2. Client Component with form
```typescript
'use client';
export function Component() {
  const [data, setData] = useState(null);
  useEffect(() => { /* fetch */ }, []);
  return <form onSubmit={handleSubmit}>{/* */}</form>;
}
```

### 3. API route with auth
```typescript
export async function POST(request: NextRequest) {
  const authToken = getToken(request);
  if (!authToken) return error401();
  const body = await request.json();
  try {
    const result = await performAction(body);
    return NextResponse.json(result);
  } catch (error) {
    return error500(error);
  }
}
```

### 4. Form dengan auto-save
```typescript
const handleChange = async (data) => {
  setLoading(true);
  try {
    await updateModule(moduleId, data);
    toast.success('Tersimpan');
  } catch (error) {
    toast.error('Error: ' + error.message);
  } finally {
    setLoading(false);
  }
};
```

---

## SUMMARY

- **Master file untuk schema:** `/lib/firebase/collections.ts`
- **Master file untuk operations:** `/lib/firebase/db.ts`
- **Master file untuk auth:** `/lib/firebase/auth.ts`
- **Master file untuk form state:** `/lib/contexts/module-form-context.tsx`
- **Main builder page:** `/app/dashboard/modules/create/page.tsx`
- **Form sections:** `/components/modules/module-form-sections.tsx`

Semua file lain bergantung pada ini. Understand patterns di file-file ini sebelum membuat yang baru!
