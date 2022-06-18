/*
  Warnings:

  - You are about to drop the column `checkCount` on the `Choice` table. All the data in the column will be lost.
  - You are about to drop the column `mistakeCount` on the `Choice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Choice" DROP COLUMN "checkCount",
DROP COLUMN "mistakeCount";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "checkCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mistakeCount" INTEGER NOT NULL DEFAULT 0;
