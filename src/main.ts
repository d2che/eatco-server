import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors(); // 모든 출처의 요청을 허용하도록 설정합니다. 흠 이게맞아?
  app.enableCors({
    // origin 배열에 허용할 주소를 모두 적어줍니다.
    origin: [
      'http://localhost:5173', // 로컬 프론트엔드 개발 서버 주소
      // 'https://<나중에-배포할-Vercel-주소>.vercel.app' // 나중에 Vercel 배포 후 주소를 추가하면 됩니다.
    ],
    credentials: true, // 쿠키 등을 주고받을 때 필요한 설정
  });
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
