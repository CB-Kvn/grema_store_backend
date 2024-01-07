/*
  Warnings:

  - Added the required column `genre` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "genre" TEXT NOT NULL;
