import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 포트를 동일한 로직으로 결정
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  // 결정된 포트 번호를 사용해 로그 출력
  Logger.log(`Application is running on: http://localhost:${port}`);
}
void bootstrap();
