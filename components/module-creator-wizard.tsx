'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

interface StepProps {
  stepNumber: number;
  totalSteps: number;
  data: Record<string, any>;
  onChange: (field: string, value: any) => void;
  subjects: Subject[];
  phases: Phase[];
}

const steps = [
  { number: 1, title: 'Informasi Dasar', component: StepBasicInfo },
  { number: 2, title: 'Peserta Didik', component: StepPesertaDidik },
  { number: 3, title: 'Materi Pembelajaran', component: StepMateriPembelajaran },
  { number: 4, title: 'Relevansi Kehidupan', component: StepRelevansi },
  { number: 5, title: 'Struktur Materi', component: StepStruktur },
  { number: 6, title: 'Profil Pelajar', component: StepProfilPelajar },
  { number: 7, title: 'Capaian Pembelajaran', component: StepCapaian },
  { number: 8, title: 'Tujuan Pembelajaran', component: StepTujuan },
  { number: 9, title: 'Lintas Disiplin', component: StepLintas },
  { number: 10, title: 'Topik Pembelajaran', component: StepTopik },
  { number: 11, title: 'Praktik Pedagogis', component: StepPedagogis },
  { number: 12, title: 'Langkah Pembelajaran', component: StepLangkah },
  { number: 13, title: 'Asesmen', component: StepAsesmen },
  { number: 14, title: 'Rubrik Penilaian', component: StepRubrik },
  { number: 15, title: 'Kriteria Ketercapaian', component: StepKriteria },
  { number: 16, title: 'Remedial & Pengayaan', component: StepRemedial },
  { number: 17, title: 'Refleksi', component: StepRefleksi },
  { number: 18, title: 'Ringkasan', component: StepRingkasan },
];

function StepBasicInfo(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Judul Modul</Label>
        <Input
          id="title"
          placeholder="Masukkan judul modul ajar"
          value={props.data.title || ''}
          onChange={(e) => props.onChange('title', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Mata Pelajaran</Label>
        <Select value={props.data.subject_id || ''} onValueChange={(value) =>
          props.onChange('subject_id', value)
        }>
          <SelectTrigger>
            <SelectValue placeholder="Pilih mata pelajaran" />
          </SelectTrigger>
          <SelectContent>
            {props.subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phase">Fase</Label>
        <Select value={props.data.phase_id || ''} onValueChange={(value) =>
          props.onChange('phase_id', value)
        }>
          <SelectTrigger>
            <SelectValue placeholder="Pilih fase" />
          </SelectTrigger>
          <SelectContent>
            {props.phases.map((phase) => (
              <SelectItem key={phase.id} value={phase.id}>
                {phase.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi Singkat</Label>
        <Textarea
          id="description"
          placeholder="Deskripsi modul ajar"
          value={props.data.description || ''}
          onChange={(e) => props.onChange('description', e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
}

function StepPesertaDidik(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pesertaDidik">Identifikasi Peserta Didik</Label>
        <Textarea
          id="pesertaDidik"
          placeholder="Deskripsikan karakteristik peserta didik..."
          value={props.data.pesertaDidikIdentifikasi || ''}
          onChange={(e) => props.onChange('pesertaDidikIdentifikasi', e.target.value)}
          rows={6}
        />
      </div>
    </div>
  );
}

function StepMateriPembelajaran(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="materi">Materi Pembelajaran</Label>
        <Textarea
          id="materi"
          placeholder="Deskripsikan materi pembelajaran..."
          value={props.data.materiPembelajaran || ''}
          onChange={(e) => props.onChange('materiPembelajaran', e.target.value)}
          rows={6}
        />
      </div>
    </div>
  );
}

function StepRelevansi(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="relevansi">Relevansi dengan Kehidupan Nyata</Label>
        <Textarea
          id="relevansi"
          placeholder="Jelaskan relevansi materi dengan kehidupan nyata..."
          value={props.data.relevansiKehidupanNyata || ''}
          onChange={(e) => props.onChange('relevansiKehidupanNyata', e.target.value)}
          rows={6}
        />
      </div>
    </div>
  );
}

function StepStruktur(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="struktur">Struktur Materi</Label>
        <Textarea
          id="struktur"
          placeholder="Deskripsikan struktur materi (outline)..."
          value={props.data.strukturMateri || ''}
          onChange={(e) => props.onChange('strukturMateri', e.target.value)}
          rows={6}
        />
      </div>
    </div>
  );
}

function StepProfilPelajar(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="profil">Dimensi Profil Pelajar Pancasila</Label>
        <Textarea
          id="profil"
          placeholder="Jelaskan dimensi profil pelajar yang dikembangkan..."
          value={props.data.dimensiProfilPelajar || ''}
          onChange={(e) => props.onChange('dimensiProfilPelajar', e.target.value)}
          rows={6}
        />
      </div>
    </div>
  );
}

function StepCapaian(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="capaian">Capaian Pembelajaran</Label>
        <Textarea
          id="capaian"
          placeholder="Deskripsikan capaian pembelajaran..."
          value={props.data.capaianPembelajaran || ''}
          onChange={(e) => props.onChange('capaianPembelajaran', e.target.value)}
          rows={6}
        />
      </div>
    </div>
  );
}

function StepTujuan(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tujuan">Tujuan Pembelajaran</Label>
        <Textarea
          id="tujuan"
          placeholder="Deskripsikan tujuan pembelajaran..."
          value={props.data.tujuanPembelajaran || ''}
          onChange={(e) => props.onChange('tujuanPembelajaran', e.target.value)}
          rows={6}
        />
      </div>
    </div>
  );
}

function StepLintas(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="lintas">Lintas Disiplin Ilmu</Label>
        <Textarea
          id="lintas"
          placeholder="Jelaskan keterkaitan dengan disiplin ilmu lain..."
          value={props.data.lintasDisiplinIlmu || ''}
          onChange={(e) => props.onChange('lintasDisiplinIlmu', e.target.value)}
          rows={6}
        />
      </div>
    </div>
  );
}

function StepTopik(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="topik">Topik Utama</Label>
        <Input
          id="topik"
          placeholder="Topik utama pembelajaran"
          value={props.data.topikUtama || ''}
          onChange={(e) => props.onChange('topikUtama', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtopic">Sub-Topik</Label>
        <Textarea
          id="subtopic"
          placeholder="Daftar sub-topik pembelajaran"
          value={props.data.subTopik || ''}
          onChange={(e) => props.onChange('subTopik', e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pertanyaan">Pertanyaan Pemantik</Label>
        <Textarea
          id="pertanyaan"
          placeholder="Daftar pertanyaan pemantik untuk membuka pembelajaran"
          value={props.data.pertanyaanPemantik || ''}
          onChange={(e) => props.onChange('pertanyaanPemantik', e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
}

function StepPedagogis(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pendekatan">Pendekatan Pembelajaran</Label>
        <Textarea
          id="pendekatan"
          placeholder="Jelaskan pendekatan pembelajaran yang digunakan..."
          value={props.data.pendekatanPembelajaran || ''}
          onChange={(e) => props.onChange('pendekatanPembelajaran', e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="model">Model Pembelajaran</Label>
        <Input
          id="model"
          placeholder="Contoh: PBL, PjBL, Cooperative Learning"
          value={props.data.modelPembelajaran || ''}
          onChange={(e) => props.onChange('modelPembelajaran', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="metode">Metode Pembelajaran</Label>
        <Textarea
          id="metode"
          placeholder="Daftar metode pembelajaran..."
          value={props.data.metodePembelajaran || ''}
          onChange={(e) => props.onChange('metodePembelajaran', e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="media">Media dan Sumber Belajar</Label>
        <Textarea
          id="media"
          placeholder="Daftar media dan sumber belajar..."
          value={props.data.mediaSourceBelajar || ''}
          onChange={(e) => props.onChange('mediaSourceBelajar', e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
}

function StepLangkah(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="langkah">Langkah-Langkah Pembelajaran</Label>
        <Textarea
          id="langkah"
          placeholder="Deskripsikan langkah-langkah pembelajaran secara detail..."
          value={props.data.langkahPembelajaran || ''}
          onChange={(e) => props.onChange('langkahPembelajaran', e.target.value)}
          rows={8}
        />
      </div>
    </div>
  );
}

function StepAsesmen(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="asesmenAwal">Asesmen Awal (Diagnostik)</Label>
        <Textarea
          id="asesmenAwal"
          placeholder="Jelaskan asesmen awal..."
          value={props.data.asesmenAwal || ''}
          onChange={(e) => props.onChange('asesmenAwal', e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="asesmenProses">Asesmen Proses (Formatif)</Label>
        <Textarea
          id="asesmenProses"
          placeholder="Jelaskan asesmen proses..."
          value={props.data.asesmenProses || ''}
          onChange={(e) => props.onChange('asesmenProses', e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="asesmenAkhir">Asesmen Akhir (Sumatif)</Label>
        <Textarea
          id="asesmenAkhir"
          placeholder="Jelaskan asesmen akhir..."
          value={props.data.asesmenAkhir || ''}
          onChange={(e) => props.onChange('asesmenAkhir', e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
}

function StepRubrik(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="rubrik">Rubrik Penilaian</Label>
        <Textarea
          id="rubrik"
          placeholder="Deskripsikan rubrik penilaian dengan kriteria..."
          value={props.data.rubrikPenilaian || ''}
          onChange={(e) => props.onChange('rubrikPenilaian', e.target.value)}
          rows={6}
        />
      </div>
    </div>
  );
}

function StepKriteria(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="kriteria">Kriteria Ketercapaian Tujuan Pembelajaran</Label>
        <Textarea
          id="kriteria"
          placeholder="Deskripsikan kriteria ketercapaian..."
          value={props.data.kriteriaKetercapaian || ''}
          onChange={(e) => props.onChange('kriteriaKetercapaian', e.target.value)}
          rows={6}
        />
      </div>
    </div>
  );
}

function StepRemedial(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="remedial">Program Remedial</Label>
        <Textarea
          id="remedial"
          placeholder="Deskripsikan program remedial untuk peserta didik yang belum tuntas..."
          value={props.data.remedial || ''}
          onChange={(e) => props.onChange('remedial', e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pengayaan">Program Pengayaan</Label>
        <Textarea
          id="pengayaan"
          placeholder="Deskripsikan program pengayaan untuk peserta didik yang sudah tuntas..."
          value={props.data.pengayaan || ''}
          onChange={(e) => props.onChange('pengayaan', e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
}

function StepRefleksi(props: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="refleksi">Refleksi Guru dan Peserta Didik</Label>
        <Textarea
          id="refleksi"
          placeholder="Deskripsikan mekanisme refleksi pembelajaran..."
          value={props.data.refleksi || ''}
          onChange={(e) => props.onChange('refleksi', e.target.value)}
          rows={6}
        />
      </div>
    </div>
  );
}

function StepRingkasan(props: StepProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Modul Ajar</CardTitle>
          <CardDescription>Periksa kembali informasi yang telah diisi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-slate-900">Informasi Dasar</h4>
            <p className="text-sm text-slate-600">Judul: {props.data.title}</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Pengaturan</h4>
            <p className="text-sm text-slate-600">
              Semua 18 komponen modul ajar telah diisi
            </p>
          </div>

          <div className="rounded-md bg-blue-50 p-3">
            <p className="text-sm text-blue-700">
              Klik tombol "Publish" untuk menyimpan dan mempublikasikan modul ajar Anda.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ModuleCreatorWizard({
  subjects,
  phases,
}: {
  subjects: Subject[];
  phases: Phase[];
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Record<string, any>>({});

  const handleChange = (field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      const moduleRes = await fetch('/api/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          subject_id: data.subject_id,
          phase_id: data.phase_id,
          description: data.description,
        }),
      });

      if (!moduleRes.ok) {
        throw new Error('Failed to create module');
      }

      const module = await moduleRes.json();

      const contentRes = await fetch(`/api/modules/${module.id}/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!contentRes.ok) {
        throw new Error('Failed to save content');
      }

      router.push(`/dashboard/modules/${module.id}`);
    } catch (error) {
      console.error('[v0] Publish error:', error);
      alert('Gagal menyimpan modul. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const currentStepData = steps[currentStep - 1];
  const CurrentComponent = currentStepData.component;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            {currentStepData.title}
          </h2>
          <span className="text-sm text-slate-600">
            Langkah {currentStep} dari {steps.length}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="pt-6">
          <CurrentComponent
            stepNumber={currentStep}
            totalSteps={steps.length}
            data={data}
            onChange={handleChange}
            subjects={subjects}
            phases={phases}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between gap-3">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 1 || loading}
        >
          Sebelumnya
        </Button>

        {currentStep === steps.length ? (
          <Button onClick={handlePublish} disabled={loading}>
            {loading ? 'Menyimpan...' : 'Publikasikan Modul'}
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={loading}>
            Selanjutnya
          </Button>
        )}
      </div>
    </div>
  );
}
