import fastify from "fastify";
import cors from "@fastify/cors"
import { tripsRoutes } from "./controllers/trips/routes";
import { ZodError } from "zod";

export const app = fastify()

app.register(cors, {
  origin: '*'
})

app.register(tripsRoutes)

app.setErrorHandler((err, _, reply) => {
  if (err instanceof ZodError) {
    return reply
      .status(400)
      .send({
        message: "Validation error.", issues: err.format()
      })
  }

  return reply.status(500).send({
    message: "Internal server error."
  })
})