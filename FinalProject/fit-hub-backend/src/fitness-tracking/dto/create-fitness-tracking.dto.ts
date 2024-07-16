import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Level, Types } from '@prisma/client';

export class CreateFitnessTrackingDto {
  @IsNotEmpty()
  userId: number;

  @IsEnum(Level)
  Level: Level;

  @IsEnum(Types)
  Type: Types;

  @IsNotEmpty()
  @IsString()
  Name: string;

  @IsNotEmpty()
  @IsString()
  Description: string;
}

export class CreateFitnessExerciseDto {
  level: Level;
  type: Types;
  name: string;
  description: string;
}

export class AddedExerciseDto {
  @IsEnum(Types)
  Type: Types;
  @IsEnum(Level)
  Level: Level;
  title: string;
  name: string;
  reps: number;
}

export class IsCompletedDto {
  @IsNumber()
  addedExerciseId: number;

  @IsString()
  name: string;

  @IsNumber()
  reps: number;

  @IsBoolean()
  isComplete: boolean;
}
