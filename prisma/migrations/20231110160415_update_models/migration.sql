/*
  Warnings:

  - You are about to drop the column `createAt` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createAtProfile" TIMESTAMP(3),
ADD COLUMN     "updateAtProfile" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createAtUsers" TIMESTAMP(3),
ADD COLUMN     "updateAtUsers" TIMESTAMP(3);
