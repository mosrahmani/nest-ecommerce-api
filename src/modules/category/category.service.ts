import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) { }
  
  async findAll() {
    return this.prisma.category.findMany({
        select: {
          id: true,
          name: true,
        }
      });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.prisma.category.findUnique({ where: { id } })
    if (!category) throw new NotFoundException('Category Not Found!');

    return category
  }

  async create(data: any): Promise<Category> {
    const exist = await this.prisma.category.findUnique({ where: { name: data.name } })
    if (exist) throw new BadRequestException(`Category with name ${data.name} already exist!`);

    return this.prisma.category.create({ data });
  }

  async update(id: number, data: any): Promise<Category> {
    const exist = await this.prisma.category.findUnique({ where: { id } })
    if (!exist) throw new NotFoundException(`Category with ID ${id} not found!`);

    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }
}
