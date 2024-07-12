import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { LinksRepositories } from "../links-repositories";

export class PrismaLinksRepositories implements LinksRepositories {
  async create(data: Prisma.LinkUncheckedCreateInput) {
    const link = await prisma.link.create({
      data
    })

    return link
  }

  async findManyByTripId(tripId: string) {
    const links = await prisma.link.findMany({
      where: {
        tripId
      }
    })

    return links
  }

}