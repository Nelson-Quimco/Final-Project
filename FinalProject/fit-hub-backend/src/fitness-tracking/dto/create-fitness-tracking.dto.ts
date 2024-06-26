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
