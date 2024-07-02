-- CreateTable
CREATE TABLE "IsCompleted" (
    "iscompletedId" SERIAL NOT NULL,
    "addedExerciseId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "IsCompleted_pkey" PRIMARY KEY ("iscompletedId")
);
