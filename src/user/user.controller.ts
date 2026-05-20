import { Request, Response } from "express";
import status from "http-status";

import BaseController from "../shared/base.controller";
import UserService from "./user.service";

export default class UserController extends BaseController {

    constructor(private service: UserService) {
        super();
    }

    login = async (request: Request, response: Response) => {
        const { email, password } = request.body;

        const user = await this.service.auth(email, password);

        if (!user) {
            response
                .status(status.UNAUTHORIZED)
                .send({
                    "error": "Invalid email or password"
                }
            );    
        }

        response.status(status.OK).send(user);
    }
    
}