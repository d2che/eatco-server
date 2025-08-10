import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MainService {
  constructor(private prisma: PrismaService) {}

  async getMainPageData() {
    // 1. 인기 메뉴 7개 조회 (연관된 브랜드와 앱별 가격 정보 포함)
    const popularMenus = await this.prisma.menu.findMany({
      where: { isPopular: true },
      take: 7,
      include: {
        brand: true, // 메뉴에 속한 브랜드 정보
        prices: {
          // 메뉴에 속한 앱별 가격 정보
          orderBy: {
            price: 'asc', // 가격이 낮은 순으로 정렬
          },
          take: 3, // 상위 3개만 가져오기
        },
      },
    });

    // 2. 인기 브랜드 7개 조회
    const popularBrands = await this.prisma.brand.findMany({
      where: { isPopular: true },
      take: 7,
    });

    // 3. 저가 브랜드 7개 조회
    const lowCostBrands = await this.prisma.brand.findMany({
      where: { isLowCost: true },
      take: 7,
    });

    return {
      popularMenus,
      popularBrands,
      lowCostBrands,
    };
  }
}
