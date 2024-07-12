import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { MakeGetLinksUseCase } from "../../use-cases/factories/make-get-links-use-case"

export async function getLinks(request: FastifyRequest, reply: FastifyReply) {
  const getLinksSchemaParams = z.object({
    tripId: z.string().uuid()
  })

  const { tripId } = getLinksSchemaParams.parse(request.params)

  const getLinksUseCase = MakeGetLinksUseCase()

  const links = await getLinksUseCase.execute({
    tripId
  })

  return reply.status(200).send(links)
}