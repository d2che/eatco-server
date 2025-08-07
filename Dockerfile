# 1단계: 빌드용 이미지 (Node.js 18-alpine 버전 사용)
FROM node:18-alpine AS builder

# 작업 디렉터리 설정
WORKDIR /usr/src/app

# package.json과 package-lock.json을 먼저 복사
COPY package*.json ./

# 의존성 패키지 설치
RUN npm install

# 나머지 소스 코드를 모두 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 2단계: 실제 실행용 이미지 (더 가벼운 이미지 사용)
FROM node:18-alpine

# 빌드 단계와 동일한 작업 디렉터리 설정
WORKDIR /usr/src/app

# 빌드 단계에서 생성된 결과물만 복사
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/prisma ./prisma

# 프로덕션 환경에 맞게 Prisma 클라이언트 다시 생성
RUN npx prisma generate

# 3000번 포트 개방
EXPOSE 3000

# 컨테이너가 시작될 때 실행할 명령어
CMD ["node", "dist/main"]