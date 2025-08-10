import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsInt()
  @Min(1800)
  year: number;

  @IsNumber()
  rating: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  cast?: string[];
}

export class UpdateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsInt()
  @Min(1800)
  year: number;

  @IsNumber()
  rating: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  cast?: string[];
}
