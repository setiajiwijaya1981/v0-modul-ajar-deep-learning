'use client';

import { useEffect, useState } from 'react';
import { ModuleCreatorWizard } from '@/components/module-creator-wizard';

interface Subject {
  id: string;
  code: string;
  name: string;
}

interface Phase {
  id: string;
  phase: string;
  description: string;
}

export default function CreateModulePage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
        console.error('[v0] Fetch data error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-slate-600">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Buat Modul Ajar Baru</h1>
        <p className="mt-2 text-slate-600">
          Ikuti panduan 18 langkah untuk membuat modul ajar yang komprehensif
        </p>
      </div>

      <ModuleCreatorWizard subjects={subjects} phases={phases} />
    </div>
  );
}
