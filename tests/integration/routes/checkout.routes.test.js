import app from "../../../src/index";
import supertest from "supertest";
import pool from "../../../src/config/db";
import "dotenv/config";

const requestWithSupertest = supertest(app);
let adminLogin;
let adminToken;
let userLogin;
let userToken;

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

describe("Checkout endpoints", () => {
  it("POST /checkout/2 should fail to checkout and mark an order as paid because the user is not logged in", async () => {
    const res = await requestWithSupertest.post("/checkout/2");
    expect(res.status).toEqual(401);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.error).toEqual("Invalid token.");
  });

  it("POST /checkout/3 should fail to checkout and mark an order as paid because the user id does not match the user id of the logged in user", async () => {
    const res = await requestWithSupertest
      .post("/checkout/3")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toEqual(401);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.error).toEqual(
      "User is not authorized to view user information that is not one's self."
    );
  });

  it("POST /checkout/2 should fail to checkout and mark an order as paid because an invalid orderId was sent", async () => {
    const res = await requestWithSupertest
      .post("/checkout/2")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.error).toEqual(
      "Bad request. Invalid order id. Order id must be a number."
    );
  });

  it("POST /checkout/2 should fail to checkout and mark an order as paid because an invalid amount was sent", async () => {
    const res = await requestWithSupertest
      .post("/checkout/2")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ orderId: 9090 });
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.error).toEqual(
      "Bad request. Invalid order amount. Amount must be a number."
    );
  });

  it("POST /checkout/2 should fail to checkout and mark an order as paid because the payment method is missing", async () => {
    const res = await requestWithSupertest
      .post("/checkout/2")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ orderId: 9090, amount: 20.99 });
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.error).toEqual("Bad request. Missing payment method.");
  });

  it("POST /checkout/2 should fail to checkout and mark an order as paid because the order id sent over was not found", async () => {
    const res = await requestWithSupertest
      .post("/checkout/2")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ orderId: 9090, amount: 20.99, paymentMethod: "Credit Card" });
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.error).toEqual("Order id not found.");
  });

  it("POST /checkout/2 should fail to checkout and mark an order as paid because the order does not have a status of 'PENDING' and therefor is not eligible for checkout", async () => {
    const productOneAdditionRes = await requestWithSupertest
      .post("/carts/2")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId: 1, quantity: 1 });
    expect(productOneAdditionRes.status).toEqual(201);
    const productTwoAdditionRes = await requestWithSupertest
      .post("/carts/2")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId: 5, quantity: 3 });
    expect(productTwoAdditionRes.status).toEqual(201);
    const createOrderOneRes = await requestWithSupertest
      .post("/orders/2")
      .set("Authorization", `Bearer ${userToken}`);
    const orderIdOne = createOrderOneRes.body.order_id;
    expect(createOrderOneRes.status).toEqual(201);
    const statusUpdateOrderOneRes = await requestWithSupertest
      .put(`/orders/admin/2/${orderIdOne}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ statusUpdate: "READY FOR PICK-UP" });
    expect(statusUpdateOrderOneRes.status).toEqual(200);
    const res = await requestWithSupertest
      .post("/checkout/2")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        orderId: orderIdOne,
        amount: 18.96,
        paymentMethod: "Credit Card",
      });
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.error).toEqual("Order is not eligible for checkout.");
    const deleteOrderOneRes = await requestWithSupertest
      .delete(`/orders/admin/${orderIdOne}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(deleteOrderOneRes.status).toEqual(200);
  });

  it("POST /checkout/2 should fail to checkout and mark an order as paid because the checkout amount sent over does not match the order total", async () => {
    const productOneAdditionRes = await requestWithSupertest
      .post("/carts/2")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId: 1, quantity: 1 });
    expect(productOneAdditionRes.status).toEqual(201);
    const productTwoAdditionRes = await requestWithSupertest
      .post("/carts/2")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId: 5, quantity: 3 });
    expect(productTwoAdditionRes.status).toEqual(201);
    const createOrderTwoRes = await requestWithSupertest
      .post("/orders/2")
      .set("Authorization", `Bearer ${userToken}`);
    const orderIdTwo = createOrderTwoRes.body.order_id;
    expect(createOrderTwoRes.status).toEqual(201);
    const res = await requestWithSupertest
      .post("/checkout/2")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        orderId: orderIdTwo,
        amount: 9.96,
        paymentMethod: "Credit Card",
      });
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.error).toEqual("Payment does not match order total.");
    const deleteOrderOneRes = await requestWithSupertest
      .delete(`/orders/admin/${orderIdTwo}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(deleteOrderOneRes.status).toEqual(200);
  });

  it("POST /checkout/2 should fail to checkout and mark an order as paid because the user is trying to purchase a product more that what is available", async () => {
    const productOneAdditionRes = await requestWithSupertest
      .post("/carts/2")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId: 1, quantity: 1 });
    expect(productOneAdditionRes.status).toEqual(201);
    const productTwoAdditionRes = await requestWithSupertest
      .post("/carts/2")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId: 5, quantity: 100 });
    expect(productTwoAdditionRes.status).toEqual(201);
    const createOrderThreeRes = await requestWithSupertest
      .post("/orders/2")
      .set("Authorization", `Bearer ${userToken}`);
    const orderIdThree = createOrderThreeRes.body.order_id;
    const orderThreeTotal = createOrderThreeRes.body.total_price;
    expect(createOrderThreeRes.status).toEqual(201);
    const res = await requestWithSupertest
      .post("/checkout/2")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        orderId: orderIdThree,
        amount: orderThreeTotal,
        paymentMethod: "Credit Card",
      });
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.error).toEqual("Insufficient inventory for products.");
    const deleteOrderOneRes = await requestWithSupertest
      .delete(`/orders/admin/${orderIdThree}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(deleteOrderOneRes.status).toEqual(200);
  });

  it("POST /checkout/2 should checkout an order and mark it as paid", async () => {
    const productOneAdditionRes = await requestWithSupertest
      .post("/carts/2")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId: 1, quantity: 1 });
    expect(productOneAdditionRes.status).toEqual(201);
    const productTwoAdditionRes = await requestWithSupertest
      .post("/carts/2")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId: 5, quantity: 3 });
    expect(productTwoAdditionRes.status).toEqual(201);
    const createOrderFourRes = await requestWithSupertest
      .post("/orders/2")
      .set("Authorization", `Bearer ${userToken}`);
    const orderIdFour = createOrderFourRes.body.order_id;
    const orderFourTotal = createOrderFourRes.body.total_price;
    expect(createOrderFourRes.status).toEqual(201);
    const res = await requestWithSupertest
      .post("/checkout/2")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        orderId: orderIdFour,
        amount: orderFourTotal,
        paymentMethod: "Credit Card",
      });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.message).toEqual(
      "Payment successful. Order status updated to PAID."
    );
    // Will have this commented out for now. Testing and end point works. Order matches payment
    //   const deleteOrderOneRes = await requestWithSupertest
    //     .delete(`/orders/admin/${orderIdFour}`)
    //     .set("Authorization", `Bearer ${adminToken}`);
    //   expect(deleteOrderOneRes.status).toEqual(200);
  });
});

// Ensure db connection pool closes after all the tests to ensure proper teardown and prevent data leaks
afterAll(async () => {
  await pool.end(); // close db connection
});
