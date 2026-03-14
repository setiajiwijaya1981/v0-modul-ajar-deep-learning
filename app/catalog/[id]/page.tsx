'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Module {
  id: string;
  title: string;
  description: string;
  subject: { name: string };
  phase: { description: string };
  views_count: number;
  created_at: string;
}

interface ModuleContent {
  [key: string]: string | undefined;
}

const contentSections = [
  { key: 'pesertaDidikIdentifikasi', label: '1. Identifikasi Peserta Didik' },
  { key: 'materiPembelajaran', label: '2. Materi Pembelajaran' },
  { key: 'relevansiKehidupanNyata', label: '3. Relevansi Kehidupan Nyata' },
  { key: 'strukturMateri', label: '4. Struktur Materi' },
  { key: 'dimensiProfilPelajar', label: '5. Dimensi Profil Pelajar' },
  { key: 'capaianPembelajaran', label: '6. Capaian Pembelajaran' },
  { key: 'tujuanPembelajaran', label: '7. Tujuan Pembelajaran' },
  { key: 'lintasDisiplinIlmu', label: '8. Lintas Disiplin Ilmu' },
  { key: 'topikUtama', label: '9. Topik Pembelajaran' },
  { key: 'pendekatanPembelajaran', label: '10. Praktik Pedagogis' },
  { key: 'langkahPembelajaran', label: '11. Langkah Pembelajaran' },
  { key: 'asesmenAwal', label: '12. Asesmen' },
  { key: 'rubrikPenilaian', label: '13. Rubrik Penilaian' },
  { key: 'kriteriaKetercapaian', label: '14. Kriteria Ketercapaian' },
  { key: 'remedial', label: '15. Remedial & Pengayaan' },
  { key: 'refleksi', label: '16. Refleksi' },
];

export default function CatalogModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [module, setModule] = useState<Module | null>(null);
  const [content, setContent] = useState<ModuleContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moduleRes = await fetch(`/api/modules/${params.id}`);
        if (!moduleRes.ok) {
          setError('Modul tidak ditemukan');
          return;
        }

        const moduleData = await moduleRes.json();
        setModule(moduleData);

        const contentRes = await fetch(`/api/modules/${params.id}/content`);
        if (contentRes.ok) {
          const contentData = await contentRes.json();
          setContent(contentData);
        }
      } catch (err) {
        console.error('[v0] Fetch module error:', err);
        setError('Terjadi kesalahan saat memuat modul');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-slate-600">Memuat modul...</div>
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="min-h-screen bg-slate-50">
        <nav className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-2xl font-bold text-slate-900">
              ModulAjar
            </Link>
          </div>
        </nav>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-700">{error}</p>
              <Button onClick={() => router.back()} className="mt-4">
                Kembali
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-slate-900">
              ModulAjar
            </Link>
            <Link href="/catalog">
              <Button variant="outline">Kembali ke Katalog</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{module.title}</h1>
              <p className="mt-2 text-slate-600">{module.description}</p>
            </div>

            {/* Info */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="pt-4">
                  <p className="text-sm text-slate-600">Mata Pelajaran</p>
                  <p className="font-semibold text-slate-900">{module.subject.name}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-sm text-slate-600">Fase</p>
                  <p className="font-semibold text-slate-900">{module.phase.description}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-sm text-slate-600">Tampilan</p>
                  <p className="font-semibold text-slate-900">{module.views_count}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-sm text-slate-600">Dipublikasikan</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(module.created_at).toLocaleDateString('id-ID')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Content Tabs */}
          {content && (
            <Card>
              <CardHeader>
                <CardTitle>Konten Modul</CardTitle>
                <CardDescription>18 Komponen Modul Ajar</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pesertaDidikIdentifikasi" className="w-full">
                  <TabsList className="mb-4 grid w-full grid-cols-4">
                    {contentSections.slice(0, 4).map((section) => (
                      <TabsTrigger key={section.key} value={section.key} className="text-xs">
                        {section.label.split('.')[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {contentSections.map((section) => (
                    <TabsContent key={section.key} value={section.key} className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">{section.label}</h3>
                      <div className="whitespace-pre-wrap rounded-md bg-slate-50 p-4 text-sm text-slate-700">
                        {content[section.key] || '(Tidak ada konten)'}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
