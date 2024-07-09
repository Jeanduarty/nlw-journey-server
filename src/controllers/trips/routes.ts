import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function tripsRoutes(app: FastifyInstance) {
  app.post('/trips', create);
}