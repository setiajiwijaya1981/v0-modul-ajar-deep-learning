# ModulAjar - Platform Manajemen Modul Ajar Digital

Platform komprehensif untuk membuat, mengelola, dan mendistribusikan modul ajar digital berdasarkan Kurikulum Merdeka dengan 18 komponen pembelajaran yang lengkap.

## Fitur Utama

### 1. **Module Creator Wizard (18 Komponen)**
- Panduan langkah demi langkah untuk membuat modul ajar
- 18 komponen standar termasuk:
  - Identifikasi Peserta Didik
  - Materi Pembelajaran
  - Relevansi Kehidupan Nyata
  - Struktur Materi
  - Dimensi Profil Pelajar Pancasila
  - Capaian Pembelajaran
  - Tujuan Pembelajaran
  - Lintas Disiplin Ilmu
  - Topik Pembelajaran
  - Praktik Pedagogis
  - Langkah-Langkah Pembelajaran
  - Asesmen (Awal, Proses, Akhir)
  - Rubrik Penilaian
  - Kriteria Ketercapaian
  - Remedial & Pengayaan
  - Refleksi

### 2. **Module Library & Catalog**
- Browse semua modul yang dipublikasikan
- Filter berdasarkan:
  - Mata Pelajaran (45+ tersedia)
  - Fase Pembelajaran (A-F)
  - Kata Kunci
- View detail lengkap modul dengan semua 18 komponen

### 3. **Admin Dashboard**
- Manajemen modul keseluruhan
- Statistik platform:
  - Total modul
  - Total pengguna
  - Modul pending review
  - Modul dipublikasikan
- Review workflow untuk persetujuan modul

### 4. **Review Workflow**
- Admin review setiap modul sebelum publikasi
- Berikan feedback dan catatan
- Setujui, arsipkan, atau kembalikan ke draft
- Riwayat review lengkap

### 5. **Analytics Dashboard**
- Statistik modul per pengguna
- Total tampilan modul
- Modul terbaru
- Admin analytics platform-wide

### 6. **User Management**
- Kelola pengguna platform
- Filter berdasarkan role (Guru, Admin Sekolah, Admin)
- View informasi pengguna dan tanggal bergabung

## Tech Stack

- **Frontend**: React 19, Next.js 16 (App Router)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS v4
- **Auth**: JWT + HTTP-only Cookies
- **Password Hashing**: bcryptjs

## Database Schema

### Core Tables
1. **users** - Pengguna platform
2. **schools** - Data sekolah
3. **subjects** - Mata pelajaran (45+)
4. **phases** - Fase pembelajaran (A-F)
5. **modules** - Modul ajar utama
6. **module_content** - Konten 18 komponen
7. **module_reviews** - Review workflow
8. **module_analytics** - Tracking tampilan
9. **cp_tp_master** - Master data CP/TP dari Kemendikbud

## Installation & Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd modulajar
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` dan isi:
```
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-secret-key-change-in-production
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Setup Database
```bash
# Run migrations
pnpm prisma migrate deploy

# Seed initial data (subjects & phases)
pnpm prisma db seed
```

### 5. Run Development Server
```bash
pnpm dev
```

Akses http://localhost:3000

## API Documentation

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Modules
- `GET /api/modules` - List modul user
- `POST /api/modules` - Buat modul baru
- `GET /api/modules/[id]` - Get modul detail
- `PUT /api/modules/[id]` - Update modul
- `DELETE /api/modules/[id]` - Delete modul
- `POST /api/modules/[id]/content` - Save modul content
- `GET /api/modules/[id]/content` - Get modul content
- `POST /api/modules/[id]/reviews` - Submit review
- `GET /api/modules/[id]/reviews` - Get review history

### Public APIs
- `GET /api/modules/published` - List modul published (public)
- `GET /api/subjects` - List semua mata pelajaran
- `GET /api/phases` - List semua fase

### Admin APIs
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/modules` - List semua modul (admin)
- `GET /api/admin/users` - List semua pengguna (admin)

### Analytics
- `GET /api/analytics/user` - User analytics
- `GET /api/analytics/platform` - Platform analytics (admin)

## Roles & Permissions

| Role | Permissions |
|------|------------|
| **Teacher** | Buat modul, lihat modul sendiri, view catalog |
| **School Admin** | Kelola guru, review modul sekolah, analytics sekolah |
| **Admin** | Kelola semua, admin panel, platform analytics |

## Project Structure

```
modulajar/
├── app/
│   ├── api/                 # API routes
│   ├── auth/                # Auth pages
│   ├── dashboard/           # User dashboard
│   ├── admin/               # Admin panel
│   ├── catalog/             # Public catalog
│   └── page.tsx             # Landing page
├── components/
│   ├── auth/                # Auth forms
│   ├── ui/                  # shadcn components
│   └── module-creator-wizard.tsx
├── lib/
│   ├── auth.ts              # Auth utilities
│   ├── db.ts                # Prisma client
│   ├── jwt.ts               # JWT utilities
│   └── session.ts           # Session management
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed script
└── scripts/
    └── 001-init-schema.sql  # Initial migration
```

## Development Roadmap

### Phase 1 ✅
- Database setup & Prisma ORM
- Authentication system
- User registration/login

### Phase 2 ✅
- Module Creator Wizard (18 steps)
- Module Library & Catalog
- CRUD operations

### Phase 3 ✅
- Admin Dashboard
- Review Workflow
- User Management

### Phase 4 (Current)
- Analytics Dashboard
- Export to PDF
- Testing & Optimization

## Future Enhancements

1. **PDF Export**
   - Generate professional PDF dari modul
   - Customizable templates

2. **Module Sharing**
   - Share modul dengan guru lain
   - Collaborative editing

3. **CP/TP Integration**
   - Auto-populate dari master CP/TP data
   - Validation berdasarkan Kemendikbud standards

4. **Advanced Analytics**
   - Chart & visualization
   - Performance metrics
   - User engagement tracking

5. **Notification System**
   - Email notifications
   - In-app notifications
   - Review status updates

6. **Mobile App**
   - React Native mobile app
   - Offline module access
   - Quick module review

## Performance Optimization

- Database indexing pada frequently queried fields
- API response pagination (default: 10-12 items)
- Server-side filtering & search
- Efficient Prisma queries dengan select/include optimization

## Security Best Practices

- Password hashing dengan bcryptjs (salt: 12)
- JWT authentication dengan 7-day expiration
- HTTP-only cookies untuk session
- CORS protection
- Input validation & sanitization
- SQL injection prevention (Prisma parameterized queries)
- Rate limiting (recommended: reverse proxy)

## Testing Checklist

- [ ] User registration/login flow
- [ ] Module creation wizard (all 18 steps)
- [ ] Module CRUD operations
- [ ] Module review workflow
- [ ] Admin dashboard statistics
- [ ] User management page
- [ ] Public catalog search & filter
- [ ] Analytics calculations
- [ ] Permission/authorization checks
- [ ] Error handling

## Deployment

### To Vercel

```bash
# Push ke GitHub
git push origin main

# Import di Vercel
# - Connect GitHub repo
# - Set environment variables
# - Deploy
```

### Environment Variables (Production)

```
DATABASE_URL=<neon-connection-string>
JWT_SECRET=<strong-random-secret>
NEXT_PUBLIC_API_URL=https://modulajar.com
NODE_ENV=production
```

## Support & Contribution

Untuk pertanyaan atau kontribusi, silakan buat issue atau pull request di repository.

## License

MIT License - Bebas digunakan untuk keperluan pendidikan dan komersial.

---

**Developed with ❤️ for Indonesian Education**
