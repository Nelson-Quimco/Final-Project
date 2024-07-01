import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
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

export class AddedExerciseDto {
  @IsEnum(Types)
  Type: Types;
  @IsEnum(Level)
  Level: Level;
  title: string;
  name: string;
  reps: number;
}

