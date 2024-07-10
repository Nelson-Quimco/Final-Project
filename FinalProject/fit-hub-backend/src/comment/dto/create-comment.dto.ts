import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
