import { Prisma, Producer } from "@prisma/client";
import { IProducerRepository } from "./interfaces/IProducerRepository";
import { prisma } from "@/lib/prisma";

export class ProducerRepository implements IProducerRepository {
  async getTotalGroupedByStates(): Promise<{ label: string; value: number }[]> {
    const result = await prisma.producer.groupBy({
      by: ["state"],
      _count: { state: true },
    });
    const total = result.reduce((acc, curr) => acc + curr._count.state, 0);
    return result.map((item) => ({
      label: item.state,
      value: total ? (item._count.state * 100) / total : 0,
    }));
  }
  async getTotalGroupedBySoil(): Promise<{ label: string; value: number }[]> {
    const result = await prisma.producer.aggregate({
      _sum: {
        farmUsableTotalArea: true,
        farmVegetationTotalArea: true,
      },
    });
    const usableSoil = result._sum.farmUsableTotalArea?.toNumber() ?? 0;
    const vegetationSoil = result._sum.farmVegetationTotalArea?.toNumber() ?? 0;
    const total = usableSoil + vegetationSoil;
    return [
      {
        label: "Agricultável",
        value: total ? (usableSoil * 100) / total : 0,
      },
      {
        label: "Vegetação",
        value: total ? (vegetationSoil * 100) / total : 0,
      },
    ];
  }
  async getTotalOfFarmAndArea(): Promise<{
    totalFarms: number;
    totalArea: number;
  }> {
    const totals = await prisma.producer.aggregate({
      _count: {
        id: true,
      },
      _sum: {
        farmTotalArea: true,
      },
    });

    return {
      totalFarms: totals._count.id,
      totalArea: totals._sum.farmTotalArea?.toNumber() ?? 0,
    };
  }

  async create(
    data: Prisma.ProducerCreateInput & { crops: number[] }
  ): Promise<Producer> {
    const { crops, ..._data } = data;
    const producer = await prisma.producer.create({
      data: {
        ..._data,
        crops: { connect: crops.map((id) => ({ id })) },
      },
    });

    return producer;
  }

  async update(
    id: string,
    data: Prisma.ProducerUpdateInput & { crops: number[] }
  ): Promise<Producer> {
    const { crops, ..._data } = data;
    const producer = await prisma.producer.update({
      where: { id },
      data: {
        ..._data,
        crops: { set: crops.map((id) => ({ id })) },
      },
    });

    return producer;
  }

  async findOneById(id: string): Promise<Producer | null> {
    const producer = await prisma.producer.findFirst({
      where: { id, deletedAt: null },
      include: {
        crops: true,
      },
    });
    return producer;
  }
  async findAll(page: number): Promise<{ pages: number; data: Producer[] }> {
    const take = 20;
    const skip = (page - 1) * take;
    const totalOfProducers = await prisma.producer.count();
    const producers = await prisma.producer.findMany({
      where: { deletedAt: null },
      include: {
        crops: true,
      },
      skip,
      take,
    });

    const pages = Math.ceil(totalOfProducers / take);

    return { pages, data: producers };
  }
  async delete(id: string): Promise<void> {
    await prisma.producer.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
