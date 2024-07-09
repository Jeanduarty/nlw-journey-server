export class InvalidTripStartDateError extends Error {
  constructor() {
    super("Invalid trip start date.")
  }
}