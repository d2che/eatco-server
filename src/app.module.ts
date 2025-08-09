import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { MainModule } from './main/main.module';
import { BrandsModule } from './brands/brands.module';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [MainModule, BrandsModule, MenusModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}