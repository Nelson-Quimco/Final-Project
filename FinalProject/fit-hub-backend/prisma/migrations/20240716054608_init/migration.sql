-- AlterTable
ALTER TABLE "AddedExercise" ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "AddedExercise" ADD CONSTRAINT "AddedExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
