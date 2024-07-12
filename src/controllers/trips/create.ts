import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeCreateTripUseCase } from "../../use-cases/factories/make-create-trip-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTripSchemaBody = z.object({
    destination: z.string().min(4),
    starts_at: z.coerce.date(),
    ends_at: z.coerce.date(),
    owner_name: z.string(),
    owner_email: z.string().email(),
    emails_to_invite: z.array(z.string().email()),
  })

  const { destination, ends_at, starts_at, owner_name, owner_email, emails_to_invite } = createTripSchemaBody.parse(request.body)

  const createTripUseCase = MakeCreateTripUseCase()

  const trip = await createTripUseCase.execute({
    destination,
    startsAt: starts_at,
    endsAt: ends_at,
    ownerName: owner_name,
    ownerEmail: owner_email,
    emailsToInvite: emails_to_invite
  })

  return reply.status(201).send(trip)
}