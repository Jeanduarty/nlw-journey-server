import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { MakeGetParticipantsUseCase } from "../../use-cases/factories/make-get-participants-use-case"

export async function getParticipants(request: FastifyRequest, reply: FastifyReply) {
  const getParticipantsSchemaParams = z.object({
    tripId: z.string().uuid()
  })

  const { tripId } = getParticipantsSchemaParams.parse(request.params)

  const getParticipantsUseCase = MakeGetParticipantsUseCase()

  const participants = await getParticipantsUseCase.execute({
    tripId
  })

  return reply.status(200).send(participants)
}