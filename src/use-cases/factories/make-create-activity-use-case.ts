import { PrismaActivitiesRepositories } from "../../repositories/prisma/prisma-activities-repositories";
import { PrismaTripsRepositories } from "../../repositories/prisma/prisma-trips-repositories";
import { createActivityUseCase } from "../activities/create-activity-use-case";

export function MakeCreateActivityUseCase() {
  const activitiesRepositories = new PrismaActivitiesRepositories()
  const tripsRepositories = new PrismaTripsRepositories()
  const useCase = new createActivityUseCase(activitiesRepositories, tripsRepositories);

  return useCase;
}