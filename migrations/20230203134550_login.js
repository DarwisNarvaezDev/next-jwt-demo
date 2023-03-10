/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("login", (table) => {
        table.increments("id").primary();
        table.string("email").notNullable();
        table.string("hash").notNullable();
        table.string("refresh").nullable();
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("login");
}
