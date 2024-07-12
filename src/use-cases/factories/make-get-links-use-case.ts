import { PrismaLinksRepositories } from "../../repositories/prisma/prisma-links-repositories";
import { PrismaTripsRepositories } from "../../repositories/prisma/prisma-trips-repositories";
import { getLinksUseCase } from "../links/get-links-use-case";

export function MakeGetLinksUseCase() {
  const tripsRepositories = new PrismaTripsRepositories()
  const linksRepositories = new PrismaLinksRepositories()
  const useCase = new getLinksUseCase(linksRepositories, tripsRepositories);

  return useCase;
}