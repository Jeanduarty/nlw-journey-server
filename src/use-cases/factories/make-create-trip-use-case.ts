import { PrismaParticipantsRepositories } from "../../repositories/prisma/prisma-participants-repositories";
import { PrismaTripsRepositories } from "../../repositories/prisma/prisma-trips-repositories";
import { createTripUseCase } from "../trips/create-trip-use-case";

export function MakeCreateTripUseCase() {
  const tripsRepositories = new PrismaTripsRepositories()
  const participantsRepositories = new PrismaParticipantsRepositories() 
  const useCase = new createTripUseCase(tripsRepositories, participantsRepositories);

  return useCase;
}