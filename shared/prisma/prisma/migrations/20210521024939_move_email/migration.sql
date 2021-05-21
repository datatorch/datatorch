/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `ProjectOwner` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ProjectOwner` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `ProjectOwner` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `ProjectOwner` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `ProjectOwner` table. All the data in the column will be lost.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nsfw` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectOwnerId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ProjectOwner` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectOwnerType" AS ENUM ('USER', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "ProjectVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_ownerId_fkey";

-- DropIndex
DROP INDEX "ProjectOwner.email_unique";

-- DropIndex
DROP INDEX "ProjectOwner.login_unique";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "ownerId",
ADD COLUMN     "about" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "nsfw" BOOLEAN NOT NULL,
ADD COLUMN     "projectOwnerId" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "visibility" "ProjectVisibility" NOT NULL DEFAULT E'PRIVATE';

-- AlterTable
ALTER TABLE "ProjectOwner" DROP COLUMN "avatarUrl",
DROP COLUMN "description",
DROP COLUMN "email",
DROP COLUMN "location",
DROP COLUMN "login",
ADD COLUMN     "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'USER',
ADD COLUMN     "type" "ProjectOwnerType" NOT NULL;

-- CreateTable
CREATE TABLE "UserCredentials" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "projectOwnerId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "projectOwnerId" TEXT NOT NULL,
    "publicEmail" TEXT,
    "company" TEXT,
    "avatarUrl" TEXT,
    "websiteUrl" TEXT,
    "description" TEXT,
    "location" TEXT,
    "githubId" TEXT,
    "facebookId" TEXT,
    "twitterId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectRole" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectOwnerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastAccessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCredentials.email_unique" ON "UserCredentials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserCredentials.login_unique" ON "UserCredentials"("login");

-- CreateIndex
CREATE UNIQUE INDEX "UserCredentials_projectOwnerId_unique" ON "UserCredentials"("projectOwnerId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_projectOwnerId_unique" ON "Profile"("projectOwnerId");

-- AddForeignKey
ALTER TABLE "Profile" ADD FOREIGN KEY ("projectOwnerId") REFERENCES "ProjectOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCredentials" ADD FOREIGN KEY ("projectOwnerId") REFERENCES "ProjectOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD FOREIGN KEY ("projectOwnerId") REFERENCES "ProjectOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRole" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("projectOwnerId") REFERENCES "ProjectOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
