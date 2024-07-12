import { Activity } from "@prisma/client";
import { TripsRepositories } from "../../repositories/trips-repositories";
import { ClientError } from "../erros/client-error";
import { dayjs } from "../../lib/dayjs";
import { ActivitiesRepositories } from "../../repositories/activities-repositories";

interface createActivityUseCaseRequest {
  tripId: string
  title: string
  occursAt: Date
}

interface createActivityUseCaseResponse {
  activity: Activity
}

export class createActivityUseCase {
  constructor(
    private activitiesRepositories: ActivitiesRepositories,
    private tripsRepositories: TripsRepositories
  ) { }

  async execute({ occursAt, title, tripId }: createActivityUseCaseRequest): Promise<createActivityUseCaseResponse> {
    const trip = await this.tripsRepositories.findById(tripId)

    if (!trip) {
      throw new ClientError("Trip not found.")
    }

    if (dayjs(occursAt).isBefore(trip.startsAt)) {
      throw new ClientError('Invalid activity date.')
    }

    if (dayjs(occursAt).isAfter(trip.endsAt)) {
      throw new ClientError('Invalid activity date.')
    }

    const activity = await this.activitiesRepositories.create({
      occursAt,
      title,
      tripId
    })

    return {
      activity
    }

  }
}