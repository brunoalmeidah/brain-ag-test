import { FastifyInstance } from "fastify";

import { fetch } from "./fetch";

export async function cropRoutes(app: FastifyInstance) {
  app.get("/crops", fetch);
}
