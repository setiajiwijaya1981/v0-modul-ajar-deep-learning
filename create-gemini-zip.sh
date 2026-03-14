#!/bin/bash

# Modul Ajar Platform - ZIP Creation Script
# Script ini membuat ZIP file untuk di-upload ke Gemini AI

echo "🚀 Creating ZIP file for Gemini AI..."

# Create temporary directory
mkdir -p gemini-upload-temp

# Copy documentation files
echo "📄 Copying documentation..."
mkdir -p gemini-upload-temp/docs
cp -r docs/* gemini-upload-temp/docs/ 2>/dev/null || true
cp GEMINI_HANDOFF_READY.md gemini-upload-temp/ 2>/dev/null || true
cp README.md gemini-upload-temp/ 2>/dev/null || true
cp QUICK_START.md gemini-upload-temp/ 2>/dev/null || true
cp SETUP_GUIDE.md gemini-upload-temp/ 2>/dev/null || true

# Copy source code
echo "💻 Copying source code..."
mkdir -p gemini-upload-temp/src
cp -r app gemini-upload-temp/src/ 2>/dev/null || true
cp -r components gemini-upload-temp/src/ 2>/dev/null || true
cp -r lib gemini-upload-temp/src/ 2>/dev/null || true
cp -r hooks gemini-upload-temp/src/ 2>/dev/null || true
cp -r prisma gemini-upload-temp/src/ 2>/dev/null || true
cp -r scripts gemini-upload-temp/src/ 2>/dev/null || true

# Copy configuration files
echo "⚙️  Copying configuration files..."
cp package.json gemini-upload-temp/
cp tsconfig.json gemini-upload-temp/
cp next.config.mjs gemini-upload-temp/
cp components.json gemini-upload-temp/
cp middleware.ts gemini-upload-temp/
cp .env.example gemini-upload-temp/ 2>/dev/null || true
cp .env.local gemini-upload-temp/env-template.txt 2>/dev/null || true

# Copy style files
echo "🎨 Copying styles..."
mkdir -p gemini-upload-temp/styles
cp -r app/globals.css gemini-upload-temp/styles/ 2>/dev/null || true
cp -r styles/* gemini-upload-temp/styles/ 2>/dev/null || true

# Create a manifest file
echo "📋 Creating manifest..."
cat > gemini-upload-temp/MANIFEST.txt << 'EOF'
=================================================================================
MODUL AJAR PLATFORM - GEMINI AI HANDOFF PACKAGE
=================================================================================

CONTENTS:
---------

1. DOCUMENTATION/
   - docs/README.md                          → Start here!
   - docs/PROJECT_HANDOFF_GUIDE.md          → Project overview
   - docs/GEMINI_AI_CONTINUATION_PROMPT.md  → Development guidelines
   - docs/KEY_FILES_REFERENCE.md            → Important files explained
   - docs/GEMINI_DEVELOPMENT_CHECKLIST.md   → Task checklist
   - docs/GEMINI_STARTER_PROMPT.md          → Copy-paste prompt
   - docs/HANDOFF_COMPLETE.md               → Completion summary
   - docs/NEXT_STEPS.txt                    → Next actions

2. QUICK REFERENCE/
   - README.md                → Project overview
   - GEMINI_HANDOFF_READY.md → This handoff package info
   - QUICK_START.md          → 5-minute setup
   - SETUP_GUIDE.md          → Detailed setup

3. SOURCE CODE/
   - src/app/                → Next.js pages & routes
   - src/components/         → React components
   - src/lib/                → Utilities & Firebase
   - src/hooks/              → React hooks
   - src/prisma/             → Database schema
   - src/scripts/            → Utility scripts

4. CONFIGURATION/
   - package.json            → Dependencies
   - tsconfig.json           → TypeScript config
   - next.config.mjs         → Next.js config
   - components.json         → Shadcn config
   - middleware.ts           → Auth middleware
   - styles/                 → Global CSS

=================================================================================
HOW TO USE THIS PACKAGE
=================================================================================

STEP 1: Extract this ZIP file
  $ unzip modul-ajar-platform-gemini.zip
  $ cd gemini-upload

STEP 2: Read documentation in order:
  1. docs/README.md
  2. docs/PROJECT_HANDOFF_GUIDE.md
  3. docs/GEMINI_AI_CONTINUATION_PROMPT.md
  4. docs/KEY_FILES_REFERENCE.md

STEP 3: Copy GEMINI_STARTER_PROMPT.md content
  - Open: docs/GEMINI_STARTER_PROMPT.md
  - Copy "## STARTER MESSAGE" section

STEP 4: Open Gemini AI and paste
  - Go to: https://gemini.google.com
  - Create new chat
  - Paste the STARTER MESSAGE

STEP 5: Gemini will be ready for development!

=================================================================================
PROJECT STATUS: 50% COMPLETE
=================================================================================

COMPLETED:
✓ Firebase integration & setup
✓ Database layer (Firestore)
✓ User authentication
✓ Module CRUD operations
✓ Module builder framework
✓ Form sections 1-2 (Basic Info, Peserta Didik)
✓ Module management (list, detail, create)
✓ API endpoints
✓ Progress tracking system

TODO (For Gemini to complete):
□ Add form sections 3-18
□ Implement export (PDF, DOCX, HTML)
□ Admin dashboard
□ Sharing & collaboration
□ Master data management
□ Firestore security rules

=================================================================================
IMPORTANT FILES GEMINI WILL NEED
=================================================================================

Database Layer:
  - lib/firebase/db.ts           → All database functions
  - lib/firebase/auth.ts         → Authentication utilities
  - lib/firebase/collections.ts  → Data types & schemas

Form & State:
  - lib/contexts/module-form-context.tsx → Form state management
  - components/modules/module-form-sections.tsx → Form components
  - components/modules/progress-sidebar.tsx → Progress UI

Pages:
  - app/dashboard/modules/create/page.tsx → Module builder
  - app/dashboard/modules/page.tsx → Module list
  - app/dashboard/modules/[id]/page.tsx → Module detail

API:
  - app/api/modules/route.ts → Module endpoints
  - app/api/auth/* → Auth endpoints

=================================================================================
TECH STACK SUMMARY
=================================================================================

Frontend:
  - Next.js 16 (App Router)
  - React 18
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui components

Backend:
  - Firebase Authentication
  - Firestore (NoSQL database)
  - Cloud Storage
  - Firebase Admin SDK

Libraries:
  - react-hook-form (forms)
  - zod (validation)
  - sonner (toast notifications)
  - recharts (charts)

=================================================================================
FIRESTORE COLLECTIONS
=================================================================================

1. users
   - uid, email, name, role, school, subject, createdAt

2. modules
   - id, title, subject, phase, grade, status, authorId, content
   - completedComponents[], viewCount, createdAt, updatedAt

3. master_cp
   - id, kelas, mataPelajaran, deskripsi

4. master_tp
   - id, cpId, deskripsi, indikator

5. shared_modules
   - moduleId, ownerId, sharedWith[], permission

6. comments
   - moduleId, userId, content, createdAt

7. module_versions
   - moduleId, versionNumber, snapshot, changeLog

8. settings
   - appVersion, lastUpdated, features

=================================================================================
QUICK SETUP CHECKLIST
=================================================================================

□ Install dependencies: pnpm install
□ Setup .env.local with Firebase credentials
□ Run: pnpm dev
□ Test at: http://localhost:3000
□ Read all docs in docs/ folder
□ Copy GEMINI_STARTER_PROMPT.md
□ Paste to Gemini AI
□ Start development!

=================================================================================
COMMUNICATION WITH GEMINI
=================================================================================

1. Paste STARTER PROMPT
2. Gemini will confirm understanding
3. You assign tasks from GEMINI_DEVELOPMENT_CHECKLIST.md
4. Gemini provides code
5. You test and give feedback
6. Repeat until feature complete
7. Move to next task

Example:
  You: "Task 1: Add form section 3 (Materi Pembelajaran) following the checklist"
  Gemini: [provides code]
  You: "Test it... works great! Next: Add form section 4..."

=================================================================================
SUPPORT & REFERENCES
=================================================================================

- Firebase Docs: firebase.google.com
- Next.js Docs: nextjs.org
- React Docs: react.dev
- Tailwind Docs: tailwindcss.com
- Shadcn/ui: ui.shadcn.com

=================================================================================
Created: 2026-03-15
Package Version: 1.0.0
Ready for Gemini AI Upload!
=================================================================================
EOF

echo "✅ Manifest created!"

# Create a gemini-ready index file
echo "📑 Creating Gemini-ready index..."
cat > gemini-upload-temp/GEMINI_START_HERE.md << 'EOF'
# 🚀 START HERE - GEMINI AI HANDOFF PACKAGE

## Welcome! 👋

This is a **complete handoff package** for continuing development of the **Modul Ajar Platform** (Educational Module Management System) using Gemini AI.

## What's Inside?

✅ **Complete Source Code** - All 9+ source files and components  
✅ **7 Documentation Files** - Comprehensive guides and checklists  
✅ **Configuration Files** - Ready-to-use setup  
✅ **Database Schema** - Firestore collections defined  
✅ **API Endpoints** - Firebase integration complete  

## 5-Minute Quick Start

### 1. Read This First (2 min)
```
Start with: docs/README.md
Then: docs/PROJECT_HANDOFF_GUIDE.md
```

### 2. Understand Development Guidelines (2 min)
```
Read: docs/GEMINI_AI_CONTINUATION_PROMPT.md
This explains HOW to develop, best practices, code patterns
```

### 3. Get the Prompt (1 min)
```
Copy from: docs/GEMINI_STARTER_PROMPT.md
Section: "## STARTER MESSAGE"
```

## What This Package Contains

```
/docs/
  ├── README.md                          ← Index of all docs
  ├── PROJECT_HANDOFF_GUIDE.md          ← Detailed overview
  ├── GEMINI_AI_CONTINUATION_PROMPT.md  ← Development rules
  ├── KEY_FILES_REFERENCE.md            ← Code deep-dive
  ├── GEMINI_DEVELOPMENT_CHECKLIST.md   ← Task tracking
  ├── GEMINI_STARTER_PROMPT.md          ← Ready-to-paste
  ├── HANDOFF_COMPLETE.md               ← Completion status
  └── NEXT_STEPS.txt                    ← What to do next

/src/
  ├── app/                 ← Next.js pages
  ├── components/          ← React components
  ├── lib/                 ← Utilities & Firebase
  ├── hooks/               ← Custom hooks
  ├── prisma/              ← Database
  └── scripts/             ← Utility scripts

/config files/
  ├── package.json         ← Dependencies
  ├── tsconfig.json        ← TypeScript
  ├── next.config.mjs      ← Next.js config
  └── middleware.ts        ← Auth middleware
```

## Project Status

**Current:** 50% Complete ✅
- Firebase integration ✅
- Database & API ✅
- Auth system ✅
- Module builder (2/18 sections) ✅
- Module management ✅

**Remaining:** 50%
- Add 16 more form sections
- Export functionality
- Admin dashboard
- Sharing & collaboration

## How to Use This Package

### Option 1: Let Gemini Read Everything (Recommended)

1. Open Gemini AI: https://gemini.google.com
2. Open: `docs/GEMINI_STARTER_PROMPT.md`
3. Copy the "## STARTER MESSAGE" section
4. Paste it into Gemini chat
5. Gemini will have all context needed!

### Option 2: Manual Setup

1. Read `docs/README.md` first
2. Follow the reading order in docs/
3. Copy `docs/GEMINI_STARTER_PROMPT.md`
4. Paste to Gemini

## Key Concepts

**18 Components Modul Ajar:**
1. Informasi Dasar ✅
2. Identifikasi Peserta Didik ✅
3-18. [Remaining sections - Gemini will add these]

**Tech Stack:**
- Next.js 16 + React 18 + TypeScript
- Firebase (Auth + Firestore)
- Tailwind CSS + Shadcn/ui

**Database:**
- 8 Firestore collections
- 20+ database functions
- Real-time updates ready

## Development Flow

```
You → Assign Task → Gemini → Write Code → You Review
  ↑                                        ↓
  └────────── Provide Feedback ←───────────┘
```

## Next Steps

1. **Read** `docs/README.md` (5 min)
2. **Setup** Firebase credentials (10 min)
3. **Run** `pnpm install && pnpm dev` (5 min)
4. **Open** Gemini AI (1 min)
5. **Paste** STARTER PROMPT (1 min)
6. **Start** Development! 🚀

## Questions?

- Architecture: See `docs/PROJECT_HANDOFF_GUIDE.md`
- Code Patterns: See `docs/KEY_FILES_REFERENCE.md`
- Development Rules: See `docs/GEMINI_AI_CONTINUATION_PROMPT.md`
- Task Checklist: See `docs/GEMINI_DEVELOPMENT_CHECKLIST.md`

## Files Organization

| Folder | Purpose |
|--------|---------|
| `/docs` | All documentation (read these first!) |
| `/src/app` | Next.js pages and routes |
| `/src/components` | React UI components |
| `/src/lib` | Business logic & Firebase |
| `/src/hooks` | Custom React hooks |
| Config files | Dependencies, TypeScript, Next.js setup |

## Ready?

✅ Source code - ready  
✅ Documentation - ready  
✅ Firebase setup - ready  
✅ Gemini prompt - ready  

**👉 Next: Open `docs/README.md` and follow the guide!**

---

**Created:** 2026-03-15  
**Version:** 1.0.0  
**Status:** Ready for Gemini AI

🎉 You're all set to continue development!
EOF

echo "✅ Gemini start file created!"

# Create ZIP file
echo "📦 Creating ZIP file..."
zip -r modul-ajar-platform-gemini.zip gemini-upload-temp/ -q

# Get file size
FILE_SIZE=$(ls -lh modul-ajar-platform-gemini.zip | awk '{print $5}')

echo ""
echo "✅ ZIP FILE CREATED SUCCESSFULLY!"
echo "📦 File: modul-ajar-platform-gemini.zip"
echo "📊 Size: $FILE_SIZE"
echo ""
echo "📝 Inside ZIP:"
find gemini-upload-temp -type f | wc -l
echo "files total"
echo ""
echo "🚀 Ready to upload to Gemini AI!"
echo ""
echo "Next steps:"
echo "1. Download: modul-ajar-platform-gemini.zip"
echo "2. Extract it"
echo "3. Read: GEMINI_START_HERE.md"
echo "4. Follow instructions in docs/"
echo ""

# Cleanup option
read -p "Clean up temporary files? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf gemini-upload-temp
    echo "✅ Temporary files cleaned up"
fi

echo "✨ All done! Ready for Gemini AI!"
