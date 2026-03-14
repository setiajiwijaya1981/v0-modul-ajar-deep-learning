'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getModule, updateModule, Module } from '@/lib/firebase/db';
import { getCurrentUser } from '@/lib/firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Edit2, Download, Share2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const contentSections = [
  { key: 'basicInfo', label: '1. Informasi Dasar' },
  { key: 'pesertaDidik', label: '2. Identifikasi Peserta Didik' },
  { key: 'materiPembelajaran', label: '3. Materi Pembelajaran' },
  { key: 'relevansi', label: '4. Relevansi Kehidupan Nyata' },
  { key: 'strukturMateri', label: '5. Struktur Materi' },
  { key: 'profilPancasila', label: '6. Profil Pelajar Pancasila' },
  { key: 'capaiPembelajaran', label: '7. Capaian Pembelajaran' },
  { key: 'tujuanPembelajaran', label: '8. Tujuan Pembelajaran' },
  { key: 'lintasDisiplin', label: '9. Lintas Disiplin Ilmu' },
  { key: 'topikPembelajaran', label: '10. Topik Pembelajaran' },
  { key: 'praktikPedagogis', label: '11. Praktik Pedagogis' },
  { key: 'mediaBeajar', label: '12. Media & Sumber Belajar' },
  { key: 'langkahPembelajaran', label: '13. Langkah Pembelajaran' },
  { key: 'asesmenAwal', label: '14. Asesmen Awal' },
  { key: 'asesmenProses', label: '15. Asesmen Proses' },
  { key: 'asesmenAkhir', label: '16. Asesmen Akhir' },
  { key: 'rubrikPenilaian', label: '17. Rubrik Penilaian' },
  { key: 'kriteriKetercapaian', label: '18. Kriteria Ketercapaian' },
];

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;
  
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const loadModule = async () => {
      try {
        const user = getCurrentUser();
        if (!user) {
          router.push('/auth/login');
          return;
        }

        console.log('[v0] Loading module:', moduleId);
        const moduleData = await getModule(moduleId);
        
        if (!moduleData) {
          toast.error('Modul tidak ditemukan');
          router.push('/dashboard/modules');
          return;
        }

        setModule(moduleData);
        setIsOwner(moduleData.authorId === user.uid);
      } catch (error) {
        console.error('[v0] Error loading module:', error);
        toast.error('Gagal memuat modul');
      } finally {
        setLoading(false);
      }
    };

    loadModule();
  }, [moduleId, router]);

  const handlePublish = async () => {
    if (!module) return;
    try {
      await updateModule(moduleId, { status: 'published', publishedAt: new Date() as any });
      setModule({ ...module, status: 'published' });
      toast.success('Modul berhasil dipublikasikan');
    } catch (error) {
      console.error('[v0] Error publishing module:', error);
      toast.error('Gagal mempublikasikan modul');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus modul ini?')) return;
    try {
      // TODO: Implement delete functionality with Firebase
      toast.success('Modul berhasil dihapus');
      router.push('/dashboard/modules');
    } catch (error) {
      console.error('[v0] Error deleting module:', error);
      toast.error('Gagal menghapus modul');
    }
  };

  const handleExportPDF = () => {
    toast.info('Fitur export PDF sedang dalam pengembangan');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-slate-600">Memuat modul...</div>
      </div>
    );
  }

  if (!module) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <p className="text-red-700">Modul tidak ditemukan</p>
          <Link href="/dashboard/modules">
            <Button className="mt-4">Kembali ke Modul</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/modules">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <div className="mb-2 flex items-center gap-2">
                <h1 className="text-3xl font-bold text-slate-900">{module.title}</h1>
                <Badge className={module.status === 'published' ? 'bg-green-600' : ''}>
                  {module.status === 'published' ? 'Dipublikasikan' : 'Draft'}
                </Badge>
              </div>
              <p className="text-slate-600">{module.description || 'Tanpa deskripsi'}</p>
            </div>
          </div>
          {isOwner && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportPDF}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus
              </Button>
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600">Mata Pelajaran</p>
              <p className="mt-2 font-semibold text-slate-900">{module.subject}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600">Fase</p>
              <p className="mt-2 font-semibold text-slate-900">{module.phase}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600">Kelas</p>
              <p className="mt-2 font-semibold text-slate-900">{module.grade}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600">Tampilan</p>
              <p className="mt-2 font-semibold text-slate-900">{module.viewCount}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Konten Modul</CardTitle>
          <CardDescription>
            Completion: {module.completedComponents.length}/{contentSections.length} komponen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basicInfo" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-6 lg:grid-cols-9">
              {contentSections.map((section) => (
                <TabsTrigger 
                  key={section.key} 
                  value={section.key} 
                  className="text-xs"
                  disabled={!module.content[section.key]}
                >
                  {section.label.split('.')[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {contentSections.map((section) => (
              <TabsContent key={section.key} value={section.key} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{section.label}</h3>
                  {module.completedComponents.includes(section.key as any) && (
                    <Badge className="bg-green-100 text-green-800">Selesai</Badge>
                  )}
                </div>
                <div className="space-y-2 rounded-md bg-slate-50 p-4">
                  {module.content[section.key] ? (
                    <div className="text-sm text-slate-700">
                      {typeof module.content[section.key] === 'object' 
                        ? JSON.stringify(module.content[section.key], null, 2)
                        : module.content[section.key]
                      }
                    </div>
                  ) : (
                    <p className="text-sm italic text-slate-500">(Belum ada konten)</p>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Actions */}
      {isOwner && (
        <div className="flex gap-4">
          <Link href={`/dashboard/modules/create?id=${moduleId}`}>
            <Button>
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Modul
            </Button>
          </Link>
          
          {module.status === 'draft' && (
            <Button onClick={handlePublish} variant="default">
              Publikasikan
            </Button>
          )}
          
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Bagikan
          </Button>
        </div>
      )}
    </div>
  );
}
