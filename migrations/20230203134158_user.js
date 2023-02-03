/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("user", (table) => {
        table.increments("id").primary();
        table.string("email").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
      });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("users");
}
