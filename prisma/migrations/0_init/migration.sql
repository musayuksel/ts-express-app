-- CreateTable
CREATE TABLE "Channels" (
    "id" SERIAL NOT NULL,
    "channelName" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "timeStamp" TIMESTAMPTZ(6) NOT NULL,
    "attachment" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UserId" INTEGER NOT NULL,
    "ChannelId" INTEGER NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserChannel" (
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "ChannelId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,

    CONSTRAINT "UserChannel_pkey" PRIMARY KEY ("ChannelId","UserId")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "userName" VARCHAR(255) NOT NULL,
    "userEmail" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channels_channelName_key" ON "Channels"("channelName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userName_key" ON "Users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userEmail_key" ON "Users"("userEmail");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_ChannelId_fkey" FOREIGN KEY ("ChannelId") REFERENCES "Channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChannel" ADD CONSTRAINT "UserChannel_ChannelId_fkey" FOREIGN KEY ("ChannelId") REFERENCES "Channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChannel" ADD CONSTRAINT "UserChannel_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

