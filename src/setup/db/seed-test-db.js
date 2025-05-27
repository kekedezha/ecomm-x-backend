// seed/test-seed.js
import "dotenv/config"; // Initialize .env variables from .env file
import { Pool } from "pg";
import bcrypt from "bcrypt";
import { hashPassword } from "../../helpers/users.helper";

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.USER || "testuser",
  database: process.env.PGDATABASE || "testdb",
});

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

const seed = async () => {
  try {
    await pool.query("BEGIN");

    // Clear data (respect FK constraints order)
    await pool.query("DELETE FROM cart_items");
    await pool.query("DELETE FROM carts");
    await pool.query("DELETE FROM order_items");
    await pool.query("DELETE FROM payments");
    await pool.query("DELETE FROM orders");
    await pool.query("DELETE FROM products");
    await pool.query("DELETE FROM categories");
    await pool.query("DELETE FROM users");

    // Users
    const adminPassword = await hashPassword(process.env.ADMIN_PASSWORD);
    const yukiPassword = await hashPassword(process.env.YUKI_PASSWORD);
    const pierrePassword = await hashPassword(process.env.PIERRE_PASSWORD);

    const userInsertQuery = `
      INSERT INTO users (username, email, password, first_name, last_name, address)
      VALUES 
        ('kekedezha', 'dezha6@hotmail.com', $1, 'Christian', 'Dezha', 'Charlotte, NC'),
        ('youkey', 'yuki@gmail.com', $2, 'Yuki', 'Dezha', 'Charlotte, NC'),
        ('peeyerre', 'pierre@gmail.com', $3, 'Pierre', 'Rivas', 'Charlotte, NC')
      RETURNING id
    `;
    const { rows: users } = await pool.query(userInsertQuery, [
      adminPassword,
      yukiPassword,
      pierrePassword,
    ]);

    // Categories
    const categoryRes = await pool.query(`
      INSERT INTO categories (name)
      VALUES ('Bread'), ('Cookie'), ('Pastry'), ('Tart')
      RETURNING id
    `);
    const categoryId = categoryRes.rows[0].id;

    // Products
    await pool.query(
      `
      INSERT INTO products (name, description, price, stock, category_id)
      VALUES 
        ('Baguette', 'Long, thin type of bread of French origin.', 6.99, 50, 1),
	    ('Sourdough Loaf', 'Naturally leavened bread made with a fermented starter containing wild yeast and bacteria, resulting in a tangy flavor and chewy texture.', 5.99, 50, 1),
	    ('Chocolate Chip Cookie', 'Chocolate Chip Cookie with sea salt sprinkled on top.', 1.99, 50, 2),
	    ('Peanut Butter Cookie', 'Peanut Butter Cookie', 1.99, 50, 2);
        ('Almond Croissant', 'Traditional butter croissant, frangipane, slivered almonds and cider syrup.', 3.99, 50, 3),
	    ('Blueberry Danish', 'Classic danish with cheesecake cream and blueberry compote filling', 3.99, 50, 3),
	    ('Chocolate Hazelnut Tart', 'Chocolate tart with a chocolate sponge, hazelnut mousse, dark chocolate ganache, and toasted hazelnuts', 3.99, 50, 4),
	    ('Fresh Fruit Tart', 'Vanilla sable, with vanilla pastry cream, topped with fresh seasonal fruits', 3.99, 50, 4);
    `,
      [categoryId]
    );

    await pool.query("COMMIT");
    console.log("✅ Test database seeded successfully!");
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("❌ Error seeding test database:", err);
  } finally {
    await pool.end();
  }
};

seed();
