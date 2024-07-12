import { PrismaLinksRepositories } from "../../repositories/prisma/prisma-links-repositories";
import { PrismaTripsRepositories } from "../../repositories/prisma/prisma-trips-repositories";
import { createLinkUseCase } from "../links/create-link-use-case";

export function MakeCreateLinkUseCase() {
  const tripsRepositories = new PrismaTripsRepositories()
  const linksRepositories = new PrismaLinksRepositories()
  const useCase = new createLinkUseCase(linksRepositories, tripsRepositories);

  return useCase;
}