/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('cart_items', (table) => {
    table.increments('id').primary();
    table
      .integer('cart_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('carts')
      .onDelete('CASCADE');
    table
      .integer('product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');
    table.integer('quantity').notNullable();
    table.unique(['cart_id', 'product_id']); // to prevent duplicate products in the same cart
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cart_items');
};
