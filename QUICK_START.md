# Quick Start Guide - Platform Modul Ajar

## 5-Minute Setup

### 1. Clone & Install
```bash
git clone <repo-url>
cd v0-project
npm install
```

### 2. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project "modul-ajar"
3. Enable Firestore Database
4. Enable Authentication (Email/Password)
5. Copy Web SDK config

### 3. Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx

APP_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Run Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## Key Features

### For Teachers:
- Create 18-component modules in guided steps
- Auto-save to Firebase
- Publish and share modules
- Export to PDF/DOCX
- Track module views

### For Admins:
- Manage master curriculum data (CP & TP)
- View platform analytics
- User management
- System configuration

---

## Architecture Overview

```
Next.js 16 (Frontend)
    ↓
React 19 + TypeScript
    ↓
Shadcn/ui Components + Tailwind CSS
    ↓
Firebase SDK (Client)
    ├── Authentication
    ├── Firestore Database
    └── Cloud Storage
    
API Routes (Backend)
    ↓
Firebase Admin SDK (Server)
    ↓
Firestore Collections & Rules
```

---

## Main Components

### Form System
- **Context**: `lib/contexts/module-form-context.tsx`
- **Progress UI**: `components/modules/progress-sidebar.tsx`
- **Form Sections**: `components/modules/module-form-sections.tsx`

### Database
- **Utilities**: `lib/firebase/db.ts` (20+ functions)
- **Auth**: `lib/firebase/auth.ts` (signup, login, OAuth)
- **Collections**: `lib/firebase/collections.ts` (constants, types)

### Pages
- Create Module: `/dashboard/modules/create`
- Module List: `/dashboard/modules`
- Module Detail: `/dashboard/modules/[id]`

---

## API Endpoints

```
POST   /api/modules              Create module
GET    /api/modules              List user modules
GET    /api/modules/:id          Get module detail
PUT    /api/modules/:id          Update module
DELETE /api/modules/:id          Delete module
POST   /api/modules/:id/publish  Publish module
```

---

## Database Collections

### users
```json
{
  "uid": "user123",
  "email": "teacher@school.id",
  "name": "John Doe",
  "role": "teacher",
  "school": "SMP Negeri 1",
  "subject": "IPS"
}
```

### modules
```json
{
  "id": "mod123",
  "title": "Perubahan Sosial",
  "authorId": "user123",
  "subject": "IPS",
  "phase": "D",
  "grade": 9,
  "status": "draft",
  "content": {
    "basicInfo": {...},
    "pesertaDidik": {...},
    "... 18 components total"
  },
  "completedComponents": ["basicInfo", "pesertaDidik"],
  "viewCount": 0
}
```

---

## Development Workflow

### 1. Add New Form Section
Edit `components/modules/module-form-sections.tsx`:
```tsx
export function MateriPembelajaranForm() {
  const { formData, updateFormData, markComponentComplete } = useModuleForm();
  // Add form JSX
}
```

### 2. Create API Route
Create `app/api/endpoint/route.ts`:
```tsx
export async function GET(request) {
  // Handle request
}
```

### 3. Test with Firebase
- Use Firebase Emulator (local development)
- Check Firestore Console for data

---

## Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npx tsc --noEmit
```

---

## Troubleshooting

### Error: "Unauthorized"
- Check user is logged in
- Verify Firebase credentials in `.env.local`

### Module not saving
- Check browser DevTools for errors
- Verify Firestore write permissions
- Check data structure matches schema

### Page not loading
- Check if user is authenticated
- Verify page route exists
- Check API endpoints are correct

---

## Next Steps

1. **Complete Form Sections** (3-18)
   - Add UI for remaining components
   - Add validation rules

2. **Implement Export**
   - PDF generation with PDFKit
   - DOCX generation with docx library

3. **Add Admin Features**
   - Master data management
   - User dashboard
   - Analytics

4. **Security**
   - Firestore Security Rules
   - Input validation
   - Error handling

---

## Resources

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed setup instructions
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Project status
- [Firebase Docs](https://firebase.google.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

## Support

For issues:
1. Check console errors
2. Review SETUP_GUIDE.md
3. Check Firestore console
4. Verify environment variables

Kontribusi dan bug reports welcome!
