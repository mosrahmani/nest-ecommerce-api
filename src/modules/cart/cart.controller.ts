import {
  Controller,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('category')
export class CartController {
  constructor(private readonly CartService: CartService) { }

}
