import { makeGetDashboardMetricsUseCase } from "@/useCases/factories/makeGetDashboardMetricsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getMetrics(request: FastifyRequest, reply: FastifyReply) {
  const getDashboardMetricsUseCase = makeGetDashboardMetricsUseCase();

  const metrics = await getDashboardMetricsUseCase.execute();

  return reply.status(200).send(metrics);
}
