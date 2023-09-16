import { PaginatedResult, paginate } from '@prisma/helpers/paginator';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Product } from '@prisma/client';
import { validFilters, validOrders } from '@common/utils/validateQueryData';
import { validArgs } from './product.interface';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(query: validArgs): Promise<PaginatedResult<Product>> {
    const { page, per_page, order_by, category_id, price_from, price_to } = query

    const filtersList = [
      { key: ['category_id'], field: 'category_id', where: { equals: +category_id } },
      { key: ['price_to', 'price_from'], field: 'price', where: { gte: +price_from || undefined, lte: +price_to || undefined } }
    ]

    const ordersList = [
      { key: 'cheapest', field: 'price', value: 'asc' },
      { key: 'expensive', field: 'price', value: 'desc' },
      { key: 'newest', field: 'created_at', value: 'desc' },
      { key: 'oldest', field: 'created_at', value: 'asc' },
    ]

    return paginate(
      this.prisma.product,
      {
        where: validFilters(query, filtersList),
        orderBy: validOrders(order_by, ordersList),
        include: { Category: { select: { name: true } } }
      },
      { page, per_page })
  }

  async findOne(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } })
    if (!product) throw new NotFoundException('Product Not Found!');

    return product
  }

  async create(data: any): Promise<Product> {
    const exist = await this.prisma.product.findUnique({ where: { slug: data.slug } })
    if (exist) throw new BadRequestException(`Product with slug ${data.slug} already exist!`);

    return this.prisma.product.create({ data });
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
