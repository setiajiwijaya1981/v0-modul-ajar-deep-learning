'use client';

import React from 'react';
import { useModuleForm } from '@/lib/contexts/module-form-context';
import { ModuleComponent } from '@/lib/firebase/collections';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ModuleComponentFormProps {
  component: ModuleComponent;
}

export function BasicInfoForm() {
  const { formData, updateFormData, markComponentComplete } = useModuleForm();
  const data = formData.basicInfo;

  const handleChange = (field: string, value: any) => {
    const updated = { ...data, [field]: value };
    updateFormData('basicInfo', updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>1. Informasi Dasar</CardTitle>
        <CardDescription>
          Masukkan informasi umum tentang modul ajar yang akan dibuat
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="schoolName">Nama Sekolah</Label>
          <Input
            id="schoolName"
            value={data.schoolName}
            onChange={(e) => handleChange('schoolName', e.target.value)}
            placeholder="Contoh: SMP Negeri 1 Jakarta"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mataPelajaran">Mata Pelajaran</Label>
            <Input
              id="mataPelajaran"
              value={data.mataPelajaran}
              onChange={(e) => handleChange('mataPelajaran', e.target.value)}
              placeholder="Contoh: IPS"
            />
          </div>
          <div>
            <Label htmlFor="kelas">Kelas</Label>
            <Select value={data.kelas} onValueChange={(val) => handleChange('kelas', val)}>
              <SelectTrigger id="kelas">
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
              <SelectContent>
                {['7', '8', '9', '10', '11', '12'].map((k) => (
                  <SelectItem key={k} value={k}>
                    Kelas {k}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fase">Fase/Kurikulum</Label>
            <Select value={data.fase} onValueChange={(val) => handleChange('fase', val)}>
              <SelectTrigger id="fase">
                <SelectValue placeholder="Pilih fase" />
              </SelectTrigger>
              <SelectContent>
                {['A', 'B', 'C', 'D', 'E', 'F'].map((f) => (
                  <SelectItem key={f} value={f}>
                    Fase {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="alokasi_waktu">Alokasi Waktu (Menit)</Label>
            <Input
              id="alokasi_waktu"
              type="number"
              value={data.alokasi_waktu}
              onChange={(e) => handleChange('alokasi_waktu', parseInt(e.target.value))}
              placeholder="Contoh: 240"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tema">Tema Pembelajaran</Label>
          <Input
            id="tema"
            value={data.tema}
            onChange={(e) => handleChange('tema', e.target.value)}
            placeholder="Contoh: Perubahan Sosial"
          />
        </div>

        <Button 
          onClick={() => markComponentComplete('basicInfo')}
          className="w-full"
        >
          Lanjutkan ke Bagian Berikutnya
        </Button>
      </CardContent>
    </Card>
  );
}

export function PesertaDidikForm() {
  const { formData, updateFormData, markComponentComplete } = useModuleForm();
  const data = formData.pesertaDidik;

  const handleChange = (field: string, value: any) => {
    const updated = { ...data, [field]: value };
    updateFormData('pesertaDidik', updated);
  };

  const gaya_belajar_options = ['Visual', 'Auditori', 'Kinestetik', 'Baca-Tulis'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>2. Identifikasi Peserta Didik</CardTitle>
        <CardDescription>
          Jelaskan karakteristik peserta didik yang menjadi target pembelajaran
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="usia">Usia Peserta Didik</Label>
          <Input
            id="usia"
            value={data.usia}
            onChange={(e) => handleChange('usia', e.target.value)}
            placeholder="Contoh: 14-15 tahun"
          />
        </div>

        <div>
          <Label htmlFor="kognitif">Karakteristik Kognitif</Label>
          <Textarea
            id="kognitif"
            value={data.karakteristik_kognitif}
            onChange={(e) => handleChange('karakteristik_kognitif', e.target.value)}
            placeholder="Deskripsikan kemampuan kognitif peserta didik..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="sosial">Karakteristik Sosial-Emosional</Label>
          <Textarea
            id="sosial"
            value={data.karakteristik_sosial_emosional}
            onChange={(e) => handleChange('karakteristik_sosial_emosional', e.target.value)}
            placeholder="Deskripsikan kondisi sosial-emosional peserta didik..."
            rows={3}
          />
        </div>

        <div>
          <Label>Gaya Belajar</Label>
          <div className="space-y-2">
            {gaya_belajar_options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`gaya-${option}`}
                  checked={data.gaya_belajar.includes(option)}
                  onCheckedChange={(checked) => {
                    const updated = checked
                      ? [...data.gaya_belajar, option]
                      : data.gaya_belajar.filter((g: string) => g !== option);
                    handleChange('gaya_belajar', updated);
                  }}
                />
                <Label htmlFor={`gaya-${option}`} className="font-normal">{option}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="prasyarat">Pengetahuan Prasyarat</Label>
          <Textarea
            id="prasyarat"
            value={data.pengetahuan_prasyarat}
            onChange={(e) => handleChange('pengetahuan_prasyarat', e.target.value)}
            placeholder="Sebutkan pengetahuan/keterampilan yang harus dimiliki sebelumnya..."
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="khusus">Kebutuhan Khusus</Label>
          <Textarea
            id="khusus"
            value={data.kebutuhan_khusus}
            onChange={(e) => handleChange('kebutuhan_khusus', e.target.value)}
            placeholder="Jelaskan akomodasi untuk peserta didik dengan kebutuhan khusus..."
            rows={2}
          />
        </div>

        <Button 
          onClick={() => markComponentComplete('pesertaDidik')}
          className="w-full"
        >
          Lanjutkan ke Bagian Berikutnya
        </Button>
      </CardContent>
    </Card>
  );
}
