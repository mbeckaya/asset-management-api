import { Request, Response, NextFunction } from "express";

export const validateId = (request: Request, response: Response, next: NextFunction) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id)) {
    return response.status(400).send({ message: "Invalid id" });
  }

  response.locals.id = id;
  next();
};