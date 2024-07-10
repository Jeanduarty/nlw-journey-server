import { Trip } from "@prisma/client";
import { TripsRepositories } from "../../repositories/trips-repositories";
import dayjs from "dayjs";
import { InvalidTripStartDateError } from "../erros/invalid-trip-start-date-error";
import { InvalidTripEndDateError } from "../erros/invalid-trip-end-date-error";
import { MailProvider } from "../../providers/MailProvier";

interface CreateTripUseCaseRequest {
  destination: string,
  startsAt: Date,
  endsAt: Date,
  ownerName: string,
  ownerEmail: string
}

interface CreateTripUseCaseResponse {
  trip: Trip
}

export class CreateTripUseCase {
  constructor(
    private tripsRepositories: TripsRepositories,
    private mailProvider: MailProvider
  ) { }

  async execute({
    destination,
    startsAt,
    endsAt,
    ownerName,
    ownerEmail
  }: CreateTripUseCaseRequest): Promise<CreateTripUseCaseResponse> {

    if (dayjs(startsAt).isBefore(new Date())) {
      throw new InvalidTripStartDateError()
    }

    if (dayjs(endsAt).isBefore(startsAt)) {
      throw new InvalidTripEndDateError()
    }

    const trip = await this.tripsRepositories.create({
      destination,
      startsAt,
      endsAt
    })

    return {
      trip
    }
  }
}