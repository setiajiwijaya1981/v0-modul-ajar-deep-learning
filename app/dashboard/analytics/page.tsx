'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RecentModule {
  id: string;
  title: string;
  views_count: number;
  created_at: string;
  status: string;
}

interface Analytics {
  totalModules: number;
  publishedModules: number;
  draftModules: number;
  totalViews: number;
  recentModules: RecentModule[];
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/analytics/user');
        if (res.ok) {
          const data = await res.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error('[v0] Fetch analytics error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-slate-600">Memuat analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="mt-2 text-slate-600">Pantau kinerja modul ajar Anda</p>
      </div>

      {/* Stats Grid */}
      {analytics && (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Total Modul
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{analytics.totalModules}</div>
                <p className="text-xs text-slate-500">Modul dibuat</p>
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
                  {analytics.publishedModules}
                </div>
                <p className="text-xs text-slate-500">Modul aktif</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Draft
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">
                  {analytics.draftModules}
                </div>
                <p className="text-xs text-slate-500">Modul dalam draft</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Total Tampilan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {analytics.totalViews}
                </div>
                <p className="text-xs text-slate-500">Modul dilihat</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Modules */}
          <Card>
            <CardHeader>
              <CardTitle>Modul Terbaru</CardTitle>
              <CardDescription>5 modul terakhir yang dibuat</CardDescription>
            </CardHeader>
            <CardContent>
              {analytics.recentModules.length === 0 ? (
                <p className="text-slate-600">Tidak ada modul</p>
              ) : (
                <div className="space-y-4">
                  {analytics.recentModules.map((module) => (
                    <Link
                      key={module.id}
                      href={`/dashboard/modules/${module.id}`}
                      className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:bg-slate-50"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{module.title}</h3>
                        <p className="text-sm text-slate-600">
                          {new Date(module.created_at).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-900">
                            {module.views_count}
                          </p>
                          <p className="text-xs text-slate-500">tampilan</p>
                        </div>
                        {module.status === 'published' && (
                          <Badge variant="default">Dipublikasikan</Badge>
                        )}
                        {module.status === 'draft' && (
                          <Badge variant="outline">Draft</Badge>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
