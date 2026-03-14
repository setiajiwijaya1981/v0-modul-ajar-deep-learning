'use client';

import React, { useState } from 'react';
import { ModuleFormProvider, useModuleForm } from '@/lib/contexts/module-form-context';
import { ProgressSidebar } from '@/components/modules/progress-sidebar';
import { BasicInfoForm, PesertaDidikForm } from '@/components/modules/module-form-sections';
import { MODULE_COMPONENTS } from '@/lib/firebase/collections';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

function ModuleBuilderContent() {
  const [activeComponent, setActiveComponent] = useState<string>('basicInfo');
  const [isSaving, setIsSaving] = useState(false);
  const { formData, completedComponents, getProgress } = useModuleForm();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Save to Firebase
      console.log('[v0] Saving module:', formData);
      toast.success('Modul berhasil disimpan');
    } catch (error) {
      console.error('[v0] Error saving module:', error);
      toast.error('Gagal menyimpan modul');
    } finally {
      setIsSaving(false);
    }
  };

  const renderFormSection = () => {
    switch (activeComponent) {
      case 'basicInfo':
        return <BasicInfoForm />;
      case 'pesertaDidik':
        return <PesertaDidikForm />;
      // More sections will be added here
      default:
        return (
          <Card className="p-8">
            <div className="text-center">
              <p className="text-slate-600">Section "{activeComponent}" - Coming Soon</p>
            </div>
          </Card>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <ProgressSidebar 
        activeComponent={activeComponent}
        onComponentClick={setActiveComponent}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/modules">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Pembuat Modul Ajar</h1>
                <p className="text-slate-600">Kurikulum Merdeka - Sesuai dengan Standar Nasional</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-600">Progress</p>
                <p className="text-2xl font-bold text-blue-600">{Math.round(getProgress())}%</p>
              </div>
              <Button onClick={handleSave} disabled={isSaving} size="lg">
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </div>

          {/* Form Content */}
          <div className="max-w-4xl">
            {renderFormSection()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateModulePage() {
  return (
    <ModuleFormProvider>
      <ModuleBuilderContent />
    </ModuleFormProvider>
  );
}
