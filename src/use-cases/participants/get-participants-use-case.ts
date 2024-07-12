import { Participant } from "@prisma/client";
import { ParticipantsRepositories } from "../../repositories/participants-repositories";
import { ClientError } from "../erros/client-error";

interface getParticipantsUseCaseRequest {
  tripId: string
}

interface getParticipantsUseCaseResponse {
  participants: Participant[]
}

export class getParticipantsUseCase {
  constructor(private participantsRepositories: ParticipantsRepositories) { }

  async execute({ tripId }: getParticipantsUseCaseRequest): Promise<getParticipantsUseCaseResponse> {
    const participants = await this.participantsRepositories.findByTripId(tripId)

    if (!participants) {
      throw new ClientError("Trip not found.")
    }

    return {
      participants
    }
  }
}