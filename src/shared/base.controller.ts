import { Response } from "express";
import status from "http-status";

export default class BaseController {

    getNotFound(resource: string, response: Response, suffix  = 'not found') {
        return response
            .status(status.NOT_FOUND)
            .send({ message: `${resource} ${suffix}` });
    }

}