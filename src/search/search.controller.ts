import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Search')
@Controller('search')
// ▼▼▼▼▼ 이 클래스 이름이 'SearchController'가 맞는지 확인해주세요 ▼▼▼▼▼
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: '브랜드 및 메뉴 검색' })
  @ApiQuery({
    name: 'query',
    required: true,
    description: '검색할 키워드',
    type: String,
  })
  search(@Query('query') query: string) {
    return this.searchService.searchBrands(query);
  }
}
