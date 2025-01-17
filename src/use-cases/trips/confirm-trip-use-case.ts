import { env } from "../../env.schema";
import nodemailer from 'nodemailer';
import { dayjs } from "../../lib/dayjs";
import { getMailClient } from "../../lib/mail";
import { ParticipantsRepositories } from "../../repositories/participants-repositories";
import { TripsRepositories } from "../../repositories/trips-repositories";
import { ClientError } from "../erros/client-error";

interface ConfirmTripUseCaseRequest {
  tripId: string
}

export class confirmTripUseCase {
  constructor(
    private tripsRepositories: TripsRepositories,
    private participantsRepositories: ParticipantsRepositories
  ) { }

  async execute({ tripId }: ConfirmTripUseCaseRequest): Promise<void> {

    const trip = await this.tripsRepositories.findById(tripId)

    if (!trip) {
      throw new ClientError("Trip not found.")
    }

    if (trip.checkIn) {
      throw new ClientError("Trip already confirm.")
    }

    await this.tripsRepositories.confirm(tripId)

    const participants = await this.participantsRepositories.findByTripId(tripId)

    if (participants) {
      const formattedStartDate = dayjs(trip.startsAt).format('LL')
      const formattedEndDate = dayjs(trip.endsAt).format('LL')

      const mail = await getMailClient()

      await Promise.all(
        participants.map(async (participant) => {
          if (participant.checkIn) {
            return
          }

          const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`

          const message = await mail.sendMail({
            from: {
              name: 'Equipe plann.er',
              address: 'oi@plann.er',
            },
            to: participant.email,
            subject: `Confirme sua presença na viagem para ${trip.destination} em ${formattedStartDate}`,
            html: `
            <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
              <p>Você foi convidado(a) para participar de uma viagem para <strong>${trip.destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
              <p></p>
              <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
              <p></p>
              <p>
                <a href="${confirmationLink}">Confirmar viagem</a>
              </p>
              <p></p>
              <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
            </div>
          `.trim(),
          })

          console.log(nodemailer.getTestMessageUrl(message))
        })
      )
    }
  }
}