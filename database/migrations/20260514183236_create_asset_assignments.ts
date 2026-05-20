import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("asset_assignments", (table) => {
        table.increments("id").primary();
        table
            .integer("asset_id")
            .unsigned()
            .references("id")
            .inTable("assets");
        table
            .integer("user_id")
            .unsigned()
            .references("id")
            .inTable("users");
        table.date("assigned_at").notNullable();
        table.date("returned_at");
        table.string("notes");
        table.timestamps(true, true);

        table.index(["asset_id", "assigned_at"], "idx_asset_assigned");
        table.index(["user_id", "assigned_at"], "idx_user_assigned");
        table.index(["returned_at"], "idx_returned");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("asset_assignments");
}

