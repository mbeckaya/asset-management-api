import { Request, Response, NextFunction } from "express";
import status from "http-status";
import { userLoginValidator } from "../../user/user-login.validator";
import { assetAssignmentValidator } from "../../asset/assignment/asset-assignment.validator";

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

export const validateLoginBody = createBodyValidator(userLoginValidator);

export const validateAssetAssignmentBody = createBodyValidator(assetAssignmentValidator);