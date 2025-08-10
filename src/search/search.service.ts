import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchBrands(query: string) {
    const brands = await this.prisma.brand.findMany({
      where: {
        name: {
          contains: query, // 'name' 필드에 'query'가 포함된 브랜드를 찾습니다.
        },
      },
    });

    // openapi.yaml 명세서에 따라 첫 번째 결과를 primaryResult로, 나머지를 recommendations로 분리합니다.
    const primaryResult = brands.length > 0 ? brands[0] : null;
    const recommendations = brands.length > 1 ? brands.slice(1) : [];

    return {
      primaryResult,
      recommendations,
    };
  }
}
