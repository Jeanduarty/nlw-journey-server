import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ParticipantsRepositories } from "../participants-repositories";

export class PrismaParticipantsRepositories implements ParticipantsRepositories {
  async create(data: Prisma.ParticipantUncheckedCreateInput) {
    const participant = await prisma.participant.create({
      data
    })

    return participant
  }

  async createMany(tripId: string, emails: string[]) {
    await prisma.participant.createMany({
      data: [
        ...emails.map((email) => {
          return { email, tripId }
        })
      ]
    })
  }

  async findById(participantId: string) {
    const participant = await prisma.participant.findUnique({
      where: {
        id: participantId
      }
    })

    return participant
  }
  async findByTripId(tripId: string) {
    const participants = await prisma.participant.findMany({
      where: {
        tripId
      }
    })

    return participants
  }

  async confirm(participantId: string) {
    await prisma.participant.update({
      data: {
        checkIn: new Date()
      },
      where: {
        id: participantId
      }
    })
  }
}