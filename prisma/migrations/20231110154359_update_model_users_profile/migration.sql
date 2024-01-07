-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "createAt" TIMESTAMP(3),
ADD COLUMN     "updateAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "createAt" TIMESTAMP(3),
ADD COLUMN     "updateAt" TIMESTAMP(3);
