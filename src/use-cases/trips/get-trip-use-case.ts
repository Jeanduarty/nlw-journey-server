import { Trip } from "@prisma/client"
import { TripsRepositories } from "../../repositories/trips-repositories"
import { ClientError } from "../erros/client-error"

interface getTripUseCaseRequest {
  tripId: string
}

interface getTripUseCaseResponse {
  trip: Trip
}

export class getTripUseCase {
  constructor(private tripsRepositories: TripsRepositories) { }

  async execute({ tripId }: getTripUseCaseRequest): Promise<getTripUseCaseResponse> {
    const trip = await this.tripsRepositories.findById(tripId)

    if (!trip) {
      throw new ClientError("Trip not found.")
    }

    return {
      trip
    }
  }

}