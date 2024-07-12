import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { MakeGetActivitiesUseCase } from "../../use-cases/factories/make-get-activities-use-case"

export async function getActivities(request: FastifyRequest, reply: FastifyReply) {
  const getActivitySchemaParams = z.object({
    tripId: z.string().uuid()
  })

  const { tripId } = getActivitySchemaParams.parse(request.params)

  const getActivitiesUseCase = MakeGetActivitiesUseCase()

  const activities = await getActivitiesUseCase.execute({
    tripId
  })

  return reply.status(201).send(activities)
}