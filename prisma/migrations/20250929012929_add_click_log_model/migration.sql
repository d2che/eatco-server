-- CreateTable
CREATE TABLE "public"."ClickLog" (
    "id" SERIAL NOT NULL,
    "menuName" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "platformName" TEXT NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClickLog_pkey" PRIMARY KEY ("id")
);
