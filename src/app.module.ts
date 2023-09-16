import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from '@modules/product/product.module';
import { CategoryModule } from '@modules/category/category.module';
import AdminModule from '@modules/admin/admin.module';

@Module({
  imports: [
    AdminModule,
    PrismaModule,
    ProductModule,
    CategoryModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
