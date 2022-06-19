-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "imgId" INTEGER;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
