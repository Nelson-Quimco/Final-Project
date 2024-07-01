/*
  Warnings:

  - You are about to drop the column `id` on the `AddedExercise` table. All the data in the column will be lost.
  - Added the required column `fitnessExerciseId` to the `AddedExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AddedExercise" DROP COLUMN "id",
ADD COLUMN     "fitnessExerciseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AddedExercise" ADD CONSTRAINT "AddedExercise_fitnessExerciseId_fkey" FOREIGN KEY ("fitnessExerciseId") REFERENCES "FitnessExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
