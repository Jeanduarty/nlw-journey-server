import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeCreateTripUseCase } from "../../use-cases/factories/make-create-trip-use-case";

export function create(request: FastifyRequest, reply: FastifyReply) {
  const createTripSchemaBody = z.object({
    destination: z.string().min(4),
    starts_at: z.coerce.date(),
    ends_at: z.coerce.date(),
    owner_name: z.string(),
    owner_email: z.string().email()
  }).transform((body) => ({
    ownerName: body.owner_name,
    ownerEmail: body.owner_email,
    startsAt: body.starts_at,
    endsAt: body.ends_at,
    ...body
  }))

  const { destination, endsAt, startsAt, ownerName, ownerEmail } = createTripSchemaBody.parse(request.body)

  const createTripUseCase = MakeCreateTripUseCase()

  const trip = createTripUseCase.execute({
    destination,
    startsAt,
    endsAt,
    ownerName,
    ownerEmail
  })

  return reply.status(201).send({
    trip
  })
}