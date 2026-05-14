import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("asset_assignments").del();
    await knex("assets").del();
    await knex("users").del();
    await knex("brands").del();
    await knex("types").del();
    await knex("resellers").del();
    await knex("statuses").del();
};