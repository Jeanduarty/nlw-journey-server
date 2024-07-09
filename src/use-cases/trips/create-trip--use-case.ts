import { Trip } from "@prisma/client";
import { TripsRepositories } from "../../repositories/trips-repositories";

interface CreateTripUseCaseRequest {
  destination: string,
  startsAt: Date,
  endsAt: Date,
}

interface CreateTripUseCaseResponse {
  trip: Trip
}

export class CreateTripUseCase {
  constructor(private tripsRepositories: TripsRepositories) { }

  async execute({
    destination,
    startsAt,
    endsAt
  }: CreateTripUseCaseRequest): Promise<CreateTripUseCaseResponse> {

    const trip = await this.tripsRepositories.create({
      destination,
      startsAt,
      endsAt
    })

    return { trip }
  }
}