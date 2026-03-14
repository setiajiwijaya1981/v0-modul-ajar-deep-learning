'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getCurrentUser } from '@/lib/firebase/auth';
import { getUserModules } from '@/lib/firebase/db';
import { Module, MODULE_STATUS } from '@/lib/firebase/db';
import { Plus, Trash2, FileText } from 'lucide-react';

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const loadModules = async () => {
      try {
        const currentUser = getCurrentUser();
        if (!currentUser) {
          router.push('/auth/login');
          return;
        }
        
        setUser(currentUser);
        console.log('[v0] Loading modules for user:', currentUser.uid);
        
        const userModules = await getUserModules(currentUser.uid);
        setModules(userModules);
      } catch (error) {
        console.error('[v0] Error loading modules:', error);
      } finally {
        setLoading(false);
      }
    };

    loadModules();
  }, [router]);

  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(search.toLowerCase()) ||
      module.description?.toLowerCase().includes(search.toLowerCase()) ||
      module.subject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || module.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case MODULE_STATUS.DRAFT:
        return <Badge variant="outline">Draft</Badge>;
      case MODULE_STATUS.PUBLISHED:
        return <Badge className="bg-green-600">Dipublikasikan</Badge>;
      case MODULE_STATUS.ARCHIVED:
        return <Badge variant="secondary">Diarsipkan</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Modul Saya</h1>
          <p className="mt-2 text-slate-600">Kelola semua modul ajar yang telah dibuat</p>
        </div>
        <Link href="/dashboard/modules/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Buat Modul Baru
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Input
          placeholder="Cari modul..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value={MODULE_STATUS.DRAFT}>Draft</SelectItem>
            <SelectItem value={MODULE_STATUS.PUBLISHED}>Dipublikasikan</SelectItem>
            <SelectItem value={MODULE_STATUS.ARCHIVED}>Diarsipkan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Modules Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-lg text-slate-600">Memuat modul...</div>
        </div>
      ) : filteredModules.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="mb-4 h-12 w-12 text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-900">Belum ada modul</h3>
            <p className="mt-2 text-slate-600">
              Mulai membuat modul ajar pertama Anda sekarang
            </p>
            <Link href="/dashboard/modules/create" className="mt-4">
              <Button>Buat Modul Pertama</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredModules.map((module) => (
            <Link key={module.id} href={`/dashboard/modules/${module.id}`}>
              <Card className="h-full cursor-pointer transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between">
                    <CardTitle className="line-clamp-2 text-lg">{module.title}</CardTitle>
                    {getStatusBadge(module.status)}
                  </div>
                  <CardDescription className="line-clamp-2">
                    {module.description || 'Tanpa deskripsi'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{module.subject}</span>
                    <span className="text-slate-500">Fase {module.phase}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>👁 {module.viewCount} tampilan</span>
                    <span>{new Date(module.createdAt.toDate()).toLocaleDateString('id-ID')}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
