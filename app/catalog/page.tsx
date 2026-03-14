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

interface Subject {
  id: string;
  name: string;
}

interface Phase {
  id: string;
  description: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  phase: Phase;
  views_count: number;
}

export default function CatalogPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterPhase, setFilterPhase] = useState('all');
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [subjectsRes, phasesRes] = await Promise.all([
          fetch('/api/subjects'),
          fetch('/api/phases'),
        ]);

        if (subjectsRes.ok && phasesRes.ok) {
          const subjectsData = await subjectsRes.json();
          const phasesData = await phasesRes.json();
          setSubjects(subjectsData);
          setPhases(phasesData);
        }
      } catch (error) {
        console.error('[v0] Fetch initial data error:', error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          skip: (page * 12).toString(),
          take: '12',
        });

        if (search) params.append('search', search);
        if (filterSubject !== 'all') params.append('subject_id', filterSubject);
        if (filterPhase !== 'all') params.append('phase_id', filterPhase);

        const res = await fetch(`/api/modules/published?${params}`);
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
  }, [search, filterSubject, filterPhase, page]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            ModulAjar
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Katalog Modul Ajar</h1>
            <p className="mt-2 text-slate-600">Jelajahi semua modul ajar yang dipublikasikan</p>
          </div>

          {/* Filters */}
          <div className="grid gap-4 md:grid-cols-4">
            <Input
              placeholder="Cari modul..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
            />
            <Select
              value={filterSubject}
              onValueChange={(value) => {
                setFilterSubject(value);
                setPage(0);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Mata Pelajaran</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filterPhase}
              onValueChange={(value) => {
                setFilterPhase(value);
                setPage(0);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Fase</SelectItem>
                {phases.map((phase) => (
                  <SelectItem key={phase.id} value={phase.id}>
                    {phase.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Link href="/dashboard">
              <Button className="w-full">Dashboard</Button>
            </Link>
          </div>

          {/* Modules Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-lg text-slate-600">Memuat modul...</div>
            </div>
          ) : modules.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 text-4xl">📚</div>
                <h3 className="text-lg font-semibold text-slate-900">Belum ada modul</h3>
                <p className="mt-2 text-slate-600">
                  Tidak ada modul yang sesuai dengan filter Anda
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((module) => (
                <Link key={module.id} href={`/catalog/${module.id}`}>
                  <Card className="h-full cursor-pointer transition-shadow hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {module.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <Badge variant="outline">{module.subject.name}</Badge>
                        <Badge variant="secondary">{module.phase.description}</Badge>
                      </div>
                      <div className="text-xs text-slate-500">
                        👁 {module.views_count} tampilan
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {modules.length > 0 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
              >
                Sebelumnya
              </Button>
              <span className="flex items-center px-4 text-sm text-slate-600">
                Halaman {page + 1}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={modules.length < 12}
              >
                Berikutnya
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
