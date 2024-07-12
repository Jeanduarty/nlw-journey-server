import { FastifyInstance } from "fastify"
import { create } from "./create"
import { getActivities } from "./get-activities"

export async function activitiesRoutes(app: FastifyInstance) {
  app.post('/trips/:tripId/activities', create)
  app.get('/trips/:tripId/activities', getActivities)
}