import pool from "../db";
import { doesOrderExistForUser } from "../helpers/orders.helper";

// GET function for retrieving all orders for user
export const getAllUserOrders = async (req, res) => {
  try {
    console.log(typeof req.user.id);
    const userId = parseInt(req.user.id, 10);
    const result = await pool.query("SELECT * FROM orders WHERE user_id = $1", [
      userId,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error fetching orders: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// GET function for retrieving specific order for specific user
export const getOrderForUser = async (req, res) => {
  try {
    const orderId = parseInt(req.params.orderId);
    if (isNaN(orderId)) {
      return res
        .status(400)
        .json({ error: "Bad Request. Not a valid product." });
    }
    const doesOrderExist = await doesOrderExistForUser(req.user.id, orderId);
    if (!doesOrderExist) {
      return res.status(404).json("Order does not exist for user.");
    }
    const result = await pool.query(
      "SELECT * FROM order_items WHERE order_id = $1",
      [orderId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error fetching order: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// POST function for creating an order from the cart
// TRANSACTION
export const createOrderFromCart = async (req, res) => {
  // Acquire a client connection from the pool manually
  const client = await pool.connect();
  try {
    await client.query("BEGIN"); // START NEW TRANSACTION

    // STEP 1: FETCH CART ITEMS AND THEIR PRICES
    const cartItemRes = await client.query(
      "SELECT ci.product_id, ci.quantity, p.price FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = (SELECT id FROM carts WHERE user_id = $1)",
      [req.user.id]
    );
    const cartItems = cartItemRes.rows;
    if (cartItems.length == 0) {
      res.status(404).json({ error: "Cart is empty." });
    }

    // STEP 2: CALCULATE TOTAL PRICE
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    // STEP 3: CREATE NEW ORDER
    const orderRes = await client.query(
      "INSERT INTO orders (user_id, total_price, status) VALUES ($1, $2, $3) RETURNING id",
      [req.user.id, totalPrice, "PENDING"]
    );
    const orderId = orderRes.rows[0].id;

    // STEP 4: INSERT INTO order_items
    for (const item of cartItems) {
      await client.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    // STEP 5: CLEAR THE CART
    await client.query("DELETE FROM cart_items WHERE cart_id = $1", [
      req.user.cart_id,
    ]);
    await client.query("COMMIT");
    res.status(201).json({
      message:
        "Successfully submitted order and is awaiting to begin being processed.",
      order_id: orderId,
      total_price: totalPrice,
    });
  } catch (error) {
    // CANCEL TRANSACTION
    await client.query("ROLLBACK");
    console.log("Error creating order: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  } finally {
    // RELEASE CLIENT AFTER SUCCESSFUL OR FAILED ORDER CREATION
    client.release();
  }
};

// PUT function for updating order status -- ADMIN ONLY
export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = parseInt(req.params.orderId, 10);
    if (isNaN(orderId)) {
      return res.status(400).json({ error: "Bad Request. Invalid Order ID." });
    }
    const newStatus = req.body.statusUpdate;
    if (
      newStatus != "PROCESSING" ||
      newStatus != "READY FOR PICK-UP" ||
      newStatus != "COMPLETE" ||
      newStatus != "CANCELLED"
    ) {
      return res.status(400).json({ error: "Bad Request. Invalid status." });
    }
    const result = await pool.query(
      "UPDATE orders SET status = $1 RETURNING *",
      [newStatus]
    );
    res
      .status(200)
      .json({
        message: "Successfully updated status of order.",
        updatedOrder: result.rows[0],
      });
  } catch (error) {
    console.log("Error updating order status: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// DELETE function to delete/cancel an order -- ADMIN ONLY
export const deleteUserOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.orderId, 10);
    if (isNaN(orderId)) {
      return res.status(400).json({ error: "Bad Request. Invalid Order ID." });
    }
    const result = await pool.query(
      "DELETE FROM orders WHERE id = $1 RETURNING *",
      [orderId]
    );
    if (result.rows.length == 0) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.status(200).json({
      message: "Successfully deleted order.",
      deletedOrder: result.rows[0],
    });
  } catch (error) {
    console.log("Error deleting/canceling an order: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
