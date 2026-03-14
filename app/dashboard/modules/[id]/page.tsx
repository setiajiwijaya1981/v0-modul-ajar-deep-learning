'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  status: string;
  created_at: string;
  views_count: number;
}

interface ModuleContent {
  id: string;
  pesertaDidikIdentifikasi?: string;
  materiPembelajaran?: string;
  relevansiKehidupanNyata?: string;
  strukturMateri?: string;
  dimensiProfilPelajar?: string;
  capaianPembelajaran?: string;
  tujuanPembelajaran?: string;
  lintasDisiplinIlmu?: string;
  topikUtama?: string;
  subTopik?: string;
  pertanyaanPemantik?: string;
  pendekatanPembelajaran?: string;
  modelPembelajaran?: string;
  metodePembelajaran?: string;
  mediaSourceBelajar?: string;
  langkahPembelajaran?: string;
  asesmenAwal?: string;
  asesmenProses?: string;
  asesmenAkhir?: string;
  rubrikPenilaian?: string;
  kriteriaKetercapaian?: string;
  remedial?: string;
  pengayaan?: string;
  refleksi?: string;
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

export default function ModuleDetailPage() {
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

  const handleDelete = async () => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus modul ini?')) return;

    try {
      const res = await fetch(`/api/modules/${params.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/dashboard/modules');
      }
    } catch (err) {
      console.error('[v0] Delete module error:', err);
      alert('Gagal menghapus modul');
    }
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    alert('Fitur export PDF sedang dalam pengembangan');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-slate-600">Memuat modul...</div>
      </div>
    );
  }

  if (error || !module) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <p className="text-red-700">{error}</p>
          <Button onClick={() => router.back()} className="mt-4">
            Kembali
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <h1 className="text-3xl font-bold text-slate-900">{module.title}</h1>
              {module.status === 'published' && (
                <Badge variant="default">Dipublikasikan</Badge>
              )}
              {module.status === 'draft' && (
                <Badge variant="outline">Draft</Badge>
              )}
            </div>
            <p className="text-slate-600">{module.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportPDF}>
              📥 Export PDF
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              🗑 Hapus
            </Button>
          </div>
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
              <p className="text-sm text-slate-600">Dibuat</p>
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
                    {content[section.key as keyof ModuleContent] ||
                      '(Tidak ada konten)'}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
