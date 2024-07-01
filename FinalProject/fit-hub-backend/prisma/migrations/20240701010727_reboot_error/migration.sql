/*
  Warnings:

  - You are about to drop the column `fitnessExerciseId` on the `AddedExercise` table. All the data in the column will be lost.
  - Added the required column `id` to the `AddedExercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AddedExercise" DROP CONSTRAINT "AddedExercise_fitnessExerciseId_fkey";

-- AlterTable
ALTER TABLE "AddedExercise" DROP COLUMN "fitnessExerciseId",
ADD COLUMN     "id" INTEGER NOT NULL;
