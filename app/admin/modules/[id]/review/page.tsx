'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  subject: { name: string };
  phase: { description: string };
  status: string;
  created_by_user: User;
  created_at: string;
}

interface ModuleContent {
  [key: string]: string | undefined;
}

interface Review {
  id: string;
  status: string;
  notes: string;
  created_at: string;
  reviewed_by_user: User;
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

export default function ModuleReviewPage() {
  const params = useParams();
  const router = useRouter();
  const [module, setModule] = useState<Module | null>(null);
  const [content, setContent] = useState<ModuleContent | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewStatus, setReviewStatus] = useState('published');
  const [reviewNotes, setReviewNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moduleRes, contentRes, reviewsRes] = await Promise.all([
          fetch(`/api/modules/${params.id}`),
          fetch(`/api/modules/${params.id}/content`),
          fetch(`/api/modules/${params.id}/reviews`),
        ]);

        if (moduleRes.ok) {
          const moduleData = await moduleRes.json();
          setModule(moduleData);
        }

        if (contentRes.ok) {
          const contentData = await contentRes.json();
          setContent(contentData);
        }

        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData);
        }
      } catch (error) {
        console.error('[v0] Fetch review data error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleSubmitReview = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/modules/${params.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: reviewStatus,
          notes: reviewNotes,
        }),
      });

      if (res.ok) {
        alert('Review berhasil disimpan');
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('[v0] Submit review error:', error);
      alert('Gagal menyimpan review');
    } finally {
      setSubmitting(false);
    }
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
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{module.title}</h1>
          <p className="mt-2 text-slate-600">{module.description}</p>
        </div>

        {/* Info */}
        <div className="grid gap-4 md:grid-cols-5">
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
              <p className="text-sm text-slate-600">Status</p>
              <p className="font-semibold text-slate-900">{module.status}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-slate-600">Pembuat</p>
              <p className="font-semibold text-slate-900">{module.created_by_user.name}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-slate-600">Email</p>
              <p className="text-sm font-semibold text-slate-900">{module.created_by_user.email}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Review Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Content */}
        <div className="lg:col-span-2">
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

        {/* Review Form */}
        <div className="space-y-4">
          {/* Review History */}
          {reviews.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Riwayat Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-l-2 border-blue-600 pl-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{review.reviewed_by_user.name}</span>
                      <Badge>{review.status}</Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      {new Date(review.created_at).toLocaleString('id-ID')}
                    </p>
                    {review.notes && (
                      <p className="mt-2 text-sm text-slate-700">{review.notes}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Review Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Berikan Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={reviewStatus} onValueChange={setReviewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Setujui & Publikasikan</SelectItem>
                    <SelectItem value="archived">Arsipkan</SelectItem>
                    <SelectItem value="draft">Kembalikan ke Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Catatan Review</Label>
                <Textarea
                  id="notes"
                  placeholder="Berikan catatan atau feedback untuk pembuat modul..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={6}
                />
              </div>

              <Button
                onClick={handleSubmitReview}
                disabled={submitting}
                className="w-full"
              >
                {submitting ? 'Menyimpan...' : 'Kirim Review'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
