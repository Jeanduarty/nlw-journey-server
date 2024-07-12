import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod";
import { MakeCreateParticipantUseCase } from "../../use-cases/factories/make-create-participant-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createParticipantSchemaParams = z.object({
    tripId: z.string().uuid()
  })

  const createParticipantSchemaBody = z.object({
    email: z.string().email()
  })

  const { tripId } = createParticipantSchemaParams.parse(request.params)

  const { email } = createParticipantSchemaBody.parse(request.body)

  const createParticipantUseCase = MakeCreateParticipantUseCase()

  const participant = await createParticipantUseCase.execute({
    tripId,
    email
  })

  return reply.status(201).send(participant)
}