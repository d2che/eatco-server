import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Brand')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  @ApiOperation({ summary: '브랜드 목록 조회' })
  @ApiQuery({
    name: 'category',
    required: true,
    enum: ['popular', 'low-cost'],
  })
  findAll(@Query('category') category: 'popular' | 'low-cost') {
    return this.brandsService.findAll(category);
  }

  @Get(':id/menus')
  @ApiOperation({ summary: '특정 브랜드의 메뉴 목록 조회' })
  findMenusByBrand(@Param('id') id: string) {
    return this.brandsService.findMenusByBrand(+id);
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 브랜드 정보 조회' }) // <-- Swagger 설명을 추가했습니다.
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id); // <-- 이제 이 코드가 정상 작동합니다.
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
