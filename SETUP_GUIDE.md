# Platform Manajemen Modul Ajar - Kurikulum Merdeka

Aplikasi web modern untuk membuat, mengelola, dan mendistribusikan modul ajar berdasarkan Kurikulum Merdeka dengan 18 komponen standar.

## Fitur Utama

- **Module Builder**: Form interaktif 18 langkah untuk membuat modul ajar lengkap
- **Manajemen Modul**: Buat, edit, publish, dan arsipkan modul dengan mudah
- **Progress Tracking**: Visualisasi progres pembuatan modul real-time
- **Firebase Integration**: Database NoSQL yang scalable dengan Firestore
- **Authentikasi**: Sistem login dengan Firebase Authentication
- **Export**: Ekspor modul ke PDF, DOCX, dan HTML
- **Kolaborasi**: Fitur sharing dan comments untuk kolaborasi tim

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **UI**: Shadcn/ui + Tailwind CSS
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **Storage**: Firebase Storage
- **Deployment**: Vercel

## Setup Awal

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd v0-project
```

### 2. Install Dependencies
```bash
npm install
# atau
pnpm install
```

### 3. Setup Firebase

#### a. Buat Firebase Project
1. Pergi ke [Firebase Console](https://console.firebase.google.com)
2. Buat project baru dengan nama "modul-ajar"
3. Enable Firestore Database
4. Enable Authentication dengan Email/Password

#### b. Dapatkan Firebase Credentials
1. Di Firebase Console, buka Project Settings
2. Buka tab "Service Accounts"
3. Download private key sebagai JSON
4. Simpan sebagai `serviceAccountKey.json` di root project

#### c. Dapatkan Firebase Web Config
1. Di Firebase Console, buka Project Settings
2. Buka tab "General"
3. Copy Firebase SDK credentials untuk web

### 4. Konfigurasi Environment Variables

Buat file `.env.local` di root project:

```env
# Firebase Web Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK
FIREBASE_ADMIN_TYPE=service_account
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_PRIVATE_KEY_ID=your_key_id
FIREBASE_ADMIN_PRIVATE_KEY=your_private_key
FIREBASE_ADMIN_CLIENT_EMAIL=your_email
FIREBASE_ADMIN_CLIENT_ID=your_client_id
FIREBASE_ADMIN_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_ADMIN_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_ADMIN_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_ADMIN_CLIENT_CERT_URL=your_cert_url

# Application
APP_URL=http://localhost:3000
NODE_ENV=development
```

### 5. Setup Firestore Collections

Jalankan script untuk inisialisasi Firestore:

```bash
npm run setup:firebase
# Ini akan membuat collections di Firestore secara otomatis
```

### 6. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Struktur Project

```
app/
├── auth/                    # Halaman authentikasi
│   ├── login/page.tsx
│   └── register/page.tsx
├── dashboard/              # Dashboard utama
│   ├── modules/
│   │   ├── page.tsx        # Daftar modul
│   │   ├── create/page.tsx # Pembuat modul
│   │   └── [id]/
│   ├── analytics/page.tsx
│   └── page.tsx
├── admin/                  # Admin panel
│   ├── master-data/        # CP & TP management
│   ├── users/page.tsx
│   └── analytics/page.tsx
└── layout.tsx

components/
├── modules/
│   ├── module-builder.tsx
│   ├── progress-sidebar.tsx
│   ├── module-form-sections.tsx
│   └── preview-panel.tsx
└── ui/                     # Shadcn/ui components

lib/
├── firebase.ts            # Firebase initialization
├── firebase/
│   ├── auth.ts            # Auth functions
│   ├── db.ts              # Database operations
│   ├── collections.ts     # Collection constants
│   └── storage.ts         # Storage operations
├── contexts/
│   └── module-form-context.tsx
└── utils.ts
```

## 18 Komponen Modul Ajar

1. **Informasi Dasar** - Sekolah, mata pelajaran, kelas, fase, tema, alokasi waktu
2. **Identifikasi Peserta Didik** - Usia, karakteristik kognitif, sosial-emosional, gaya belajar
3. **Materi Pembelajaran** - Konten pembelajaran yang akan diajarkan
4. **Relevansi dengan Kehidupan Nyata** - Konteks aplikasi dalam kehidupan sehari-hari
5. **Struktur Materi** - Hierarki dan pemetaan konten pembelajaran
6. **Profil Pelajar Pancasila** - Dimensi Pancasila yang dikembangkan
7. **Capaian Pembelajaran (CP)** - Target pembelajaran sesuai kurikulum
8. **Tujuan Pembelajaran (TP)** - Rincian tujuan pembelajaran
9. **Lintas Disiplin Ilmu** - Integrasi dengan mata pelajaran lain
10. **Topik Pembelajaran** - Topik utama dan pertanyaan pemantik
11. **Praktik Pedagogis** - Pendekatan, model, dan metode pembelajaran
12. **Media & Sumber Belajar** - Alat dan bahan pembelajaran
13. **Langkah Pembelajaran** - Rincian aktivitas per pertemuan
14. **Asesmen Awal (Diagnostik)** - Penilaian awal untuk mengetahui kemampuan awal
15. **Asesmen Proses (Formatif)** - Penilaian selama pembelajaran
16. **Asesmen Akhir (Sumatif)** - Penilaian akhir untuk mengukur pencapaian
17. **Rubrik Penilaian** - Kriteria dan skala penilaian
18. **Kriteria Ketercapaian (KKTP)** - Remedial, pengayaan, dan refleksi

## Alur Penggunaan

### Untuk Guru:

1. **Login/Register**
   - Buat akun baru atau login dengan email
   - Verifikasi email Anda

2. **Buat Modul Ajar Baru**
   - Klik "Buat Modul Baru" di dashboard
   - Isi 18 komponen secara bertahap
   - Sistem auto-save menyimpan progres setiap kali ada perubahan

3. **Kelola Modul**
   - Lihat daftar modul di "Modul Saya"
   - Edit modul yang belum dipublikasikan
   - Publikasikan untuk berbagi dengan guru lain
   - Arsipkan modul yang tidak digunakan

4. **Ekspor & Bagikan**
   - Ekspor ke PDF untuk print atau distribusi digital
   - Ekspor ke DOCX untuk editing lebih lanjut
   - Bagikan dengan guru lain melalui link
   - Lihat komentar dan feedback dari rekan guru

### Untuk Admin:

1. **Manajemen Master Data**
   - Kelola Capaian Pembelajaran (CP)
   - Kelola Tujuan Pembelajaran (TP)
   - Import dari file Excel/CSV

2. **Analytics Dashboard**
   - Lihat statistik penggunaan platform
   - Monitor modul yang paling populer
   - Track user engagement

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Daftar user baru
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Modules
- `GET /api/modules` - List modul user
- `POST /api/modules` - Buat modul baru
- `GET /api/modules/:id` - Detail modul
- `PUT /api/modules/:id` - Update modul
- `DELETE /api/modules/:id` - Hapus modul
- `POST /api/modules/:id/publish` - Publikasikan modul

### Export
- `GET /api/modules/:id/export/pdf` - Export ke PDF
- `GET /api/modules/:id/export/docx` - Export ke DOCX
- `GET /api/modules/:id/export/html` - Export ke HTML

### Master Data
- `GET /api/master-data/cp` - List CP
- `GET /api/master-data/tp` - List TP

## Database Schema (Firestore)

### Collection: users
```
{
  uid: string,
  email: string,
  name: string,
  role: 'admin' | 'teacher' | 'student',
  school?: string,
  subject?: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Collection: modules
```
{
  id: string,
  title: string,
  authorId: string,
  subject: string,
  phase: string,
  grade: number,
  status: 'draft' | 'published' | 'archived',
  content: { 18 components },
  completedComponents: string[],
  viewCount: number,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Deployment ke Vercel

1. Push code ke GitHub
2. Connect repository ke Vercel
3. Add environment variables di Vercel dashboard
4. Vercel akan otomatis deploy saat ada push ke main branch

```bash
# atau deploy manual
vercel --prod
```

## Troubleshooting

### Firebase Connection Issues
- Pastikan `.env.local` sudah dikonfigurasi dengan benar
- Verify Firebase credentials di Firebase Console
- Check Firestore Security Rules

### Module Not Saving
- Pastikan user sudah login
- Check browser console untuk error messages
- Verify Firestore write permissions

### Export Fails
- Ensure module data is complete
- Check available disk space
- Verify PDF library is installed

## Kontribusi

Untuk berkontribusi:

1. Fork repository
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License - lihat file LICENSE untuk detail

## Support

Untuk bantuan:
- Email: support@modul-ajar.id
- Discord: [Link Server]
- Documentation: [Link Docs]

---

**Dibuat dengan ❤ untuk Pendidikan Indonesia**
