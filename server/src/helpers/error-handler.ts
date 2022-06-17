class ErrorHandler extends Error {
  status: number;
  errors: Array<Error> | null;

  constructor(status: number, message: string, errors: Array<Error> = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ErrorHandler(401, "User unauthorized");
  }

  static BadRequest(message: string, errors: Array<Error> | never = []) {
    return new ErrorHandler(400, message, errors);
  }
}

export default ErrorHandler;
