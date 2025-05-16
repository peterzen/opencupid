-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'non_binary', 'other', 'unspecified');

-- CreateEnum
CREATE TYPE "RelationshipStatus" AS ENUM ('single', 'in_relationship', 'married', 'other', 'unspecified');

-- CreateEnum
CREATE TYPE "ConnectionType" AS ENUM ('friends', 'relationship');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tokenVersion" INTEGER NOT NULL DEFAULT 0,
    "loginToken" TEXT,
    "loginTokenExp" TIMESTAMP(3),
    "isRegistrationConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "isAccountDisabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "searchPreferenceId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "publicName" TEXT,
    "intro" TEXT,
    "country" TEXT DEFAULT '',
    "city" TEXT DEFAULT '',
    "birthday" TIMESTAMP(3),
    "gender" "Gender" DEFAULT 'unspecified',
    "relationship" "RelationshipStatus" DEFAULT 'unspecified',
    "hasKids" BOOLEAN DEFAULT false,
    "lookingFor" "ConnectionType"[],
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isReported" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "primaryImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "profileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileTag" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ProfileTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchPreference" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "ageMin" INTEGER NOT NULL,
    "ageMax" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SearchPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_loginToken_key" ON "User"("loginToken");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_primaryImageId_key" ON "Profile"("primaryImageId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileTag_profileId_tagId_key" ON "ProfileTag"("profileId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "SearchPreference_profileId_key" ON "SearchPreference"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "SearchPreference_userId_key" ON "SearchPreference"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_primaryImageId_fkey" FOREIGN KEY ("primaryImageId") REFERENCES "ProfileImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileImage" ADD CONSTRAINT "ProfileImage_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileTag" ADD CONSTRAINT "ProfileTag_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileTag" ADD CONSTRAINT "ProfileTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchPreference" ADD CONSTRAINT "SearchPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
