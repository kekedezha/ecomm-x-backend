import app from "../../../src/index";
import supertest from "supertest";
import pool from "../../../src/db";

const requestWithSupertest = supertest(app);

describe("Products endpoints", () => {
  describe("GET HTTP method to retrieve all products", () => {
    it("GET /products should show all products from db", async () => {
      const res = await requestWithSupertest.get("/products");
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            price: expect.any(String),
            stock: expect.any(Number),
            category_id: expect.any(Number),
            created_at: expect.any(String),
          }),
        ])
      );
    });
  });

  describe("GET HTTP method to retrieve one single product", () => {
    it("GET /products/1 should retrieve product with id of 1 which is a baguette", async () => {
      const res = await requestWithSupertest.get("/products/1");
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.id).toEqual(1);
      expect(res.body.name).toEqual("Baguette");
      expect(res.body.description).toEqual(
        "Long, thin type of bread of French origin."
      );
    });
  });
  // it("POST /products should create a new product to the products table", async () => {
  //   const res = await requestWithSupertest.post("/products");
  //   expect(res.status).toEqual(201);
  //   expect(res.text).toEqual("POST HTTP method on products resource");
  // });

  // it("PUT /products/:productId should update product with specified productId", async () => {
  //   const res = await requestWithSupertest.put("/products/:2");
  //   expect(res.status).toEqual(200);
  //   expect(res.text).toEqual(
  //     "PUT HTTP method on products resource for products/:2"
  //   );
  // });

  // it("DELETE /products/:productId should delete product with specified productId", async () => {
  //   const res = await requestWithSupertest.delete("/products/:3");
  //   expect(res.status).toEqual(200);
  //   expect(res.text).toEqual(
  //     "DELETE HTTP method on products resource for products/:3"
  //   );
  // });
});

// Ensure db connection pool closes after all the tests to ensure proper teardown and prevent data leaks
afterAll(async () => {
  await pool.end(); // close db connection
});
