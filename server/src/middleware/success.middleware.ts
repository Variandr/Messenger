import { NextFunction, Request, Response } from "express";

const sendSuccess = async (_: Request, res: Response, __: NextFunction) => {
  res.status(200).json({ success: true });
};
export default sendSuccess;