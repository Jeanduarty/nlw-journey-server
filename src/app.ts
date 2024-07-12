import cors from "@fastify/cors";
import fastify from "fastify";
import { tripsRoutes } from "./controllers/trips/routes";
import { errorHandler } from "./error-handler";
import { participantsRoutes } from "./controllers/participants/routes";
import { linksRoutes } from "./controllers/links/route";
import { activitiesRoutes } from "./controllers/activities/routes";

export const app = fastify()

app.register(cors, {
  origin: '*'
})

app.setErrorHandler(errorHandler)

app.register(tripsRoutes)
app.register(participantsRoutes)
app.register(linksRoutes)
app.register(activitiesRoutes)