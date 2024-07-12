import { Link } from "@prisma/client"
import { TripsRepositories } from "../../repositories/trips-repositories"
import { LinksRepositories } from "../../repositories/links-repositories"
import { ClientError } from "../erros/client-error"

interface getLinksUseCaseRequest {
  tripId: string
}

interface getLinksUseCaseResponse {
  links: Link[] | null
}

export class getLinksUseCase {
  constructor(
    private linksRepositories: LinksRepositories,
    private tripsRepositories: TripsRepositories
  ) { }

  async execute({ tripId }: getLinksUseCaseRequest): Promise<getLinksUseCaseResponse> {
    const trip = await this.tripsRepositories.findById(tripId)

    if (!trip) {
      throw new ClientError("Trip not found.")
    }

    const links = await this.linksRepositories.findManyByTripId(trip.id)

    return {
      links
    }
  }
}