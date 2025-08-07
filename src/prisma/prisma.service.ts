import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // NestJS 앱이 시작될 때 Prisma도 데이터베이스에 연결합니다.
    await this.$connect();
  }
}
