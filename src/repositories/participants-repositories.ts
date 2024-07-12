import { Participant, Prisma, } from "@prisma/client"

export interface ParticipantsRepositories {
  create(data: Prisma.ParticipantUncheckedCreateInput): Promise<Participant>
  createMany(tripId: string, emails: string[]): Promise<void>
  findById(participantId: string): Promise<Participant | null>
  findByTripId(tripId: string): Promise<Participant[] | null>
  confirm(participantId: string): Promise<void>
}