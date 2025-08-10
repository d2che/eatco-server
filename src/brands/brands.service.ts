import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  create(createBrandDto: CreateBrandDto) {
    return 'This action adds a new brand';
  }

  findAll(category: 'popular' | 'low-cost') {
    if (category === 'popular') {
      return this.prisma.brand.findMany({ where: { isPopular: true } });
    }
    if (category === 'low-cost') {
      return this.prisma.brand.findMany({ where: { isLowCost: true } });
    }
    return [];
  }

  // ▼▼▼▼▼ 이 findOne 함수가 다시 추가되었습니다! ▼▼▼▼▼
  findOne(id: number) {
    return this.prisma.brand.findUnique({
      where: { id },
    });
  }
  // ▲▲▲▲▲ 여기까지 ▲▲▲▲▲

  findMenusByBrand(id: number) {
    return this.prisma.menu.findMany({
      where: { brandId: id },
    });
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
