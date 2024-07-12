import { FastifyInstance } from "fastify";
import { create } from "./create";
import { confirm } from "./confirm";
import { get } from "./get";
import { update } from "./update";

export async function tripsRoutes(app: FastifyInstance) {
  app.post('/trips', create)
  app.get('/trips/:tripId/confirm', confirm)
  app.get('/trips/:tripId', get)
  app.put('/trips/:tripId', update)
}