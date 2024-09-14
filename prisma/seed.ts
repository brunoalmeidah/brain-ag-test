import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.crop.createMany({
    data: [
      { id: 1, description: "Soja" },
      { id: 2, description: "Milho" },
      { id: 3, description: "Algodão" },
      { id: 4, description: "Café" },
      { id: 5, description: "Cana de Açucar" },
    ],
  });

  await prisma.producer.create({
    data: {
      id: "a68adfca-b48a-4124-8e8b-d54131fee221",
      name: "fazendeiro 1",
      farmName: "fazenda 1",
      document: "455.548.250-60",
      city: "Cidade",
      state: "São Paulo",
      farmTotalArea: 2000,
      farmUsableTotalArea: 1500,
      farmVegetationTotalArea: 500,
      crops: { connect: [{ id: 1 }, { id: 2 }] },
    },
  });

  await prisma.producer.create({
    data: {
      id: "a68adfca-b48a-4124-8e8b-d54131fee222",
      name: "fazendeiro 2",
      farmName: "fazenda 2",
      document: "270.412.060-92",
      city: "Cidade",
      state: "Minas gerais",
      farmTotalArea: 2000,
      farmUsableTotalArea: 1500,
      farmVegetationTotalArea: 500,
      crops: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }] },
    },
  });

  await prisma.producer.create({
    data: {
      id: "a68adfca-b48a-4124-8e8b-d54131fee223",
      name: "fazendeiro 3",
      farmName: "fazenda 3",
      document: "29.727.819/0001-37",
      city: "Cidade",
      state: "São Paulo",
      farmTotalArea: 2000,
      farmUsableTotalArea: 1500,
      farmVegetationTotalArea: 500,
      crops: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }] },
    },
  });

  await prisma.producer.create({
    data: {
      name: "fazendeiro 4",
      id: "a68adfca-b48a-4124-8e8b-d54131fee427",
      farmName: "fazenda 4",
      document: "178.636.190-68",
      city: "Cidade",
      state: "São Paulo",
      farmTotalArea: 2000,
      farmUsableTotalArea: 1500,
      farmVegetationTotalArea: 500,
      crops: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] },
    },
  });

  await prisma.producer.create({
    data: {
      id: "a68adfca-b48a-4124-8e8b-d54131fee252",
      name: "fazendeiro 5",
      farmName: "fazenda 5",
      document: "97.781.093/0001-70",
      city: "Cidade",
      state: "Rio de Janeiro",
      farmTotalArea: 2000,
      farmUsableTotalArea: 1500,
      farmVegetationTotalArea: 500,
      crops: { connect: [{ id: 1 }, { id: 3 }, { id: 4 }] },
    },
  });

  await prisma.producer.create({
    data: {
      id: "a68adfca-b48a-4124-8e8b-d54131fee266",
      name: "fazendeiro 6",
      farmName: "fazenda 6",
      document: "25.308.671/0001-45",
      city: "Cidade",
      state: "Minas gerais",
      farmTotalArea: 2000,
      farmUsableTotalArea: 1500,
      farmVegetationTotalArea: 500,
      crops: { connect: [{ id: 2 }, { id: 3 }, { id: 5 }] },
    },
  });

  await prisma.producer.create({
    data: {
      id: "a68adfca-b48a-4124-8e8b-d54131fee270",
      name: "fazendeiro 7",
      farmName: "fazenda 7",
      document: "07.652.359/0001-92",
      city: "Cidade",
      state: "São Paulo",
      farmTotalArea: 2000,
      farmUsableTotalArea: 1500,
      farmVegetationTotalArea: 500,
      crops: { connect: [{ id: 2 }, { id: 3 }, { id: 5 }] },
    },
  });

  await prisma.producer.create({
    data: {
      id: "a68adfca-b48a-4124-8e8b-d54131fee280",
      name: "fazendeiro 8",
      farmName: "fazenda 8",
      document: "21.254.962/0001-47",
      city: "Cidade",
      state: "São Paulo",
      farmTotalArea: 2000,
      farmUsableTotalArea: 1500,
      farmVegetationTotalArea: 500,
      crops: { connect: [{ id: 2 }, { id: 3 }, { id: 5 }] },
    },
  });

  await prisma.producer.create({
    data: {
      id: "a68adfca-b48a-4124-8e8b-d54131fee907",
      name: "fazendeiro 9",
      farmName: "fazenda 9",
      document: "78.388.070/0001-56",
      city: "Cidade",
      state: "Minas gerais",
      farmTotalArea: 2000,
      farmUsableTotalArea: 1500,
      farmVegetationTotalArea: 500,
      crops: { connect: [{ id: 2 }, { id: 3 }, { id: 4 }] },
    },
  });

  await prisma.producer.create({
    data: {
      id: "a68adfca-b48a-4124-8e8b-d54131fee227",
      name: "fazendeiro 10",
      farmName: "fazenda 10",
      document: "66.065.812/0001-23",
      city: "Cidade",
      state: "Minas gerais",
      farmTotalArea: 2000,
      farmUsableTotalArea: 1500,
      farmVegetationTotalArea: 500,
      crops: { connect: [{ id: 2 }, { id: 3 }, { id: 1 }] },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
