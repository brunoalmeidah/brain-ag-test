import { makeFetchProducersUseCase } from "@/useCases/factories/makeFetchProducersUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const deleteSchema = z.object({
    page: z.coerce.number(),
  });

  const data = deleteSchema.parse(request.query);
  const fetchProducerUseCase = makeFetchProducersUseCase();

  const producers = await fetchProducerUseCase.execute(data);

  return reply.status(200).send(producers);
}
