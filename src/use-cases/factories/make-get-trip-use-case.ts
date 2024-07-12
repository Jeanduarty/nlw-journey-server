import { PrismaTripsRepositories } from "../../repositories/prisma/prisma-trips-repositories";
import { getTripUseCase } from "../trips/get-trip-use-case";

export function MakeGetTripUseCase() {
  const tripsRepositories = new PrismaTripsRepositories()
  const useCase = new getTripUseCase(tripsRepositories);

  return useCase;
}