import { IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePendingItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'Name must have less than 100 characters'})
  name: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Description must have at least 10 characters'})
  @MaxLength(1024, { message: 'Description must have less than 1024 characters'})
  description?: string;
  @IsPositive()
  numberOfHours: number;
  @IsOptional()
  @IsPositive()
  cost?: number;
}
