import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("assets", (table) => {
        table.increments("id").primary();
        table
            .integer("brand_id")
            .unsigned()
            .references("id")
            .inTable("brands");
        table
            .integer("type_id")
            .unsigned()
            .references("id")
            .inTable("types");
        table
            .integer("reseller_id")
            .unsigned()
            .references("id")
            .inTable("resellers");
        table
            .integer("status_id")
            .unsigned()
            .references("id")
            .inTable("statuses");
        table.date("purchased_at").notNullable();
        table.string("model", 100).notNullable();
        table.string("serial", 100).notNullable();
        table.smallint("warranty_months");
        table.decimal("price", 10, 2).notNullable();
        table.timestamps(true, true);

        table.index(["purchased_at"], "idx_purchased_at");
        table.index(["model"], "idx_model");
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("assets");
}