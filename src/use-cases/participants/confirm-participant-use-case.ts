import { ParticipantsRepositories } from "../../repositories/participants-repositories";
import { ClientError } from "../erros/client-error";

interface ConfirmParticipantRequest {
  participantId: string
}

export class confirmParticipant {
  constructor(private participantsRepositories: ParticipantsRepositories) { }

  async execute({ participantId }: ConfirmParticipantRequest) {
    const participant = await this.participantsRepositories.findById(participantId)

    if (!participant) {
      throw new ClientError("Participant not found.")
    }

    if (participant.checkIn) {
      throw new ClientError("Participant already confirmed.")
    }

    await this.participantsRepositories.confirm(participantId)
  }
}