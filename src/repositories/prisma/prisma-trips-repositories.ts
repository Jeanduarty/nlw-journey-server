import { Prisma, Trip } from "@prisma/client";
import { TripsRepositories } from "../trips-repositories";
import { prisma } from "../../lib/prisma";

export class PrismaTripsRepositories implements TripsRepositories{
  async create(data: Prisma.TripCreateInput): Promise<Trip> {
    const trip = await prisma.trip.create({
      data
    })

    return trip
  }

}