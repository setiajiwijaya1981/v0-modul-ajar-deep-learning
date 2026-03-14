'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-slate-900">ModulAjar</div>
            <div className="flex gap-4">
              <Link href="/auth/login">
                <Button variant="outline">Masuk</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Daftar</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="space-y-12 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl md:text-6xl">
            Platform Manajemen Modul Ajar Digital
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Buat, kelola, dan distribusikan modul ajar berkualitas untuk semua mata pelajaran
            dan fase pembelajaran dengan mudah.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg">Mulai Sekarang</Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="mx-auto mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="mb-4 text-3xl">📚</div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">Semua Mata Pelajaran</h3>
            <p className="text-slate-600">
              Dukungan lengkap untuk 45+ mata pelajaran dari SD hingga SMA.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="mb-4 text-3xl">✨</div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">18 Komponen Lengkap</h3>
            <p className="text-slate-600">
              Template lengkap dengan 18 komponen penting untuk modul ajar berkualitas.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="mb-4 text-3xl">⚡</div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">Mudah Digunakan</h3>
            <p className="text-slate-600">
              Wizard interaktif memandu Anda melalui setiap tahap pembuatan modul.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="mb-4 text-3xl">🔄</div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">Kolaborasi Tim</h3>
            <p className="text-slate-600">
              Bekerja sama dengan guru lain dan berbagi modul dengan mudah.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="mb-4 text-3xl">📊</div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">Analytics</h3>
            <p className="text-slate-600">
              Pantau penggunaan modul dan dapatkan insights untuk improvement.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="mb-4 text-3xl">📥</div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">Export & Share</h3>
            <p className="text-slate-600">
              Export ke PDF dan bagikan dengan kolega atau siswa.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center text-slate-600">
          <p>&copy; 2024 ModulAjar. Semua hak dilindungi.</p>
        </div>
      </footer>
    </main>
  );
}
