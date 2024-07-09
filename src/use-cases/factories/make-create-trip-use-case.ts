import { PrismaTripsRepositories } from "../../repositories/prisma/prisma-trips-repositories";
import { CreateTripUseCase } from "../trips/create-trip--use-case";

export function MakeCreateTripUseCase() {
  const repository = new PrismaTripsRepositories()
  const useCase = new CreateTripUseCase(repository);

  return useCase;
}