import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { MakeCreateLinkUseCase } from "../../use-cases/factories/make-create-link-use-case"

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createLinkSchemaParams = z.object({
    tripId: z.string().uuid()
  })

  const createLinkSchemaBody = z.object({
    title: z.string().min(4),
    url: z.string().url()
  })

  const { tripId } = createLinkSchemaParams.parse(request.params)

  const { title, url } = createLinkSchemaBody.parse(request.body)

  const createLinkUseCase = MakeCreateLinkUseCase()

  const link = await createLinkUseCase.execute({
    tripId,
    title,
    url
  })

  return reply.status(201).send(link)
}