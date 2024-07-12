import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeGetParticipantUseCase } from "../../use-cases/factories/make-get-participant-use-case";

export async function getParticipant(request: FastifyRequest, reply: FastifyReply) {
  const getParticipantSchemaParams = z.object({
    participantId: z.string().uuid()
  })

  const { participantId } = getParticipantSchemaParams.parse(request.params)

  const getParticipantUseCase = MakeGetParticipantUseCase()

  const participant = await getParticipantUseCase.execute({
    participantId
  })

  return reply.status(200).send(participant)
}