/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Choice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[text]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Choice_name_key" ON "Choice"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Question_text_key" ON "Question"("text");
