export class UserEmailAlreadyExistsConflict extends Error {
    constructor() {
      super('User Email already exists');
    }
  }