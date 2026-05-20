import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("asset_assignments").insert([
        { 
            id: 1,
            asset_id: 1,
            user_id: 1,
            assigned_at: "2026-01-01",
            returned_at: null,
            notes: null,
        },
        { 
            id: 2,
            asset_id: 3,
            user_id: 2,
            assigned_at: "2026-01-05",
            returned_at: "2026-02-10",
            notes: "Laptop returned",
        },
        { 
            id: 3,
            asset_id: 5,
            user_id: 3,
            assigned_at: "2026-01-12",
            returned_at: null,
            notes: "Permanent assignment",
        },
        { 
            id: 4,
            asset_id: 7,
            user_id: 4,
            assigned_at: "2026-01-18",
            returned_at: null,
            notes: null,
        },
        { 
            id: 5,
            asset_id: 9,
            user_id: 5,
            assigned_at: "2026-02-01",
            returned_at: null,
            notes: "Monitor for remote work",
        },
        { 
            id: 6,
            asset_id: 11,
            user_id: 1,
            assigned_at: "2026-02-08",
            returned_at: "2026-02-20",
            notes: "Test device",
        },
        { 
            id: 7,
            asset_id: 13,
            user_id: 2,
            assigned_at: "2026-02-15",
            returned_at: null,
            notes: null,
        },
        { 
            id: 8,
            asset_id: 16,
            user_id: 3,
            assigned_at: "2026-03-01",
            returned_at: null,
            notes: "Tablet for project use",
        },
        { 
            id: 9,
            asset_id: 18,
            user_id: 4,
            assigned_at: "2026-03-10",
            returned_at: "2026-04-01",
            notes: "Replacement device",
        },
        { 
            id: 10,
            asset_id: 20,
            user_id: 5,
            assigned_at: "2026-03-15",
            returned_at: null,
            notes: null,
        }
    ]);
};
