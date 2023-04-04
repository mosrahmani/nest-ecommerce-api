import { IsInt, IsString, IsJSON, IsNotEmpty, Validate } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public slug: string;

  @IsInt()
  @IsNotEmpty()
  public quantity: number;

  @IsInt()
  @IsNotEmpty()
  public price: number;

  @IsString()
  @IsNotEmpty()
  public status: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

}