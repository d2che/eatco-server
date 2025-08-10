import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 문서 설정
  const config = new DocumentBuilder()
    .setTitle('Eatco API')
    .setDescription('Eatco 서비스의 API 문서입니다.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 포트를 동일한 로직으로 결정
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  // 결정된 포트 번호를 사용해 로그 출력
  Logger.log(`Application is running on: http://localhost:${port}`);
  Logger.log(`Swagger Docs available at: http://localhost:${port}/api`);
}
void bootstrap();
