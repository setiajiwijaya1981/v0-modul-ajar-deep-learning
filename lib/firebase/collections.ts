// Firestore Collection Names
export const COLLECTIONS = {
  USERS: 'users',
  MODULES: 'modules',
  MASTER_CP: 'masterData/cp/data',
  MASTER_TP: 'masterData/tp/data',
  MODULE_REVIEWS: 'moduleReviews',
  SHARED_MODULES: 'sharedModules',
  COMMENTS: 'comments',
  MODULE_ACCESS_LOGS: 'moduleAccessLogs',
  ANALYTICS: 'analytics',
} as const;

export type CollectionType = typeof COLLECTIONS[keyof typeof COLLECTIONS];

export const MODULE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  KEPALA_SEKOLAH: 'kepala_sekolah',
} as const;

export const MODULE_COMPONENTS = [
  'basicInfo',
  'pesertaDidik',
  'materiPembelajaran',
  'relevansi',
  'strukturMateri',
  'profilPancasila',
  'capaiPembelajaran',
  'tujuanPembelajaran',
  'lintasDisiplin',
  'topikPembelajaran',
  'praktikPedagogis',
  'mediaBeajar',
  'langkahPembelajaran',
  'asesmenAwal',
  'asesmenProses',
  'asesmenAkhir',
  'rubrikPenilaian',
  'kriteriKetercapaian',
] as const;

export type ModuleComponent = typeof MODULE_COMPONENTS[number];
