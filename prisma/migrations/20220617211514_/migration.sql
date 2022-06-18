/*
  Warnings:

  - You are about to drop the column `mistakes` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Choice" ADD COLUMN     "checkCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mistakeCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "mistakes",
DROP COLUMN "score",
ADD COLUMN     "checkCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mistakeCount" INTEGER NOT NULL DEFAULT 0;
