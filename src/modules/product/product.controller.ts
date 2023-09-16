import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  NotFoundException,
  Patch,
  Query,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { ProductDto } from './product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query() query) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product | null> {
    return await this.productService.findOne(+id);
  }

  @Post()
  async create(@Body() ProductDto: ProductDto): Promise<Product> {
    return this.productService.create(ProductDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() ProductDto: ProductDto) {
    return this.productService.update(+id, ProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

}
