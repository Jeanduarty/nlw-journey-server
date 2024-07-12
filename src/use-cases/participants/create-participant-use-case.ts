import { Participant } from "@prisma/client";
import nodemailer from 'nodemailer';
import { ParticipantsRepositories } from "../../repositories/participants-repositories";
import { TripsRepositories } from "../../repositories/trips-repositories";
import { ClientError } from "../erros/client-error";
import { dayjs } from "../../lib/dayjs";
import { getMailClient } from "../../lib/mail";
import { env } from "../../env.schema";

interface createParticipantUseCaseRequest {
  tripId: string
  email: string
}

interface createParticipantUseCaseResponse {
  participant: Participant
}

export class createParticipantUseCase {
  constructor(
    private participantsRepositories: ParticipantsRepositories,
    private tripsRepositories: TripsRepositories
  ) { }

  async execute({ tripId, email }: createParticipantUseCaseRequest): Promise<createParticipantUseCaseResponse> {
    const trip = await this.tripsRepositories.findById(tripId)

    if (!trip) {
      throw new ClientError("Trip not found.")
    }

    const participant = await this.participantsRepositories.create({
      tripId,
      email
    })

    const formattedStartDate = dayjs(trip.startsAt).format('LL')
    const formattedEndDate = dayjs(trip.endsAt).format('LL')

    const mail = await getMailClient()

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

    return {
      participant
    }

  }
}