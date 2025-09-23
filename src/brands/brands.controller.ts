import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
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
  @ApiOperation({ summary: '새 브랜드 생성' })
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
  findMenusByBrand(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.findMenusByBrand(id);
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 브랜드 정보 조회' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '브랜드 정보 수정' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '브랜드 삭제' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.remove(id);
  }
}
