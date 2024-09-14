import { FastifyInstance } from "fastify";

import { create } from "./create";
import { remove } from "./remove";
import { getOne } from "./getOne";
import { fetch } from "./fetch";
import { update } from "./update";

export async function producerRoutes(app: FastifyInstance) {
  app.post("/producers", create);
  app.delete("/producers/:id", remove);
  app.get("/producers", fetch);
  app.get("/producers/:id", getOne);
  app.put("/producers/:id", update);
}
