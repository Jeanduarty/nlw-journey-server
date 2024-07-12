import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { MakeCreateActivityUseCase } from "../../use-cases/factories/make-create-activity-use-case"

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createActivitySchemaParams = z.object({
    tripId: z.string().uuid()
  })

  const createActivitySchemaBody = z.object({
    title: z.string().min(4),
    occur_at: z.coerce.date()
  })

  const { tripId } = createActivitySchemaParams.parse(request.params)

  const { title, occur_at } = createActivitySchemaBody.parse(request.body)

  const createActivityUseCase = MakeCreateActivityUseCase()

  const activity = await createActivityUseCase.execute({
    tripId,
    title,
    occursAt: occur_at
  })

  return reply.status(201).send(activity)
}