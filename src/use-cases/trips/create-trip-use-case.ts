import { Trip } from "@prisma/client";
import { TripsRepositories } from "../../repositories/trips-repositories";
import { InvalidTripStartDateError } from "../erros/invalid-trip-start-date-error";
import { InvalidTripEndDateError } from "../erros/invalid-trip-end-date-error";
import { env } from "../../env.schema";
import { dayjs } from "../../lib/dayjs";
import { getMailClient } from "../../lib/mail";

interface CreateTripUseCaseRequest {
  destination: string,
  startsAt: Date,
  endsAt: Date,
  ownerName: string,
  ownerEmail: string,
  emailsToInvite: string[]
}

interface CreateTripUseCaseResponse {
  trip: Trip
}

export class CreateTripUseCase {
  constructor(private tripsRepositories: TripsRepositories) { }

  async execute({
    destination,
    startsAt,
    endsAt,
    ownerName,
    ownerEmail,
    emailsToInvite
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
      endsAt,
      ownerName,
      ownerEmail,
      emailsToInvite
    })

    const formattedStartDate = dayjs(startsAt).format('LL')
    const formattedEndDate = dayjs(endsAt).format('LL')

    const confirmationLink = `${env.API_BASE_URL}/trips/${trip.id}/confirm`

    const mail = await getMailClient()

    const message = await mail.sendMail({
      from: {
        name: 'Equipe plann.er',
        address: 'oi@plann.er',
      },
      to: {
        name: ownerName,
        address: ownerEmail,
      },
      subject: `Confirme sua viagem para ${destination} em ${formattedStartDate}`,
      html: `
      <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
        <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
        <p></p>
        <p>Para confirmar sua viagem, clique no link abaixo:</p>
        <p></p>
        <p>
          <a href="${confirmationLink}">Confirmar viagem</a>
        </p>
        <p></p>
        <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
      </div>
    `.trim(),
    })

    return {
      trip
    }
  }
}