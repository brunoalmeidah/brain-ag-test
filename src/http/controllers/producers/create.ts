import { makeCreateProducerUseCase } from "@/useCases/factories/makeCreateProducerUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
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

  const data = createSchema.parse(request.body);
  const createProducerUseCase = makeCreateProducerUseCase();

  const producer = await createProducerUseCase.execute(data);

  return reply.status(201).send(producer);
}
