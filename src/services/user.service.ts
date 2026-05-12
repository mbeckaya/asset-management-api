import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import BaseService from "./base.service";
import type { UserEntity } from "../types/entity/user-entity.type";
import type { UserView } from "../types/view/user-view.type";

export default class UserService extends BaseService {

    async auth(email: string, plainPassword: string): Promise<UserView | null> {
        const user: UserEntity = await this
            .db("users")
            .select(
                "id",
                "email",
                "password",
                "first_name",
                "last_name"
            )
            .where("email", email)
            .where("is_active", true)
            .first();

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(plainPassword, user.password);

        if (!isPasswordValid) return null;

        const accessToken = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "8h" }
        );

        const userView: UserView = {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            accessToken
        };

        return userView;
    }

}