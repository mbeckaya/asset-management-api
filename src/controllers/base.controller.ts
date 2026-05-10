import { Response } from "express";
import status from "http-status";

export default class BaseController {

    getNotFound(ressource: string, response: Response) {
        return response
            .status(status.NOT_FOUND)
            .send({ message: `${ressource} not found` });
    }
}