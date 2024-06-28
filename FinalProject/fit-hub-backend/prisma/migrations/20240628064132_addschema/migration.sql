-- CreateTable
CREATE TABLE "AddedExercise" (
    "addedExerciseId" SERIAL NOT NULL,
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AddedExercise_pkey" PRIMARY KEY ("addedExerciseId")
);
