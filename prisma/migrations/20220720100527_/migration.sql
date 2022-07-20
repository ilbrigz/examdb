/*
  Warnings:

  - A unique constraint covering the columns `[originalName]` on the table `Pdf` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `originalName` to the `Pdf` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Pdf_text_key";

-- AlterTable
ALTER TABLE "Pdf" ADD COLUMN     "originalName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pdf_originalName_key" ON "Pdf"("originalName");
