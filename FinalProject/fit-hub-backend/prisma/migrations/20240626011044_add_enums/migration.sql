/*
  Warnings:

  - Changed the type of `Level` on the `FitnessExercise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `Type` on the `FitnessExercise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Types" AS ENUM ('ALL', 'ABDOMINAL', 'BACK', 'BICEPS', 'CARDIO', 'REST');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'EXPERT');

-- AlterTable
ALTER TABLE "FitnessExercise" DROP COLUMN "Level",
ADD COLUMN     "Level" "Level" NOT NULL,
DROP COLUMN "Type",
ADD COLUMN     "Type" "Types" NOT NULL;
