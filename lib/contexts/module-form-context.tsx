'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { MODULE_COMPONENTS, ModuleComponent } from '@/lib/firebase/collections';

export interface ModuleFormData {
  // 1. Basic Info
  basicInfo: {
    schoolName: string;
    mataPelajaran: string;
    kelas: string;
    fase: string;
    tema: string;
    alokasi_waktu: number;
  };
  
  // 2. Peserta Didik
  pesertaDidik: {
    usia: string;
    karakteristik_kognitif: string;
    karakteristik_sosial_emosional: string;
    gaya_belajar: string[];
    pengetahuan_prasyarat: string;
    kebutuhan_khusus: string;
  };
  
  // 3-18. Other components will follow same pattern
  [key: string]: any;
}

interface ModuleFormContextType {
  formData: ModuleFormData;
  completedComponents: ModuleComponent[];
  updateFormData: (component: ModuleComponent, data: any) => void;
  markComponentComplete: (component: ModuleComponent) => void;
  getProgress: () => number;
  resetForm: () => void;
}

const ModuleFormContext = createContext<ModuleFormContextType | undefined>(undefined);

const defaultFormData: ModuleFormData = {
  basicInfo: {
    schoolName: '',
    mataPelajaran: '',
    kelas: '',
    fase: '',
    tema: '',
    alokasi_waktu: 0,
  },
  pesertaDidik: {
    usia: '',
    karakteristik_kognitif: '',
    karakteristik_sosial_emosional: '',
    gaya_belajar: [],
    pengetahuan_prasyarat: '',
    kebutuhan_khusus: '',
  },
  materiPembelajaran: {},
  relevansi: {},
  strukturMateri: {},
  profilPancasila: {},
  capaiPembelajaran: {},
  tujuanPembelajaran: {},
  lintasDisiplin: {},
  topikPembelajaran: {},
  praktikPedagogis: {},
  mediaBeajar: {},
  langkahPembelajaran: {},
  asesmenAwal: {},
  asesmenProses: {},
  asesmenAkhir: {},
  rubrikPenilaian: {},
  kriteriKetercapaian: {},
};

export function ModuleFormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<ModuleFormData>(defaultFormData);
  const [completedComponents, setCompletedComponents] = useState<ModuleComponent[]>([]);

  const updateFormData = useCallback((component: ModuleComponent, data: any) => {
    setFormData(prev => ({
      ...prev,
      [component]: data,
    }));
  }, []);

  const markComponentComplete = useCallback((component: ModuleComponent) => {
    setCompletedComponents(prev => 
      prev.includes(component) ? prev : [...prev, component]
    );
  }, []);

  const getProgress = useCallback(() => {
    return (completedComponents.length / MODULE_COMPONENTS.length) * 100;
  }, [completedComponents.length]);

  const resetForm = useCallback(() => {
    setFormData(defaultFormData);
    setCompletedComponents([]);
  }, []);

  return (
    <ModuleFormContext.Provider
      value={{
        formData,
        completedComponents,
        updateFormData,
        markComponentComplete,
        getProgress,
        resetForm,
      }}
    >
      {children}
    </ModuleFormContext.Provider>
  );
}

export function useModuleForm() {
  const context = useContext(ModuleFormContext);
  if (!context) {
    throw new Error('useModuleForm must be used within ModuleFormProvider');
  }
  return context;
}
