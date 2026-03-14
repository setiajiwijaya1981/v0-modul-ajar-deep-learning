'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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

interface Module {
  id: string;
  title: string;
  description: string;
  subject: { name: string };
  phase: { description: string };
  status: string;
  created_at: string;
  views_count: number;
}

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await fetch('/api/modules');
        if (res.ok) {
          const data = await res.json();
          setModules(data.modules);
        }
      } catch (error) {
        console.error('[v0] Fetch modules error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(search.toLowerCase()) ||
      module.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || module.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'published':
        return <Badge variant="default">Dipublikasikan</Badge>;
      case 'archived':
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
          <Button>Buat Modul Baru</Button>
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
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Dipublikasikan</SelectItem>
            <SelectItem value="archived">Diarsipkan</SelectItem>
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
            <div className="mb-4 text-4xl">📚</div>
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
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    {getStatusBadge(module.status)}
                  </div>
                  <CardDescription className="line-clamp-2">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{module.subject.name}</span>
                    <span className="text-slate-500">{module.phase.description}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>👁 {module.views_count} tampilan</span>
                    <span>{new Date(module.created_at).toLocaleDateString('id-ID')}</span>
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
