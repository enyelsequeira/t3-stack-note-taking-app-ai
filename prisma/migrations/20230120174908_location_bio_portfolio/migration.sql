/*
  Warnings:

  - You are about to drop the column `profleUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profleUrl",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "portfolio" TEXT,
ADD COLUMN     "profileUrl" TEXT;
