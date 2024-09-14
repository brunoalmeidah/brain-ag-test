import { Crop } from "@prisma/client";

export interface ICropRepository {
  findAll(): Promise<Crop[]>;
  getGroupedByCrop(): Promise<{ label: string; value: number }[]>;
}
