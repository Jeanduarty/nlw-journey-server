import { Prisma, Trip } from "@prisma/client";

export interface updateProps {
  tripId: string,
  destination: string,
  startsAt: Date,
  endsAt: Date,
}

export interface TripsRepositories {
  create(data: Prisma.TripCreateInput): Promise<Trip>
  update(data: updateProps): Promise<Trip>
  findById(tripId: string): Promise<Trip | null>
  confirm(tripId: string): Promise<void>
}