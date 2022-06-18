/*
  Warnings:

  - A unique constraint covering the columns `[questionId]` on the table `Choice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "correctChoiceId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Choice_questionId_key" ON "Choice"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Question_categoryId_key" ON "Question"("categoryId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_correctChoiceId_fkey" FOREIGN KEY ("correctChoiceId") REFERENCES "Choice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
