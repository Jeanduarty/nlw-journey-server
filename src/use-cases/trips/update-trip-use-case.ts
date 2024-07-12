import { Trip } from "@prisma/client";
import { TripsRepositories } from "../../repositories/trips-repositories";
import { ClientError } from "../erros/client-error";
import { dayjs } from "../../lib/dayjs";

interface updateTripUseCaseRequest {
  tripId: string,
  destination: string,
  startsAt: Date,
  endsAt: Date,
}

interface updateTripUseCaseResponse {
  trip: Trip
}

export class updateTripUseCase {
  constructor(private tripsRepositories: TripsRepositories) { }

  async execute({ tripId, destination, startsAt, endsAt }: updateTripUseCaseRequest): Promise<updateTripUseCaseResponse> {
    const trip = await this.tripsRepositories.findById(tripId)

    if (!trip) {
      throw new ClientError("Trip not found.")
    }

    if (dayjs(startsAt).isBefore(new Date())) {
      throw new ClientError('Invalid trip start date.')
    }

    if (dayjs(endsAt).isBefore(startsAt)) {
      throw new ClientError('Invalid trip end date.')
    }

    const newTrip = await this.tripsRepositories.update({
      tripId,
      destination,
      startsAt,
      endsAt
    })

    return {
      trip: newTrip
    }
  }
}