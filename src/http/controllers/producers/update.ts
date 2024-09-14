import { makeUpdateProducerUseCase } from "@/useCases/factories/makeUpdateProducerUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string(),
  });
  const updateSchema = z.object({
    name: z.string(),
    farmName: z.string(),
    document: z.string(),
    city: z.string(),
    state: z.string(),
    farmTotalArea: z.number(),
    farmUsableTotalArea: z.number(),
    farmVegetationTotalArea: z.number(),
    crops: z.number().array(),
  });
  const { id } = paramsSchema.parse(request.params);
  const data = updateSchema.parse(request.body);
  const updateProducerUseCase = makeUpdateProducerUseCase();

  const producer = await updateProducerUseCase.execute(id, data);

  return reply.status(200).send(producer);
}
