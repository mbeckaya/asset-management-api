import  { Request, Response, NextFunction } from "express";
import status from "http-status";
import { loginValidator } from "../../validators/login.validator";

export const validateLoginBody = (request: Request, response: Response, next: NextFunction) => {
    const { error } = loginValidator.validate(request.body);

    if (error) {
        return response
            .status(status.BAD_REQUEST)
            .send({ error: error.details });
    }

    next();
};