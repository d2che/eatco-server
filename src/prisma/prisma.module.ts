import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // <-- 이 모듈을 앱 전체에서 사용할 수 있는 공용 모듈로 만듭니다.
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 다른 모듈에서 PrismaService를 가져다 쓸 수 있도록 export 합니다.
})
export class PrismaModule {}
