import { FastifyInstance } from "fastify";
import { getMetrics } from "./getMetrics";

export async function dashboardRoutes(app: FastifyInstance) {
  app.get("/dashboard/metrics", getMetrics);
}
