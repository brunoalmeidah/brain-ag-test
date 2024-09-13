-- CreateTable
CREATE TABLE "producers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "farmTotalArea" DECIMAL(65,30) NOT NULL,
    "farmUsableTotalArea" DECIMAL(65,30) NOT NULL,
    "farmVegetationTotalArea" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "producers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crops" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "crops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CropToProducer" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CropToProducer_AB_unique" ON "_CropToProducer"("A", "B");

-- CreateIndex
CREATE INDEX "_CropToProducer_B_index" ON "_CropToProducer"("B");

-- AddForeignKey
ALTER TABLE "_CropToProducer" ADD CONSTRAINT "_CropToProducer_A_fkey" FOREIGN KEY ("A") REFERENCES "crops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CropToProducer" ADD CONSTRAINT "_CropToProducer_B_fkey" FOREIGN KEY ("B") REFERENCES "producers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
