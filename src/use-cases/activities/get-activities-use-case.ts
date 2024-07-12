import { Activity } from "@prisma/client";
import { TripsRepositories } from "../../repositories/trips-repositories";
import { ClientError } from "../erros/client-error";
import { ActivitiesRepositories } from "../../repositories/activities-repositories";

interface getActivitiesUseCaseRequest {
  tripId: string
}

interface getActivitiesUseCaseResponse {
  activities: Activity[] | null
}

export class getActivitiesUseCase {
  constructor(
    private activitiesRepositories: ActivitiesRepositories,
    private tripsRepositories: TripsRepositories
  ) { }

  async execute({ tripId }: getActivitiesUseCaseRequest): Promise<getActivitiesUseCaseResponse> {
    const trip = await this.tripsRepositories.findById(tripId)

    if (!trip) {
      throw new ClientError("Trip not found.")
    }

    const activities = await this.activitiesRepositories.findManyByTripId(tripId)

    return {
      activities
    }
  }
}