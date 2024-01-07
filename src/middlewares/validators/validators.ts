import { NextFunction, Request, Response } from "express";
import { error } from "console";
import { validationResult } from "express-validator";
import { ResquestValidationError } from "../../network/errors/request-validation-error";
import jwt from "jsonwebtoken";
import { verifyToken } from "../../utils/tokens/verify_token";

export const isValidated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ResquestValidationError(errors.array());
  }
  return next();
};
export const validateTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { headers } = req
    const authToken = headers['grema_store_token']! as string
    console.log(authToken)
    if (verifyToken(authToken)) {

      return next()
    }

    return res.status(401).json({ message: "Unauthorized!" });

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
}
