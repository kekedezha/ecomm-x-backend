"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.finalizeOrder = void 0;
var _db = _interopRequireDefault(require("../config/db"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// POST function to process a payment and finalize an order
const finalizeOrder = async (req, res) => {
  const client = await _db.default.connect();
  try {
    // 0. Start new transaction
    await client.query("BEGIN");

    // 1. Validate required user input
    const orderId = parseInt(req.body.orderId, 10);
    const amount = parseFloat(req.body.amount);
    if (isNaN(orderId)) {
      await client.query("ROLLBACK");
      return res.status(400).json({
        error: "Bad request. Invalid order id. Order id must be a number."
      });
    }
    if (isNaN(amount)) {
      await client.query("ROLLBACK");
      return res.status(400).json({
        error: "Bad request. Invalid order amount. Amount must be a number."
      });
    }
    const {
      paymentMethod
    } = req.body;
    if (!paymentMethod) {
      await client.query("ROLLBACK");
      return res.status(400).json({
        error: "Bad request. Missing payment method."
      });
    }

    // 2. Check that the order exists and belongs to the user
    const orderResult = await client.query("SELECT * FROM orders WHERE id = $1 AND user_id = $2", [orderId, req.user.id]);
    if (orderResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({
        error: "Order id not found."
      });
    }

    // 3. Check that the order is in a 'pending' status
    const order = orderResult.rows[0];
    if (order.status !== "PENDING") {
      await client.query("ROLLBACK");
      return res.status(400).json({
        error: "Order is not eligible for checkout."
      });
    }

    // 4. Optionally validate that the total matches
    if (parseFloat(order.total_price) !== amount) {
      await client.query("ROLLBACK");
      return res.status(400).json({
        error: "Payment does not match order total."
      });
    }

    // 5. Check product inventory
    const orderItemResults = await client.query("SELECT product_id, quantity FROM order_items WHERE order_id = $1", [orderId]);
    const orderItems = orderItemResults.rows;
    for (const item of orderItems) {
      const {
        product_id,
        quantity
      } = item;
      const productResult = await client.query("SELECT stock FROM products WHERE id = $1", [product_id]);
      const stock = productResult.rows[0]?.stock;
      if (stock === undefined || stock < quantity) {
        await client.query("ROLLBACK");
        return res.status(400).json({
          error: `Insufficient inventory for products.`
        });
      }
    }

    // 6. Deduct inventory
    for (const item of orderItems) {
      await client.query("UPDATE products SET stock = stock - $1 WHERE id = $2", [item.quantity, item.product_id]);
    }

    // 6. Insert into payments table
    const paymentResult = await client.query("INSERT INTO payments (order_id, payment_method, status) VALUES ($1, $2, $3) RETURNING *", [orderId, paymentMethod, "completed"]);

    // 7. Update the order's status
    await client.query("UPDATE orders SET status = 'PAID' WHERE id = $1 and user_id = $2", [orderId, req.user.id]);

    //8. Complete transaction
    await client.query("COMMIT");
    res.status(200).json({
      message: "Payment successful. Order status updated to PAID.",
      payment: paymentResult
    });
  } catch (error) {
    // Cancel transaction
    await client.query("ROLLBACK");
    console.log("Checkout error: ", error);
    res.status(500).json({
      error: "Internal server error"
    });
  } finally {
    // Release client after successful or failed transaction
    client.release();
  }
};
exports.finalizeOrder = finalizeOrder;