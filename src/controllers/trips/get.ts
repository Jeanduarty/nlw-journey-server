import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { MakeGetTripUseCase } from "../../use-cases/factories/make-get-trip-use-case"

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getTripSchemaParams = z.object({
    tripId: z.string().uuid()
  })

  const { tripId } = getTripSchemaParams.parse(request.params)

  const getTripUseCase = MakeGetTripUseCase()

  const trip = await getTripUseCase.execute({
    tripId
  })

  return reply.status(200).send(trip)
}