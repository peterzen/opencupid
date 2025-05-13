/*
  Warnings:

  - You are about to drop the column `goal` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[resetToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `relationship` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Made the column `hasKids` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'non_binary', 'other');

-- CreateEnum
CREATE TYPE "RelationshipStatus" AS ENUM ('single', 'in_relationship', 'married', 'other');

-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('friends', 'relationship');

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "goal",
DROP COLUMN "location",
DROP COLUMN "status",
DROP COLUMN "tags",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "interestTags" TEXT[],
ADD COLUMN     "relationship" "RelationshipStatus" NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL,
ALTER COLUMN "hasKids" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExp" TIMESTAMP(3);

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "SearchPreference" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "ageMin" INTEGER NOT NULL,
    "ageMax" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "goal" "Goal" NOT NULL,

    CONSTRAINT "SearchPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchPreference_profileId_key" ON "SearchPreference"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");

-- AddForeignKey
ALTER TABLE "SearchPreference" ADD CONSTRAINT "SearchPreference_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
