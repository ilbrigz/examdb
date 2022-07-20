/*
  Warnings:

  - Added the required column `label` to the `Pdf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pdf" ADD COLUMN     "label" TEXT NOT NULL;
