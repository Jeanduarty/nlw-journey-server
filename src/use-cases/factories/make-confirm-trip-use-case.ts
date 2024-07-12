import { PrismaParticipantsRepositories } from "../../repositories/prisma/prisma-participants-repositories";
import { PrismaTripsRepositories } from "../../repositories/prisma/prisma-trips-repositories";
import { confirmTripUseCase } from "../trips/confirm-trip-use-case";

export function MakeConfirmTripUseCase() {
  const tripsRepositories = new PrismaTripsRepositories()
  const participantsRepositories = new PrismaParticipantsRepositories() 
  const useCase = new confirmTripUseCase(tripsRepositories, participantsRepositories);

  return useCase;
}