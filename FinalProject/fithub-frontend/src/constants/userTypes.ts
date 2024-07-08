interface User {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  // profile?: UserProfile;
  // passwordResets: PasswordReset[];
  // fitnessExercises: FitnessExercise[];
  // posts: Post[];
  // comments: Comment[];
  // progresses: Progress[];
}

interface UserRes {
  user: User;
}

export type { User, UserRes };
