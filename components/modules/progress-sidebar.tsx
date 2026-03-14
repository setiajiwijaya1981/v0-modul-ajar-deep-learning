'use client';

import React from 'react';
import { MODULE_COMPONENTS } from '@/lib/firebase/collections';
import { useModuleForm } from '@/lib/contexts/module-form-context';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressSidebarProps {
  activeComponent: string;
  onComponentClick: (component: string) => void;
}

const componentLabels: Record<string, string> = {
  basicInfo: 'Informasi Dasar',
  pesertaDidik: 'Identifikasi Peserta Didik',
  materiPembelajaran: 'Materi Pembelajaran',
  relevansi: 'Relevansi dengan Kehidupan Nyata',
  strukturMateri: 'Struktur Materi',
  profilPancasila: 'Profil Pelajar Pancasila',
  capaiPembelajaran: 'Capaian Pembelajaran',
  tujuanPembelajaran: 'Tujuan Pembelajaran',
  lintasDisiplin: 'Lintas Disiplin Ilmu',
  topikPembelajaran: 'Topik Pembelajaran',
  praktikPedagogis: 'Praktik Pedagogis',
  mediaBeajar: 'Media & Sumber Belajar',
  langkahPembelajaran: 'Langkah Pembelajaran',
  asesmenAwal: 'Asesmen Awal',
  asesmenProses: 'Asesmen Proses',
  asesmenAkhir: 'Asesmen Akhir',
  rubrikPenilaian: 'Rubrik Penilaian',
  kriteriKetercapaian: 'Kriteria Ketercapaian',
};

export function ProgressSidebar({ activeComponent, onComponentClick }: ProgressSidebarProps) {
  const { completedComponents, getProgress } = useModuleForm();
  const progress = getProgress();

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Progres Modul</h2>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              {completedComponents.length}/{MODULE_COMPONENTS.length} Selesai
            </span>
            <span className="text-sm font-bold text-blue-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-2">
          {MODULE_COMPONENTS.map((component) => {
            const isCompleted = completedComponents.includes(component);
            const isActive = activeComponent === component;

            return (
              <button
                key={component}
                onClick={() => onComponentClick(component)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-start gap-3 group',
                  isActive
                    ? 'bg-blue-100 text-blue-900 border border-blue-300'
                    : isCompleted
                    ? 'bg-green-50 text-slate-700 hover:bg-green-100 border border-green-200'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                )}
              >
                <div className={cn(
                  'flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors',
                  isCompleted
                    ? 'bg-green-500 border-green-500'
                    : isActive
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-slate-300 bg-white'
                )}>
                  {isCompleted && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm flex-1 line-clamp-2">
                  {componentLabels[component] || component}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
