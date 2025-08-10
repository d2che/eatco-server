import { Controller, Get } from '@nestjs/common';
import { MainService } from './main.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Main')
@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get()
  @ApiOperation({ summary: '메인 페이지 데이터 조회' })
  getMainPageData() {
    return this.mainService.getMainPageData();
  }
}
