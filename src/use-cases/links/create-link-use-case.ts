import { Link } from "@prisma/client";
import { LinksRepositories } from "../../repositories/links-repositories";
import { TripsRepositories } from "../../repositories/trips-repositories";
import { ClientError } from "../erros/client-error";

interface createLinkUseCaseRequest {
  tripId: string
  title: string
  url: string
}

interface createLinkUseCaseResponse {
  link: Link
}

export class createLinkUseCase {
  constructor(
    private linksRepositories: LinksRepositories,
    private tripsRepositories: TripsRepositories
  ) { }

  async execute({ tripId, title, url }: createLinkUseCaseRequest): Promise<createLinkUseCaseResponse> {
    const trip = await this.tripsRepositories.findById(tripId)

    if (!trip) {
      throw new ClientError("Trip not found.")
    }

    const link = await this.linksRepositories.create({
      title,
      url,
      tripId
    })

    return {
      link
    }
  }
}