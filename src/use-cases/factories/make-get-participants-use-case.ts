import { PrismaParticipantsRepositories } from "../../repositories/prisma/prisma-participants-repositories";
import { getParticipantsUseCase } from "../participants/get-participants-use-case";

export function MakeGetParticipantsUseCase() {
  const participantsRepositories = new PrismaParticipantsRepositories()
  const useCase = new getParticipantsUseCase(participantsRepositories);

  return useCase;
}