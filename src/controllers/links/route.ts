import { FastifyInstance } from "fastify"
import { create } from "./create"
import { getLinks } from "./get-links"

export async function linksRoutes(app: FastifyInstance) {
  app.post('/trips/:tripId/links', create)
  app.get('/trips/:tripId/links', getLinks)
}