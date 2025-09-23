import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  create(createBrandDto: CreateBrandDto) {
    return this.prisma.brand.create({
      data: createBrandDto,
    });
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

  findOne(id: number) {
    return this.prisma.brand.findUnique({
      where: { id },
    });
  }

  findMenusByBrand(id: number) {
    return this.prisma.menu.findMany({
      where: {
        brandId: {
          equals: id, // 'id와 같은(equals) brandId를 찾아줘' 라고 더 명확하게 지정합니다.
        },
      },
    });
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.prisma.brand.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  remove(id: number) {
    return this.prisma.brand.delete({
      where: { id },
    });
  }
}
