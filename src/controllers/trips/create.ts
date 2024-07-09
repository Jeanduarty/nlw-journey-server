import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeCreateTripUseCase } from "../../use-cases/factories/make-create-trip-use-case";

export function create(request: FastifyRequest, reply: FastifyReply) {
  const createTripSchemaBody = z.object({
    destination: z.string().min(4),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date(),
  })

  const { destination, endsAt, startsAt } = createTripSchemaBody.parse(request.body)

  const createTripUseCase = MakeCreateTripUseCase()

  const trip = createTripUseCase.execute({
    destination,
    startsAt,
    endsAt
  })

  return reply.status(201).send({
    trip
  })
}