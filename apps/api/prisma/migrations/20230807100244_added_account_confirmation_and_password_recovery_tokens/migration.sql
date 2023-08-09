/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "confirmedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "AccountConfirmationToken" (
    "userId" INTEGER NOT NULL,
    "hashedToken" TEXT NOT NULL,

    CONSTRAINT "AccountConfirmationToken_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "PasswordRecoveryToken" (
    "userId" INTEGER NOT NULL,
    "hashedToken" TEXT NOT NULL,

    CONSTRAINT "PasswordRecoveryToken_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountConfirmationToken_hashedToken_key" ON "AccountConfirmationToken"("hashedToken");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordRecoveryToken_hashedToken_key" ON "PasswordRecoveryToken"("hashedToken");

-- AddForeignKey
ALTER TABLE "AccountConfirmationToken" ADD CONSTRAINT "AccountConfirmationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordRecoveryToken" ADD CONSTRAINT "PasswordRecoveryToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
