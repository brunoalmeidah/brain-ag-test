import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { AppError } from "./useCases/errors/appError";
import { producerRoutes } from "./http/controllers/producers/routes";
import { cropRoutes } from "./http/controllers/crops/routes";
import { dashboardRoutes } from "./http/controllers/dashboard/routes";

export const app = fastify();

app.register(producerRoutes);
app.register(cropRoutes);
app.register(dashboardRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error." });
});
