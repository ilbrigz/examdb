/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Pdf` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pdf_text_key" ON "Pdf"("text");
