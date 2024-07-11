import { Participant, Prisma } from "@prisma/client";

export interface ParticipantsRepositories {
  create(data: Prisma.ParticipantUncheckedCreateInput): Promise<Participant>
  findById(participantId: string): Promise<Participant>
  findByTripId(tripId: string): Promise<Participant[]>
}