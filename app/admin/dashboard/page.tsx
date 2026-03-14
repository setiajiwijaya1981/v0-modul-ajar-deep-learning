'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface Module {
  id: string;
  title: string;
  status: string;
  created_by_user: User;
  subject: { name: string };
  created_at: string;
}

interface Stats {
  totalModules: number;
  totalUsers: number;
  pendingReviews: number;
  publishedModules: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meRes, statsRes, modulesRes] = await Promise.all([
          fetch('/api/auth/me'),
          fetch('/api/admin/stats'),
          fetch(`/api/admin/modules?status=${filterStatus}`),
        ]);

        if (!meRes.ok) {
          router.push('/auth/login');
          return;
        }

        const meData = await meRes.json();
        if (meData.user.role !== 'admin' && meData.user.role !== 'school_admin') {
          router.push('/dashboard');
          return;
        }

        setUser(meData.user);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (modulesRes.ok) {
          const modulesData = await modulesRes.json();
          setModules(modulesData.modules);
        }
      } catch (error) {
        console.error('[v0] Fetch admin data error:', error);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, filterStatus]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('[v0] Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-lg text-slate-600">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">ModulAjar Admin</h1>
              <p className="text-sm text-slate-600">{user?.name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Keluar
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Stats */}
          {stats && (
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Total Modul
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalModules}</div>
                  <p className="text-xs text-slate-500">Semua modul</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Total Pengguna
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-slate-500">Pengguna terdaftar</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Pending Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">
                    {stats.pendingReviews}
                  </div>
                  <p className="text-xs text-slate-500">Menunggu review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Dipublikasikan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {stats.publishedModules}
                  </div>
                  <p className="text-xs text-slate-500">Modul aktif</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Module Management */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Manajemen Modul</h2>
                <p className="text-slate-600">Tinjau dan setujui modul yang dikirimkan</p>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Dipublikasikan</SelectItem>
                  <SelectItem value="archived">Diarsipkan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {modules.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-slate-600">Tidak ada modul</p>
                </CardContent>
              </Card>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <table className="w-full">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                        Judul
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                        Pembuat
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                        Mata Pelajaran
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((module) => (
                      <tr key={module.id} className="border-b border-slate-200 hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm text-slate-900">{module.title}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {module.created_by_user.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {module.subject.name}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {module.status === 'draft' && (
                            <Badge variant="outline">Draft</Badge>
                          )}
                          {module.status === 'published' && (
                            <Badge variant="default">Dipublikasikan</Badge>
                          )}
                          {module.status === 'archived' && (
                            <Badge variant="secondary">Diarsipkan</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Link href={`/admin/modules/${module.id}/review`}>
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
