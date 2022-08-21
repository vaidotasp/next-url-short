/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[originalUrl]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Url_userId_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email";

-- CreateIndex
CREATE UNIQUE INDEX "Url_originalUrl_key" ON "Url"("originalUrl");
