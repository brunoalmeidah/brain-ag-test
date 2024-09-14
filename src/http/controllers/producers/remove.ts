import { makeRemoveProducerUseCase } from "@/useCases/factories/makeRemoveProducerUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const deleteSchema = z.object({
    id: z.string(),
  });

  const data = deleteSchema.parse(request.params);
  const removeProducerUseCase = makeRemoveProducerUseCase();

  await removeProducerUseCase.execute(data);

  return reply.status(204).send();
}
