import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { CategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category | null> {
    return await this.categoryService.findOne(+id);
  }

  @Post()
  async create(@Body() CategoryDto: CategoryDto): Promise<Category> {
    return this.categoryService.create(CategoryDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() CategoryDto: CategoryDto) {
    return this.categoryService.update(+id, CategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }

}
