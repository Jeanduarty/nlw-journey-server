import { Prisma, Trip } from "@prisma/client";

export interface TripsRepositories {
  create(data: Prisma.TripCreateInput): Promise<Trip>
}