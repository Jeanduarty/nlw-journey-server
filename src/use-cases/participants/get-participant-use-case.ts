import { Participant } from "@prisma/client"
import { ParticipantsRepositories } from "../../repositories/participants-repositories"
import { ClientError } from "../erros/client-error"

interface getParticipantUseCaseRequest {
  participantId: string
}

interface getParticipantUseCaseResponse {
  participant: Participant
}

export class getParticipantUseCase {
  constructor(private participantsRepositories: ParticipantsRepositories) { }

  async execute({ participantId }: getParticipantUseCaseRequest): Promise<getParticipantUseCaseResponse> {
    const participant = await this.participantsRepositories.findById(participantId)

    if (!participant) {
      throw new ClientError("Participant not found.")
    }

    return {
      participant
    }

  }
}