import { PrismaActivitiesRepositories } from "../../repositories/prisma/prisma-activities-repositories";
import { PrismaTripsRepositories } from "../../repositories/prisma/prisma-trips-repositories";
import { getActivitiesUseCase } from "../activities/get-activities-use-case";

export function MakeGetActivitiesUseCase() {
  const activitiesRepositories = new PrismaActivitiesRepositories()
  const tripsRepositories = new PrismaTripsRepositories()
  const useCase = new getActivitiesUseCase(activitiesRepositories, tripsRepositories);

  return useCase;
}