import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModule } from './main/main.module';
import { BrandsModule } from './brands/brands.module';
import { MenusModule } from './menus/menus.module';
import { PrismaModule } from './prisma/prisma.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [PrismaModule, MainModule, BrandsModule, MenusModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
