import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/check";
import { ValidationSchema } from "../routes/schema";

const validateBody = (schema: ValidationSchema) => {
  return [
    ...schema,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      } else {
        next();
      }
    },
  ];
};
export default validateBody;
