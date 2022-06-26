import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../helpers/error-handler";

const errorMiddleware = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err instanceof ErrorHandler) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Unknown server error" });
};

export default errorMiddleware;
