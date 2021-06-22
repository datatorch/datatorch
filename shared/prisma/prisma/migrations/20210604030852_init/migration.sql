-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERUSER', 'ADMIN', 'MODERATOR', 'USER', 'ANNOTATOR', 'GUEST');

-- CreateEnum
CREATE TYPE "ProjectOwnerType" AS ENUM ('USER', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "ProjectVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "ProjectOwner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "type" "ProjectOwnerType" NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCredentials" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
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
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "projectOwnerId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL DEFAULT E'',
    "description" TEXT NOT NULL DEFAULT E'',
    "visibility" "ProjectVisibility" NOT NULL DEFAULT E'PRIVATE',
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "avatarUrl" TEXT,
    "nsfw" BOOLEAN NOT NULL,

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
CREATE UNIQUE INDEX "UserCredentials.projectOwnerId_unique" ON "UserCredentials"("projectOwnerId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile.projectOwnerId_unique" ON "Profile"("projectOwnerId");

-- AddForeignKey
ALTER TABLE "UserCredentials" ADD FOREIGN KEY ("projectOwnerId") REFERENCES "ProjectOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD FOREIGN KEY ("projectOwnerId") REFERENCES "ProjectOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("projectOwnerId") REFERENCES "ProjectOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRole" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD FOREIGN KEY ("projectOwnerId") REFERENCES "ProjectOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
