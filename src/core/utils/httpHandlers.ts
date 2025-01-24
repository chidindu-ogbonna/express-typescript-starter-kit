import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodError, ZodSchema } from "zod";

import { ServiceResponse } from "@/core/models/serviceResponse";

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) =>
  response.status(serviceResponse.statusCode).send(serviceResponse);

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    const error = err as ZodError;
    const requiredFields = error.errors
      .filter((e) => e.code === "invalid_type" && e.message === "Required")
      .map((e) => e.path.join("."));
    const messages = error.errors.map((e) => e.message).filter((m) => m !== "Required");
    const errorMessage = `Invalid input: ${messages.join(", ")}${requiredFields.length ? `Required fields: ${requiredFields.join(", ")}` : ""
      }`;
    const serviceResponse = ServiceResponse.failure(errorMessage, null, StatusCodes.BAD_REQUEST);
    return handleServiceResponse(serviceResponse, res);
  }
};
