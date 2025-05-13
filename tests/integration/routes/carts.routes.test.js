import app from "../../../src/index";
import supertest from "supertest";
import pool from "../../../src/config/db";
import "dotenv/config";

const requestWithSupertest = supertest(app);
let userLogin;
let userToken;

beforeAll(async () => {
  userLogin = await requestWithSupertest
    .post("/users/login")
    .send({ email: "yuki@gmail.com", password: process.env.YUKI_PASSWORD });
  userToken = userLogin.body.token;
});

describe("Carts endpoints", () => {
  // GET REQUEST TESTS
  describe("GET HTTP method to retrieve cart", () => {
    it("GET .../carts/2 should return all the products from the users cart with userId of 2", async () => {
      const res = await requestWithSupertest
        .get("/carts/2")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toEqual([]);
    });

    it("GET .../carts/3 should fail with a 401 status code for trying to get a cart that is not theirs because they are logged in as userId 2", async () => {
      const res = await requestWithSupertest
        .get("/carts/3")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(401);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual(
        "User is not authorized to view user information that is not one's self."
      );
    });
  });

  // POST REQUEST TESTS
  describe("POST HTTP method to add a new product or update product quantity", () => {
    it("POST .../carts/2 should add a baguette to the users cart, with the proper information given", async () => {
      const res = await requestWithSupertest
        .post("/carts/2")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ productId: 1, quantity: 1 });
      expect(res.status).toEqual(201);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.message).toEqual(
        "Successfully added new product to cart."
      );
      expect(res.body.addedProduct).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          cart_id: 2,
          product_id: 1,
          quantity: 1,
        })
      );
    });
    it("POST .../carts/2 should add a almond croissant to the users cart, with the proper information given", async () => {
      const res = await requestWithSupertest
        .post("/carts/2")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ productId: 5, quantity: 3 });
      expect(res.status).toEqual(201);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.message).toEqual(
        "Successfully added new product to cart."
      );
      expect(res.body.addedProduct).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          cart_id: 2,
          product_id: 5,
          quantity: 3,
        })
      );
    });
    it("POST .../carts/2 should add a blue berry danish to the users cart, with the proper information given", async () => {
      const res = await requestWithSupertest
        .post("/carts/2")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ productId: 6, quantity: 2 });
      expect(res.status).toEqual(201);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.message).toEqual(
        "Successfully added new product to cart."
      );
      expect(res.body.addedProduct).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          cart_id: 2,
          product_id: 6,
          quantity: 2,
        })
      );
    });
    it("POST .../carts/2 should fail to add a product to cart because no product was given", async () => {
      const res = await requestWithSupertest
        .post("/carts/2")
        .set("Authorization", `Bearer ${userToken}`)
        .send({});
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Bad Request. No product id given.");
    });
    it("POST .../carts/2 should fail to add a product to cart because a product was given but it is not in the products table", async () => {
      const res = await requestWithSupertest
        .post("/carts/2")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ productId: 10, quantity: 2 });
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Product does not exist.");
    });
    it("POST .../carts/2 should add more baguettes to the users cart, with the proper information given", async () => {
      const res = await requestWithSupertest
        .post("/carts/2")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ productId: 1, quantity: 4 });
      expect(res.status).toEqual(201);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.message).toEqual("Successfully added product to cart.");
      expect(res.body.addedProduct).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          cart_id: 2,
          product_id: 1,
          quantity: 5,
        })
      );
    });
  });

  // PUT REQUEST TESTS
  describe("PUT HTTP method to update a product's quantity", () => {
    it("PUT .../carts/2/5 should update the specified product's quantity", async () => {
      const res = await requestWithSupertest
        .put("/carts/2/5")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ quantity: 3 });
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.message).toEqual(
        "Successfully updated quantity of product."
      );
      expect(res.body.updatedProduct).toEqual({
        id: expect.any(Number),
        cart_id: 2,
        product_id: 5,
        quantity: 3,
      });
    });

    it("PUT .../carts/2/butter should fail to update because no product was given", async () => {
      const res = await requestWithSupertest
        .put("/carts/2/butter")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ quantity: 3 });
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Bad Request. Not a valid product.");
    });

    it("PUT .../carts/2/900 should fail to update because the product id given is not in the cart or does not exist in the db", async () => {
      const res = await requestWithSupertest
        .put("/carts/2/900")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ quantity: 3 });
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Product not in cart.");
    });
  });

  // DELETE REQUEST TESTS
  describe("DELETE HTTP method to remove a product from the users cart", () => {
    it("DELETE .../carts/2/1 should delete the specified from the users cart", async () => {
      const res = await requestWithSupertest
        .delete("/carts/2/1")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.message).toEqual(
        "Successfully deleted product from cart."
      );
      expect(res.body.deletedProduct).toEqual({
        id: expect.any(Number),
        cart_id: 2,
        product_id: 1,
        quantity: 5,
      });
    });

    it("DELETE .../carts/2/flour should fail to delete the specified from the users cart because an invalid product was given", async () => {
      const res = await requestWithSupertest
        .delete("/carts/2/flour")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Bad Request. Not a valid product.");
    });

    it("DELETE .../carts/2/999999 should fail to delete the specified from the users cart because the product does not exist in the users cart or db", async () => {
      const res = await requestWithSupertest
        .delete("/carts/2/999999")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Product not in cart.");
    });
  });

  // GET REQUEST TESTS
  describe("GET HTTP method to retrieve cart", () => {
    it("GET .../carts/2 should return all the products from the users cart added in the previous tests", async () => {
      const res = await requestWithSupertest
        .get("/carts/2")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            cart_id: expect.any(Number),
            product_id: expect.any(Number),
            quantity: expect.any(Number),
          }),
        ])
      );
    });
  });

  // DELETE REQUEST TESTS
  describe("DELETE HTTP to clear the users cart", () => {
    it("DELETE .../carts/3 should fail to clear the users cart of all the products because it is logged in as user 2", async () => {
      const res = await requestWithSupertest
        .delete("/carts/3")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(401);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual(
        "User is not authorized to view user information that is not one's self."
      );
    });

    it("DELETE .../carts/butter should fail to clear the users cart of all the products because it is an invalid user id", async () => {
      const res = await requestWithSupertest
        .delete("/carts/butter")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(401);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual(
        "User is not authorized to view user information that is not one's self."
      );
    });

    it("DELETE .../carts/2 should clear the users cart of all the products", async () => {
      const res = await requestWithSupertest
        .delete("/carts/2")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.message).toEqual(
        "Successfully deleted all products from cart."
      );
    });
  });
});

// Ensure db connection pool closes after all the tests to ensure proper teardown and prevent data leaks
afterAll(async () => {
  await pool.end(); // close db connection
});
