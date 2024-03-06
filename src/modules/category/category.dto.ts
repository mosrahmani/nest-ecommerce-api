import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public slug: string;

  @IsInt()
  @IsOptional()
  public parent_id: number;
}