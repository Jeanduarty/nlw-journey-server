import { Prisma, Participant } from "@prisma/client";
import { ParticipantsRepositories } from "../participants-repositories";
import { prisma } from "../../lib/prisma";

export class PrismaParticipantsRepositories implements ParticipantsRepositories {
  create(data: Prisma.ParticipantUncheckedCreateInput): Promise<Participant> {
    throw new Error("Method not implemented.");
  }

  findById(participantId: string): Promise<Participant> {
    throw new Error("Method not implemented.");
  }

  async findByTripId(tripId: string): Promise<Participant[]> {
    const participants = await prisma.participant.findMany({
      where: {
        tripId
      }
    })

    return participants
  }

}