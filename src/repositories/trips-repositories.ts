import { Trip } from "@prisma/client";

export interface tripDataProps {
  destination: string;
  startsAt: Date;
  endsAt: Date;
  ownerName: string;
  ownerEmail: string;
  emailsToInvite: string[]
}

export interface TripsRepositories {
  create(data: tripDataProps): Promise<Trip>
  findById(tripId: string): Promise<Trip | null>
  confirm(tripId: string): Promise<void>
}