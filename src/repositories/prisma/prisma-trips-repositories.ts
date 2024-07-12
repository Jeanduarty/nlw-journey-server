import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { TripsRepositories, updateProps } from "../trips-repositories";

export class PrismaTripsRepositories implements TripsRepositories {
  async create(data: Prisma.TripCreateInput) {
    const trip = await prisma.trip.create({
      data
    })

    return trip
  }
  
  async findById(tripId: string) {
    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId
      }
    })

    return trip
  }

  async confirm(tripId: string) {
    await prisma.trip.update({
      data: {
        checkIn: new Date()
      },
      where: {
        id: tripId
      }
    })
  }

  async update({ tripId, destination, startsAt, endsAt }: updateProps) {
    const trip = await prisma.trip.update({
      data: {
        destination,
        startsAt,
        endsAt
      },
      where: {
        id: tripId
      }
    })

    return trip
  }

}