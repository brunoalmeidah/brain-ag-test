import { Crop } from "@prisma/client";
import { ICropRepository } from "./interfaces/ICropRepository";
import { prisma } from "@/lib/prisma";

export class CropRepository implements ICropRepository {
  async getGroupedByCrop(): Promise<{ label: string; value: number }[]> {
    const result = await prisma.$queryRaw<{ label: string; value: number }[]>`
      select 
        c.description as label,
        count(c.id) as value
      from 
        crops c 
        inner join "_CropToProducer" ctp on ctp."A" = c.id 
        inner join producers p on ctp."B" = p.id 
      group by c.id 
    `;

    const total = result.reduce((acc, curr) => acc + Number(curr.value), 0);

    return result.map((item) => ({
      ...item,
      value: total ? (Number(item.value) * 100) / total : 0,
    }));
  }

  async findAll(): Promise<Crop[]> {
    const crops = await prisma.crop.findMany();
    return crops;
  }
}
