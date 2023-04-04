import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}
    async findAll(): Promise<Product[]> {
        return this.prisma.product.findMany();
      }
    
      async findOne(id: number): Promise<Product | null> {
        const product = await this.prisma.product.findUnique({ where: { id } })
        if (!product) throw new NotFoundException('Product Not Found!');

        return product
      }
    
      async create(data : any): Promise<Product> {
        const exist = await this.prisma.product.findUnique({ where: { slug: data.slug } })
        if (exist) throw new BadRequestException(`Product with slug ${data.slug} already exist!`);

        return this.prisma.product.create({data});
      }
    
      async update(id: number, data: any): Promise<Product> {
        const exist = await this.prisma.product.findUnique({ where: { id } })
        if (!exist) throw new NotFoundException(`Product with ID ${id} not found!`);

        const slug = await this.prisma.product.findUnique({ where: { slug: data.slug } })
        if (slug) throw new BadRequestException('slug already exist');
        
        return this.prisma.product.update({ where: { id }, data });
      }
    
      async remove(id: number): Promise<void> {
        await this.prisma.product.delete({ where: { id } });
      }
}
