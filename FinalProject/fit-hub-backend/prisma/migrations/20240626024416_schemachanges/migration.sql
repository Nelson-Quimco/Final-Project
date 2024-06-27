/*
  Warnings:

  - The values [ALL] on the enum `Types` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `FitnessExercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `exerciseId` on the `FitnessExercise` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Types_new" AS ENUM ('ABDOMINAL', 'BACK', 'BICEPS', 'CARDIO', 'REST');
ALTER TABLE "FitnessExercise" ALTER COLUMN "Type" TYPE "Types_new" USING ("Type"::text::"Types_new");
ALTER TYPE "Types" RENAME TO "Types_old";
ALTER TYPE "Types_new" RENAME TO "Types";
DROP TYPE "Types_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_exerciseId_fkey";

-- DropIndex
DROP INDEX "FitnessExercise_userId_key";

-- DropIndex
DROP INDEX "Progress_exerciseId_key";

-- DropIndex
DROP INDEX "Progress_userId_key";

-- AlterTable
ALTER TABLE "FitnessExercise" DROP CONSTRAINT "FitnessExercise_pkey",
DROP COLUMN "exerciseId",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "Level" SET DEFAULT 'BEGINNER',
ALTER COLUMN "Type" SET DEFAULT 'CARDIO',
ADD CONSTRAINT "FitnessExercise_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "FitnessExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
