/*
  Warnings:

  - You are about to drop the column `downloadLink` on the `historials` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `historials` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `historials` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the `groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "historials" DROP CONSTRAINT "historials_groupId_fkey";

-- DropForeignKey
ALTER TABLE "historials" DROP CONSTRAINT "historials_userId_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_groupId_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_userId_fkey";

-- DropIndex
DROP INDEX "historials_userId_groupId_idx";

-- AlterTable
ALTER TABLE "historials" DROP COLUMN "downloadLink",
DROP COLUMN "userId",
ADD COLUMN     "groupName" VARCHAR(50),
ADD COLUMN     "userName" VARCHAR(50),
ALTER COLUMN "groupId" DROP NOT NULL,
ALTER COLUMN "groupId" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "status" SET DATA TYPE VARCHAR(50);

-- DropTable
DROP TABLE "groups";

-- DropTable
DROP TABLE "members";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "reports" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "description" TEXT,
    "historialId" INTEGER NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_historialId_fkey" FOREIGN KEY ("historialId") REFERENCES "historials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
