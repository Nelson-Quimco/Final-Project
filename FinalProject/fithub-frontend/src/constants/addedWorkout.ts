interface addedExerciseType {
  addedExerciseId: number;
  userId: number;
  title: string;
  Name: string;
  reps: number;
  setDate: string;
  isComplete: boolean;
}

interface addedExerciseRes {
  data: addedExerciseType[];
}

export type { addedExerciseType, addedExerciseRes };
