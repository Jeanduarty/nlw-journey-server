import { PrismaParticipantsRepositories } from "../../repositories/prisma/prisma-participants-repositories";
import { confirmParticipant } from "../participants/confirm-participant-use-case";

export function MakeConfirmParticipantUseCase() {
  const participantsRepositories = new PrismaParticipantsRepositories()
  const useCase = new confirmParticipant(participantsRepositories);

  return useCase;
}