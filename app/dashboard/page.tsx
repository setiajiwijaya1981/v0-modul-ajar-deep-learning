import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Dashboard - ModulAjar',
  description: 'Dashboard utama ModulAjar',
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">Selamat datang di ModulAjar</p>
      </div>

      {/* Main Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/dashboard/modules/create">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle>Buat Modul Baru</CardTitle>
              <CardDescription>Mulai membuat modul ajar baru</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Mulai</Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/modules">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle>Modul Saya</CardTitle>
              <CardDescription>Lihat semua modul yang telah dibuat</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Lihat</Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Modul</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-slate-500">Modul telah dibuat</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-slate-500">Modul dalam draft</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Dipublikasikan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-slate-500">Modul dipublikasikan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Tampilan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-slate-500">Total tampilan modul</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
