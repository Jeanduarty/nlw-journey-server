export class InvalidTripEndDateError extends Error {
  constructor() {
    super("Invalid trip end date.")
  }
}