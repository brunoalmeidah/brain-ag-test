import { makeGetProducerUseCase } from "@/useCases/factories/makeGetProducerUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getOne(request: FastifyRequest, reply: FastifyReply) {
  const deleteSchema = z.object({
    id: z.string(),
  });

  const data = deleteSchema.parse(request.params);
  const getProducerUseCase = makeGetProducerUseCase();

  const producer = await getProducerUseCase.execute(data);

  return reply.status(200).send(producer);
}
