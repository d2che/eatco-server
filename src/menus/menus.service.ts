// src/menus/menus.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: createMenuDto,
    });
  }

  findAll() {
    return this.prisma.menu.findMany({
      include: {
        brand: true,
        prices: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: {
        brand: true,
        prices: true,
      },
    });
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: { id },
      data: updateMenuDto,
    });
  }

  remove(id: number) {
    return this.prisma.menu.delete({
      where: { id },
    });
  }

  // 특정 메뉴의 상세 가격 정보를 조회하는 함수
  async findOneWithPrices(id: number) {
    // 1. async/await 추가
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        prices: true, // 앱별 가격 정보를 포함해서 조회
      },
    });

    // 2. 메뉴를 찾지 못했을 때 에러 처리
    if (!menu) {
      throw new NotFoundException(`ID가 ${id}인 메뉴를 찾을 수 없습니다.`);
    }

    // 3. 프론트엔드가 원하는 모양으로 데이터를 직접 만들어서 반환
    return {
      id: menu.id,
      name: menu.name,
      imageUrl: menu.imageUrl,
      prices: menu.prices,
    };
  }
}
