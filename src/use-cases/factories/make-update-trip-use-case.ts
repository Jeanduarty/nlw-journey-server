import { PrismaTripsRepositories } from "../../repositories/prisma/prisma-trips-repositories";
import { updateTripUseCase } from "../trips/update-trip-use-case";

export function MakeUpdateTripUseCase() {
  const tripsRepositories = new PrismaTripsRepositories()
  const useCase = new updateTripUseCase(tripsRepositories);

  return useCase;
}