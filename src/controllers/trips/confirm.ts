import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { MakeConfirmTripUseCase } from "../../use-cases/factories/make-confirm-trip-use-case"

export async function confirm(request: FastifyRequest, reply: FastifyReply) {
  const confirmTripSchemaParams = z.object({
    tripId: z.string().uuid()
  })

  const { tripId } = confirmTripSchemaParams.parse(request.params)

  const createTripUseCase = MakeConfirmTripUseCase()

  await createTripUseCase.execute({
    tripId
  })

  return reply.status(200).send({
    message: "Confirmed trip!"
  })
}