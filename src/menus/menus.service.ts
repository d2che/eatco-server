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

  // 👇 여기가 핵심! findOneWithPrices 함수를 아래와 같이 수정합니다.
  async findOneWithPrices(id: number) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        brand: true,  // 👈 brand 정보를 함께 조회합니다.
        prices: true, // 👈 prices 정보를 함께 조회합니다.
      },
    });

    if (!menu) {
      throw new NotFoundException(`ID가 ${id}인 메뉴를 찾을 수 없습니다.`);
    }

    // 💡 프론트엔드가 원하는 모양으로 데이터를 직접 가공해서 반환합니다.
    return {
      menuName: menu.name,              // 'name' -> 'menuName'
      brandName: menu.brand.name,       // brand 객체에서 name을 가져와 'brandName'으로 추가
      imageUrl: menu.imageUrl,
      platformPrices: menu.prices.map(p => ({ // 'prices' -> 'platformPrices'
        platformName: p.appName,
        price: p.price,
        discountInfo: p.discountInfo || '할인 없음',
        // 프론트엔드 타입 정의에 필요한 다른 속성들을 여기에 추가할 수 있습니다.
        // 예를 들어, platformLogoUrl이 필요하다면 아래와 같이 추가합니다.
        platformLogoUrl: p.appLogoUrl 
      })),
    };
  }
}
