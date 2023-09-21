import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { ProductDto } from './product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';

// const pngFileFilter = (req, file, callback) => {
//   let ext = path.extname(file.originalname);

//   if (ext !== '.png') {
//     req.fileValidationError = 'Invalid file type';
//     return callback(new Error('Invalid file type'), false);
//   }

//   return callback(null, true);
// };

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

  @Post('upload/:id')
  // @UseInterceptors(AnyFilesInterceptor())
  @UseInterceptors(
    FilesInterceptor('files[]', 20 /*{fileFilter: pngFileFilter,}*/),
  )
  async uploadFile(
    @Param('id') id: number,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    console.log('id: ', id);
    console.log('files: ', images);
    // return this.productService.uploadPicture(id, images);
    // console.log('id: ', id);
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
