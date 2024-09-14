import { Prisma, Producer } from "@prisma/client";

export interface IProducerRepository {
  create(
    data: Prisma.ProducerCreateInput & { crops: number[] }
  ): Promise<Producer>;
  update(
    id: string,
    data: Prisma.ProducerUpdateInput & { crops: number[] }
  ): Promise<Producer>;
  findOneById(id: string): Promise<Producer | null>;
  findAll(page: number): Promise<{ pages: number; data: Producer[] }>;
  delete(id: string): Promise<void>;
  getTotalOfFarmAndArea(): Promise<{ totalFarms: number; totalArea: number }>;
  getTotalGroupedByStates(): Promise<{ label: string; value: number }[]>;
  getTotalGroupedBySoil(): Promise<{ label: string; value: number }[]>;
}
