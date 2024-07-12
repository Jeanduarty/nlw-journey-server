import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeUpdateTripUseCase } from "../../use-cases/factories/make-update-trip-use-case";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateTripSchemaParams = z.object({
    tripId: z.string().uuid()
  })

  const updateTripSchemaBody = z.object({
    destination: z.string().min(4),
    starts_at: z.coerce.date(),
    ends_at: z.coerce.date(),
  })

  const { tripId } = updateTripSchemaParams.parse(request.params)

  const { destination, ends_at, starts_at } = updateTripSchemaBody.parse(request.body)

  const updateTripUseCase = MakeUpdateTripUseCase()

  const trip = await updateTripUseCase.execute({
    tripId,
    destination,
    startsAt: starts_at,
    endsAt: ends_at,
  })

  return reply.status(200).send(trip)
}