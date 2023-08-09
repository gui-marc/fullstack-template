-- DropForeignKey
ALTER TABLE "AccountConfirmationToken" DROP CONSTRAINT "AccountConfirmationToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Password" DROP CONSTRAINT "Password_userId_fkey";

-- DropForeignKey
ALTER TABLE "PasswordRecoveryToken" DROP CONSTRAINT "PasswordRecoveryToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountConfirmationToken" ADD CONSTRAINT "AccountConfirmationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordRecoveryToken" ADD CONSTRAINT "PasswordRecoveryToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
