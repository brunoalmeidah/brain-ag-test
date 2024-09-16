import { Prisma, Producer } from "@prisma/client";
import { IProducerRepository } from "../interfaces/IProducerRepository";

export class InMemoryProducerRepository implements IProducerRepository {
  public producers: Producer[] = [];
  async getTotalGroupedByStates(): Promise<{ label: string; value: number }[]> {
    return [{ label: "São Paulo", value: 20 }];
  }
  async getTotalGroupedBySoil(): Promise<{ label: string; value: number }[]> {
    return [
      {
        label: "Agricultável",
        value: 70,
      },
      {
        label: "Vegetação",
        value: 30,
      },
    ];
  }
  async getTotalOfFarmAndArea(): Promise<{
    totalFarms: number;
    totalArea: number;
  }> {
    return {
      totalFarms: 20,
      totalArea: 20,
    };
  }

  async create(
    data: Prisma.ProducerCreateInput & { crops: number[] }
  ): Promise<Producer> {
    const producer = {
      id: `producer-${this.producers.length + 1}`,
      ...data,
      farmTotalArea: new Prisma.Decimal(Number(data.farmTotalArea)),
      farmUsableTotalArea: new Prisma.Decimal(Number(data.farmUsableTotalArea)),
      farmVegetationTotalArea: new Prisma.Decimal(
        Number(data.farmVegetationTotalArea)
      ),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    this.producers.push(producer);

    return producer;
  }

  async update(
    id: string,
    data: Prisma.ProducerUpdateInput & { crops: number[] }
  ): Promise<Producer> {
    const index = this.producers.findIndex((item) => item.id === id);
    const producer = {
      id,
      name: String(data.name),
      document: String(data.document),
      city: String(data.city),
      farmName: String(data.farmName),
      farmTotalArea: new Prisma.Decimal(Number(data.farmTotalArea)),
      farmUsableTotalArea: new Prisma.Decimal(Number(data.farmUsableTotalArea)),
      farmVegetationTotalArea: new Prisma.Decimal(
        Number(data.farmVegetationTotalArea)
      ),
      state: String(data.state),
      createdAt: this.producers[index].createdAt,
      updatedAt: new Date(),
      deletedAt: null,
    };
    this.producers[index] = producer;
    return producer;
  }

  async findOneById(id: string): Promise<Producer | null> {
    const producer = this.producers.find((item) => item.id === id);
    return producer ?? null;
  }
  async findAll(page: number): Promise<{ pages: number; data: Producer[] }> {
    const take = 20;
    const skip = (page - 1) * take;
    const totalOfProducers = this.producers.length;
    const producers = this.producers.slice(skip, skip + (take - 1));

    const pages = Math.ceil(totalOfProducers / take);

    return { pages, data: producers };
  }
  async delete(id: string): Promise<void> {
    const index = this.producers.findIndex((item) => item.id === id);
    this.producers.splice(index, 1);
  }
}
