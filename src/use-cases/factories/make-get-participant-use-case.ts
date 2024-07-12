import { PrismaParticipantsRepositories } from "../../repositories/prisma/prisma-participants-repositories";
import { getParticipantUseCase } from "../participants/get-participant-use-case";

export function MakeGetParticipantUseCase() {
  const participantsRepositories = new PrismaParticipantsRepositories()
  const useCase = new getParticipantUseCase(participantsRepositories);

  return useCase;
}