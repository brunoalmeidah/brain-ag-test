import { makeFetchCropsUseCase } from "@/useCases/factories/makeFetchCropsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchCropUseCase = makeFetchCropsUseCase();

  const crops = await fetchCropUseCase.execute();

  return reply.status(200).send(crops);
}
