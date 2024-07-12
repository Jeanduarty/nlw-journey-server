import { Activity, Prisma } from "@prisma/client";

export interface ActivitiesRepositories {
  create(data: Prisma.ActivityUncheckedCreateInput): Promise<Activity>;
  findManyByTripId(tripId: string): Promise<Activity[] | null>
}