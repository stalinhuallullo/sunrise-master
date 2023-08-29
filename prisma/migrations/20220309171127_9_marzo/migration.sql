/*
  Warnings:

  - You are about to drop the `historals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "historals" DROP CONSTRAINT "historals_groupId_fkey";

-- DropForeignKey
ALTER TABLE "historals" DROP CONSTRAINT "historals_userId_fkey";

-- DropTable
DROP TABLE "historals";

-- CreateTable
CREATE TABLE "historials" (
    "id" SERIAL NOT NULL,
    "filename" VARCHAR(255),
    "filenameOrigin" VARCHAR(255),
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL,
    "downloadLink" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "historials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "historials_userId_groupId_idx" ON "historials"("userId", "groupId");

-- AddForeignKey
ALTER TABLE "historials" ADD CONSTRAINT "historials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historials" ADD CONSTRAINT "historials_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
