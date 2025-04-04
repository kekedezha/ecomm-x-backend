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

    it("GET /products/999 should fail to retrieve a product with id of 999", async () => {
      const res = await requestWithSupertest.get("/products/999");
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Product not found.");
    });
  });

  describe("POST HTTP method to add a new product to the database", () => {
    it("POST /products should add a new product with id of 99, a concha", async () => {
      const res = await requestWithSupertest.post("/products").send({
        id: "99",
        name: "Concha",
        description: "Mexican sweet bread. This is a simple test. DELETE LATER",
        price: "4.99",
        stock: "25",
        categoryId: "2",
      });
      expect(res.status).toEqual(201);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.product).toEqual(
        expect.objectContaining({
          id: 99,
          name: "Concha",
          description: expect.any(String),
          price: expect.any(String),
          stock: expect.any(Number),
          category_id: expect.any(Number),
          created_at: expect.any(String),
        })
      );
    });

    it("POST /products should fail to create a new product with insufficient/missing information", async () => {
      const res = await requestWithSupertest.post("/products").send({
        id: "100",
        description: "Mexican sweet bread. This is a simple test. DELETE LATER",
        price: "4.99",
        stock: "25",
        categoryId: "2",
      });
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual(
        "Bad Request. Missing or invalid product information."
      );
    });
  });

  describe("PUT HTTP method to update/modify a product from the database", () => {
    it("PUT /products/99 should update the product with the specified id of 99. It should update the name be Oreja", async () => {
      const res = await requestWithSupertest.put("/products/99").send({
        name: "Oreja",
      });
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.id).toEqual(99);
      expect(res.body.name).toEqual("Oreja");
    });
    it("PUT /products/999 should fail to update the product because it does not exist in the database", async () => {
      const res = await requestWithSupertest.put("/products/999").send({
        name: "Ojo de wey",
      });
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Product not found.");
    });
    it("PUT /products/test should fail to update because of invalid path/productId", async () => {
      const res = await requestWithSupertest.put("/products/test").send({
        name: "Puerco",
      });
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Invalid product ID.");
    });

    it("PUT /products/99 should fail to update with no information sent over with the request", async () => {
      const res = await requestWithSupertest.put("/products/99");
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("No fields provided for update.");
    });
  });

  describe("DELETE HTTP method to delete a specified product from the database", () => {
    it("DELETE /products/99 should delete the product with id of 99 from the database", async () => {
      const res = await requestWithSupertest.delete("/products/99");
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.message).toEqual("Successfully deleted product.");
    });

    it("DELETE /products/999 should fail to delete a product not found in the database", async () => {
      const res = await requestWithSupertest.delete("/products/999");
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Product not found.");
    });

    it("PUT /products/test should fail to delete a product with an invalid path/productId", async () => {
      const res = await requestWithSupertest.put("/products/test");
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Invalid product ID.");
    });
  });
});

// Ensure db connection pool closes after all the tests to ensure proper teardown and prevent data leaks
afterAll(async () => {
  await pool.end(); // close db connection
});
