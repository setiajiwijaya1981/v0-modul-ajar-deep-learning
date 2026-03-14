-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SCHOOL_ADMIN', 'TEACHER', 'MODERATOR', 'USER');

-- CreateEnum
CREATE TYPE "ModuleStatus" AS ENUM ('DRAFT', 'REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ModuleVisibility" AS ENUM ('PRIVATE', 'SCHOOL', 'PUBLIC');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PDF', 'WORD', 'POWERPOINT', 'EXCEL', 'IMAGE', 'VIDEO', 'AUDIO', 'OTHER');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'APPROVED', 'REJECTED', 'CHANGES_REQUESTED');

-- CreateEnum
CREATE TYPE "AccessAction" AS ENUM ('VIEW', 'DOWNLOAD', 'PRINT', 'SHARE', 'EXPORT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "schoolId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "loginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "province" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameEn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phase" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gradeStart" INTEGER NOT NULL,
    "gradeEnd" INTEGER NOT NULL,
    "description" TEXT,
    "subjectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Phase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CPTPMaster" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "phaseId" TEXT NOT NULL,
    "cpCode" TEXT NOT NULL,
    "cpText" TEXT NOT NULL,
    "tpCode" TEXT NOT NULL,
    "tpText" TEXT NOT NULL,
    "profileDimensions" TEXT,
    "gradeLevel" INTEGER,
    "assessmentElements" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CPTPMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "subjectId" TEXT NOT NULL,
    "phaseId" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "schoolYear" TEXT,
    "contentId" TEXT NOT NULL,
    "cpTpReferences" TEXT,
    "authorId" TEXT NOT NULL,
    "schoolId" TEXT,
    "status" "ModuleStatus" NOT NULL DEFAULT 'DRAFT',
    "visibility" "ModuleVisibility" NOT NULL DEFAULT 'PRIVATE',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleContent" (
    "id" TEXT NOT NULL,
    "pesertaDidikIdentifikasi" TEXT,
    "materiPembelajaran" TEXT,
    "relevansiKehidupanNyata" TEXT,
    "strukturMateri" TEXT,
    "dimensiProfilPelajar" TEXT,
    "capaianPembelajaran" TEXT,
    "elemenCapaian" TEXT,
    "tujuanPembelajaran" TEXT,
    "lintasDisiplinIlmu" TEXT,
    "topikUtama" TEXT,
    "subTopik" TEXT,
    "pertanyaanPemantik" TEXT,
    "pendekatanPembelajaran" TEXT,
    "modelPembelajaran" TEXT,
    "metodePembelajaran" TEXT,
    "mediaSourceBelajar" TEXT,
    "langkahPembelajaran" TEXT,
    "asesmenAwal" TEXT,
    "asesmenProses" TEXT,
    "asesmenAkhir" TEXT,
    "rubrikPenilaian" TEXT,
    "kriteriaKetercapaian" TEXT,
    "remedial" TEXT,
    "pengayaan" TEXT,
    "refleksi" TEXT,
    "catatanTambahan" TEXT,
    "daftarPustaka" TEXT,
    "sumberBelajar" TEXT,
    "lampiran" TEXT,
    "moduleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModuleContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleDocument" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "url" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModuleDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleReview" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "comments" TEXT,
    "suggestions" TEXT,
    "rating" INTEGER,
    "checklist" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModuleReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleAccessLog" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "userId" TEXT,
    "action" "AccessAction" NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModuleAccessLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalyticsSnapshot" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalModules" INTEGER NOT NULL,
    "publishedModules" INTEGER NOT NULL,
    "draftModules" INTEGER NOT NULL,
    "totalViews" INTEGER NOT NULL,
    "totalDownloads" INTEGER NOT NULL,
    "subjectStats" TEXT,
    "totalUsers" INTEGER NOT NULL,
    "teacherCount" INTEGER NOT NULL,
    "adminCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalyticsSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_schoolId_idx" ON "User"("schoolId");

-- CreateIndex
CREATE INDEX "LoginHistory_userId_idx" ON "LoginHistory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "School_email_key" ON "School"("email");

-- CreateIndex
CREATE INDEX "School_name_idx" ON "School"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_key" ON "Subject"("code");

-- CreateIndex
CREATE INDEX "Subject_code_idx" ON "Subject"("code");

-- CreateIndex
CREATE INDEX "Subject_name_idx" ON "Subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Phase_code_key" ON "Phase"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Phase_subjectId_code_key" ON "Phase"("subjectId", "code");

-- CreateIndex
CREATE INDEX "Phase_subjectId_idx" ON "Phase"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "CPTPMaster_subjectId_phaseId_cpCode_tpCode_key" ON "CPTPMaster"("subjectId", "phaseId", "cpCode", "tpCode");

-- CreateIndex
CREATE INDEX "CPTPMaster_subjectId_idx" ON "CPTPMaster"("subjectId");

-- CreateIndex
CREATE INDEX "CPTPMaster_phaseId_idx" ON "CPTPMaster"("phaseId");

-- CreateIndex
CREATE INDEX "CPTPMaster_cpCode_idx" ON "CPTPMaster"("cpCode");

-- CreateIndex
CREATE INDEX "CPTPMaster_tpCode_idx" ON "CPTPMaster"("tpCode");

-- CreateIndex
CREATE UNIQUE INDEX "Module_slug_key" ON "Module"("slug");

-- CreateIndex
CREATE INDEX "Module_slug_idx" ON "Module"("slug");

-- CreateIndex
CREATE INDEX "Module_subjectId_idx" ON "Module"("subjectId");

-- CreateIndex
CREATE INDEX "Module_phaseId_idx" ON "Module"("phaseId");

-- CreateIndex
CREATE INDEX "Module_grade_idx" ON "Module"("grade");

-- CreateIndex
CREATE INDEX "Module_authorId_idx" ON "Module"("authorId");

-- CreateIndex
CREATE INDEX "Module_status_idx" ON "Module"("status");

-- CreateIndex
CREATE INDEX "Module_visibility_idx" ON "Module"("visibility");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleContent_moduleId_key" ON "ModuleContent"("moduleId");

-- CreateIndex
CREATE INDEX "ModuleDocument_moduleId_idx" ON "ModuleDocument"("moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleReview_moduleId_reviewerId_key" ON "ModuleReview"("moduleId", "reviewerId");

-- CreateIndex
CREATE INDEX "ModuleReview_moduleId_idx" ON "ModuleReview"("moduleId");

-- CreateIndex
CREATE INDEX "ModuleReview_reviewerId_idx" ON "ModuleReview"("reviewerId");

-- CreateIndex
CREATE INDEX "ModuleReview_status_idx" ON "ModuleReview"("status");

-- CreateIndex
CREATE INDEX "ModuleAccessLog_moduleId_idx" ON "ModuleAccessLog"("moduleId");

-- CreateIndex
CREATE INDEX "ModuleAccessLog_userId_idx" ON "ModuleAccessLog"("userId");

-- CreateIndex
CREATE INDEX "ModuleAccessLog_createdAt_idx" ON "ModuleAccessLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "AnalyticsSnapshot_date_key" ON "AnalyticsSnapshot"("date");

-- CreateIndex
CREATE INDEX "AnalyticsSnapshot_date_idx" ON "AnalyticsSnapshot"("date");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "Phase_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CPTPMaster" ADD CONSTRAINT "CPTPMaster_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CPTPMaster" ADD CONSTRAINT "CPTPMaster_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ModuleContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleContent" ADD CONSTRAINT "ModuleContent_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleDocument" ADD CONSTRAINT "ModuleDocument_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleReview" ADD CONSTRAINT "ModuleReview_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleReview" ADD CONSTRAINT "ModuleReview_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
