import { Link, Prisma } from "@prisma/client";

export interface LinksRepositories {
  create(data: Prisma.LinkUncheckedCreateInput): Promise<Link>
  findManyByTripId(tripId: string): Promise<Link[] | null>
}