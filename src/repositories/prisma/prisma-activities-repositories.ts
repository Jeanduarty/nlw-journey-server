import { Prisma } from "@prisma/client";
import { ActivitiesRepositories } from "../activities-repositories";
import { prisma } from "../../lib/prisma";

export class PrismaActivitiesRepositories implements ActivitiesRepositories {
  async create(data: Prisma.ActivityUncheckedCreateInput) {
    const activity = await prisma.activity.create({
      data
    })

    return activity
  }

  async findManyByTripId(tripId: string) {
    const activities = await prisma.activity.findMany({
      where: {
        tripId
      }
    })

    return activities
  }

}