/*
  Warnings:

  - You are about to drop the column `startDate` on the `AddedExercise` table. All the data in the column will be lost.
  - Added the required column `setDate` to the `AddedExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AddedExercise" DROP COLUMN "startDate",
ADD COLUMN     "setDate" TIMESTAMP(3) NOT NULL;
