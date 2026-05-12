import type { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
    const passwordHash = await bcrypt.hash("passwort12345", 10);

    /**
     * Cleanup
     */
    await knex("users").del();

    /**
     * Insert data
     */
    await knex("users").insert([
        {
            email: "admin@nova-app.com",
            password: passwordHash,
            first_name: "Ethan",
            last_name: "Walker",
            is_active: true,
        },
        {
            email: "sofia.rossi@example.com",
            password: passwordHash,
            first_name: "Sofia",
            last_name: "Rossi",
            is_active: true,
        },
        {
            email: "liam.chen@demoapp.com",
            password: passwordHash,
            first_name: "Liam",
            last_name: "Chen",
            is_active: true,
        },
        {
            email: "amelie.dubois@example.org",
            password: passwordHash,
            first_name: "Amélie",
            last_name: "Dubois",
            is_active: true,
        },
        {
            email: "inactive.user@example.net",
            password: passwordHash,
            first_name: "Noah",
            last_name: "Andersen",
            is_active: false,
        },
    ]);
};
