// src/modules/cart-item/cart-item.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CreateCartItemDto } from './dto';
import { UpdateCartItemDto } from './dto';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }

  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get()
  findAll() {
    return this.cartItemService.findAll();
  }

  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cartItemService.findOne(id);
  }

  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemService.update(id, updateCartItemDto);
  }

  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.cartItemService.delete(id);
  }
}
