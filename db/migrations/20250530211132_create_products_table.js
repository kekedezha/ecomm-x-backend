/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.text("description");
    table.decimal("price").notNullable();
    table.integer("stock").notNullable();
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("categories");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("products");
};
