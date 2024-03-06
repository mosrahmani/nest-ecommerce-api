import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Category } from '@prisma/client';
import { slugifyForRoute } from '@common/utils/slugifyForRoute.util';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) { }
  
  async findAll() {
    return this.prisma.category.findMany({
        include: {
          children: true,
        },
      });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.prisma.category.findUnique({ where: { id } })
    if (!category) throw new NotFoundException('Category Not Found!');

    return category
  }

  async create(data: any): Promise<Category> {
    const exist = await this.prisma.category.findUnique({ where: { slug: data.slug } })
    if (exist) throw new BadRequestException(`Category with slug ${data.slug} already exist!`);

    data.slug = slugifyForRoute(data.slug)

    if(data.parent_id){
      const parentIdHasExist = await this.prisma.category.findUnique({ where: { id: data.parent_id } })
      if (!parentIdHasExist) throw new BadRequestException(`Category with id ${data.parent_id} not found!`);
    }

    return this.prisma.category.create({ data });
  }

  async update(id: number, data: any): Promise<Category> {
    const exist = await this.prisma.category.findUnique({ where: { id } })
    if (!exist) throw new NotFoundException(`Category with ID ${id} not found!`);

    if(data.parent_id){
      const parentIdHasExist = await this.prisma.category.findUnique({ where: { id: data.parent_id } })
      if (!parentIdHasExist) throw new BadRequestException(`Category with id ${data.parent_id} not found!`);
    }

    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }
}
