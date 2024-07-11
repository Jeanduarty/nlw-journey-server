import { Trip } from "@prisma/client";
import { tripDataProps, TripsRepositories } from "../trips-repositories";
import { prisma } from "../../lib/prisma";

export class PrismaTripsRepositories implements TripsRepositories {
  async create(data: tripDataProps): Promise<Trip> {

    const trip = await prisma.trip.create({
      data: {
        ...data,
        participants: {
          createMany: {
            data: [
              {
                name: data.ownerName,
                email: data.ownerEmail,
                isOwner: true,
                checkIn: new Date(),
              },
              ...data.emailsToInvite.map((email) => {
                return { email }
              }),
            ],
          },
        },
      },
    })

    return trip
  }

  async findById(tripId: string): Promise<Trip | null> {
    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId
      }
    })

    return trip
  }

  async confirm(tripId: string): Promise<void> {
    await prisma.trip.update({
      data: {
        checkIn: new Date()
      },
      where: {
        id: tripId
      }
    })
  }

}