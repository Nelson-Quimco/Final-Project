import User from "./userTypes";

// Define enums for Level and Types
enum Level {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

enum Types {
  CARDIO = "CARDIO",
  STRENGTH = "STRENGTH",
  FLEXIBILITY = "FLEXIBILITY",
  BALANCE = "BALANCE",
}

// Define the FitnessExercise type
interface FitnessExercise {
  id: number;
  Level: Level;
  Type: Types;
  Name: string;
  Description: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  userId: number;
  reps: number;
  //   progresses: Progress[];
}

interface FitnessExerciseResponse {
  data: FitnessExercise[];
}

export type { FitnessExercise, FitnessExerciseResponse };
