import { FastifyInstance } from "fastify";
import { confirm } from "./confirm";
import { create } from "./create";
import { getParticipant } from "./get-participant";
import { getParticipants } from "./get-participants";

export async function participantsRoutes(app: FastifyInstance) {
  app.get('/participants/:participantId/confirm', confirm);
  app.get('/participants/:participantId', getParticipant);
  app.get('/trips/:tripId/participants', getParticipants);
  app.post('/trips/:tripId/participant', create);
}