import { Request, Response, NextFunction } from "express";
import status from "http-status";
import { loginValidator } from "../../validators/login.validator";
import { assetAssignmentValidator } from "../../validators/asset-assignment.validator";

const createBodyValidator = (validator: { validate: (body: unknown) => { error?: any } }) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const { error } = validator.validate(request.body);

        if (error) {
            return response
                .status(status.BAD_REQUEST)
                .send({ error: error.details });
        }

        next();
    };
};

export const validateLoginBody = createBodyValidator(loginValidator);

export const validateAssetAssignmentBody = createBodyValidator(assetAssignmentValidator);