import { PrismaParticipantsRepositories } from "../../repositories/prisma/prisma-participants-repositories";
import { PrismaTripsRepositories } from "../../repositories/prisma/prisma-trips-repositories";
import { createParticipantUseCase } from "../participants/create-participant-use-case";

export function MakeCreateParticipantUseCase() {
  const participantsRepositories = new PrismaParticipantsRepositories()
  const tripsRepositories = new PrismaTripsRepositories()
  const useCase = new createParticipantUseCase(participantsRepositories, tripsRepositories);

  return useCase;
}