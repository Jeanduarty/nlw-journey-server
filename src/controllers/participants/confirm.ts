import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod";
import { MakeConfirmParticipantUseCase } from "../../use-cases/factories/make-confirm-participant-use-case";

export async function confirm(request: FastifyRequest, reply: FastifyReply) {
  const confirmParticipantSchemaParams = z.object({
    participantId: z.string().uuid()
  })

  const { participantId } = confirmParticipantSchemaParams.parse(request.params)

  const confirmParticipantUseCase = MakeConfirmParticipantUseCase()

  await confirmParticipantUseCase.execute({
    participantId
  })

  return reply.status(200).send({
    message: "Confirmed participant."
  })
}