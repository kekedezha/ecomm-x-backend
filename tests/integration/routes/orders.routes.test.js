import app from "../../../src/index";
import supertest from "supertest";
import pool from "../../../src/db";
import "dotenv/config";

const requestWithSupertest = supertest(app);
let adminLogin;
let adminToken;
let userLogin;
let userToken;
let orderIdOne;
let orderIdTwo;

beforeAll(async () => {
  // Login with admin role to use throughout admin/protected routes
  adminLogin = await requestWithSupertest.post("/users/login").send({
    email: "dezha6@hotmail.com",
    password: process.env.ADMIN_PASSWORD,
  });
  adminToken = adminLogin.body.token;

  // Login with user role to use throughout protected routes
  userLogin = await requestWithSupertest
    .post("/users/login")
    .send({ email: "yuki@gmail.com", password: process.env.YUKI_PASSWORD });
  userToken = userLogin.body.token;
});

describe("Orders endpoints", () => {
  // GET REQUEST TESTS
  describe("GET HTTP method for admin user to retrieve all orders for all users", () => {
    it("GET /orders/admin should show all orders from db", async () => {
      const res = await requestWithSupertest
        .get("/orders/admin")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
    });

    it("GET /orders/admin should fail to show all orders for admin because logged in user is not an admin user", async () => {
      const res = await requestWithSupertest
        .get("/orders/admin")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(403);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Access denied.");
    });
  });

  describe("GET HTTP method to retrieve user's orders", () => {
    it("GET /orders/2 should show all orders that belong to user with an id of 2", async () => {
      const res = await requestWithSupertest
        .get("/orders/2")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
    });
    it("GET /orders/3 should show all orders that belong to user with an id of 2", async () => {
      const res = await requestWithSupertest
        .get("/orders/3")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(401);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual(
        "User is not authorized to view user information that is not one's self."
      );
    });
    it("GET /orders/bread should show all orders that belong to user with an id of 2", async () => {
      const res = await requestWithSupertest
        .get("/orders/bread")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(401);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual(
        "User is not authorized to view user information that is not one's self."
      );
    });
  });

  // POST REQUEST TESTS
  describe("POST HTTP method to fail to create a new order", () => {
    it("POST /orders/2 should fail to create a new order because the users cart is empty", async () => {
      const res = await requestWithSupertest
        .post("/orders/2")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Cart is empty.");
    });

    it("POST /orders/3 should fail to create a new order because the logged in user is different from user of id 3", async () => {
      const res = await requestWithSupertest
        .post("/orders/3")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(401);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual(
        "User is not authorized to view user information that is not one's self."
      );
    });
  });

  // POST REQUEST TESTS
  describe("POST HTTP method to create a new order", () => {
    it("Add one baguette to the users cart", async () => {
      // ADD PRODUCTS TO CARTS TO BE ABLE TO CREATE ORDER(S)
      const res = await requestWithSupertest
        .post("/carts/2")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ productId: 1, quantity: 1 });
      expect(res.status).toEqual(201);
    });

    it("Add 3 almond croissants to the users cart", async () => {
      const res = await requestWithSupertest
        .post("/carts/2")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ productId: 5, quantity: 3 });
      expect(res.status).toEqual(201);
    });

    it("POST /orders/2 should create a new order to the orders table", async () => {
      const res = await requestWithSupertest
        .post("/orders/2")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(201);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toEqual({
        message:
          "Successfully submitted order and is awaiting to begin being processed.",
        order_id: expect.any(Number),
        total_price: 18.96,
      });
      orderIdOne = res.body.order_id;
    });

    it("Add one sourdough loaf to the users cart", async () => {
      // ADD PRODUCTS TO CARTS TO BE ABLE TO CREATE ORDER(S)
      const res = await requestWithSupertest
        .post("/carts/2")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ productId: 2, quantity: 1 });
      expect(res.status).toEqual(201);
    });

    it("Add 3 blueberry danishes to the users cart", async () => {
      const res = await requestWithSupertest
        .post("/carts/2")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ productId: 6, quantity: 2 });
      expect(res.status).toEqual(201);
    });

    it("POST /orders/2 should create a new order to the orders table", async () => {
      const res = await requestWithSupertest
        .post("/orders/2")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(201);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toEqual({
        message:
          "Successfully submitted order and is awaiting to begin being processed.",
        order_id: expect.any(Number),
        total_price: 13.97,
      });
      orderIdTwo = res.body.order_id;
    });
  });

  // GET REQUEST TESTS
  describe("GET HTTP method to get all order created above", () => {
    it("GET /orders/admin should show all orders created above by user with an ID of 2", async () => {
      const res = await requestWithSupertest
        .get("/orders/admin")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.length).toEqual(2);
    });
  });

  // PUT REQUEST TESTS
  describe("PUT HTTP method to update order status", () => {
    it("PUT /orders/admin/2/5 should fail to update order with specified orderId because logged in user does not have admin rights", async () => {
      const res = await requestWithSupertest
        .put("/orders/admin/2/5")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(403);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Access denied.");
    });

    it("PUT /orders/admin/2/5 should fail to update order with specified orderId because user ID is invalid", async () => {
      const res = await requestWithSupertest
        .put("/orders/admin/crumb/5")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Bad Request. Not a valid user ID.");
    });

    it("PUT /orders/admin/2/5 should fail to update order with specified orderId because logged user ID does not exist", async () => {
      const res = await requestWithSupertest
        .put("/orders/admin/999/5")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("User not found.");
    });

    it("PUT /orders/admin/2/crumb should fail to update order with specified orderId because order ID is invalid", async () => {
      const res = await requestWithSupertest
        .put("/orders/admin/2/crumb")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Bad Request. Invalid Order ID.");
    });

    it("PUT /orders/admin/2/99999 should fail to update order with specified orderId because order ID does not exist for user", async () => {
      const res = await requestWithSupertest
        .put("/orders/admin/2/99999")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ statusUpdate: "PROCESSING" });
      console.log(res.body.error);
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Order not found.");
    });

    it("PUT /orders/admin/2/xx should fail to update order with specified orderId because order status was not sent over", async () => {
      const res = await requestWithSupertest
        .put(`/orders/admin/2/${orderIdOne}`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Bad Request. Invalid status.");
    });

    it("PUT /orders/admin/2/xx should update order with specified orderId to PROCESSING", async () => {
      const res = await requestWithSupertest
        .put(`/orders/admin/2/${orderIdOne}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ statusUpdate: "PROCESSING" });
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.message).toEqual("Successfully updated status of order.");
    });

    it("PUT /orders/admin/2/xx should update order with specified orderId to READY FOR PICK-UP", async () => {
      const res = await requestWithSupertest
        .put(`/orders/admin/2/${orderIdTwo}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ statusUpdate: "READY FOR PICK-UP" });
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.message).toEqual("Successfully updated status of order.");
    });
  });

  // DELETE REQUEST TESTS
  describe("DELETE HTTP method to delete an order", () => {
    it("DELETE /orders/admin/order1 should fail to delete order with specified ID because it is not a valid order ID", async () => {
      const res = await requestWithSupertest
        .delete("/orders/admin/order1")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Bad Request. Invalid Order ID.");
    });
    it("DELETE /orders/admin/99999 should fail to delete order with specified orderId because the order ID does not exist", async () => {
      const res = await requestWithSupertest
        .delete("/orders/admin/99999")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Order not found.");
    });
    it("DELETE /orders/admin/5 should fail to delete order with specified orderId because the user does not have admin rights", async () => {
      const res = await requestWithSupertest
        .delete("/orders/admin/5")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(403);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Access denied.");
    });
    it(`DELETE /orders/admin/${orderIdOne} should delete order with specified orderId`, async () => {
      const res = await requestWithSupertest
        .delete(`/orders/admin/${orderIdOne}`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.message).toEqual("Successfully deleted order.");
    });
    it(`DELETE /orders/admin/${orderIdTwo} should delete order with specified orderId`, async () => {
      const res = await requestWithSupertest
        .delete(`/orders/admin/${orderIdTwo}`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.message).toEqual("Successfully deleted order.");
    });
  });
});

// Ensure db connection pool closes after all the tests to ensure proper teardown and prevent data leaks
afterAll(async () => {
  await pool.end(); // close db connection
});
