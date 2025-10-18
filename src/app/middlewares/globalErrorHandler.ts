/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { handleDuplicateError } from "../helpers/handleDuplicateError.";
import { TErrorSources } from "../interfaces/error.types";
import { handleCastError } from "../helpers/handleCastError";
import { handleZodError } from "../helpers/handleZodError";
import { handleValidationError } from "../helpers/handleValidationError";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response
) => {
  let statusCode = 500;
  let message = "something went Wrong";
  let errorSources: TErrorSources[] = [];

  // Duplicate error
  if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statuscode;
    message = simplifiedError.message;
  }

  // Object ID error / Cast Error
  else if (err.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statuscode;
    message = simplifiedError.message;
  }

  // Zod validation errors
  else if (err.name === "ZodError") {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statuscode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as TErrorSources[];
  }

  // Mongoose Validation Error
  else if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statuscode;
    errorSources = simplifiedError.errorSources as TErrorSources[];
    message = simplifiedError.message;
  }

  // custom application errors (AppError)
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // generic JavaScript runtime errors
  else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  // formatted error response
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
