-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "createAtProfile" TIMESTAMP(3),
ADD COLUMN     "updateAtProfile" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "createAtUsers" TIMESTAMP(3),
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "updateAtUsers" TIMESTAMP(3);
