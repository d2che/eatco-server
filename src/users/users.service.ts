import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  // 생성자에서 PrismaService를 주입받습니다.
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    // 주입받은 prisma 객체로 데이터베이스 작업을 수행합니다.
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  // ... 기타 등등 (resource 명령어로 자동 생성된 나머지 코드는 그대로 두세요)
}
