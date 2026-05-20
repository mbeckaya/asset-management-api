import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("email", 50).notNullable();
        table.string("password", 255).notNullable();
        table.string("first_name", 50).notNullable();
        table.string("last_name", 50).notNullable();
        table.boolean("is_active").notNullable().defaultTo(true);
        table.timestamps(true, true);

        table.index(["email"], "idx_email");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users");
}