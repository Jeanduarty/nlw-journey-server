export class TripAlreadyConfirmed extends Error {
  constructor() {
    super("Trip already confirmed.")
  }
}