// src/menus/menus.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe, // 👈 ParseIntPipe를 import 합니다.
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Menu')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menusService.findAll();
  }

  // 👇 여기가 핵심! findOneWithPrices 함수를 사용하도록 수정합니다.
  @Get(':id/prices')
  @ApiOperation({ summary: '특정 메뉴의 가격 비교 정보 조회' })
  findOneWithPrices(@Param('id', ParseIntPipe) id: number) {
    // 💡 URL로 받은 id를 안전하게 숫자로 변환하여 서비스에 전달합니다.
    return this.menusService.findOneWithPrices(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    return this.menusService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.menusService.remove(id);
  }
}
