import app from "../../../src/index";
import supertest from "supertest";
import pool from "../../../src/db";
import "dotenv/config";

const requestWithSupertest = supertest(app);
let adminLogin;
let adminToken;
let userLogin;
let userToken;
let newCategoryId;

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

describe("Categories endpoints", () => {
  // GET REQUEST TESTS
  describe("GET HTTP method to retrieve all categories", () => {
    it("GET /categories should show all categories from db", async () => {
      const res = await requestWithSupertest.get("/categories");
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
          }),
        ])
      );
    });
  });

  describe("GET HTTP method to retrieve all products by category", () => {
    it("GET /categories/:categoryId/products should show products with specified categoryId", async () => {
      const res = await requestWithSupertest.get("/categories/1/products");
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.products).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            description: expect.any(String),
            price: expect.any(String),
            stock: expect.any(Number),
            category_id: expect.any(Number),
          }),
        ])
      );
    });

    it("GET /categories/bread/products should fail to show products with an invalid category id", async () => {
      const res = await requestWithSupertest.get("/categories/bread/products");
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Bad Request. Invalid Category ID.");
    });

    it("GET /categories/999/products should fail show products because the category id was not found", async () => {
      const res = await requestWithSupertest.get("/categories/999/products");
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Category not found.");
    });
  });

  // POST REQUEST TESTS
  describe("POST HTTP method to add a new category to the db", () => {
    it("POST /categories/admin should fail to create a new category because they are not logged in as an admin", async () => {
      const res = await requestWithSupertest
        .post("/categories/admin")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(403);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Access denied.");
    });

    it("POST /categories/admin should fail to create a new category because nothing was sent over", async () => {
      const res = await requestWithSupertest
        .post("/categories/admin")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Bad Request. Missing category name.");
    });

    it("POST /categories/admin should create a new category to the categories table", async () => {
      const res = await requestWithSupertest
        .post("/categories/admin")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ newCategory: "Sweet Treat" });
      expect(res.status).toEqual(201);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.message).toEqual("Successfully created new category.");
      newCategoryId = res.body.new_category.id;
    });
  });

  // PUT REQUEST TESTS
  describe.skip("PUT HTTP method to update a category", () => {
    it("PUT /categories/admin/:categoryId should update categories with specified categoryId", async () => {
      const res = await requestWithSupertest.put("/categories/admin/2");
      expect(res.status).toEqual(200);
      expect(res.text).toEqual(
        "PUT HTTP method on categories resource for categories/:2"
      );
    });
  });

  // DELETE REQUEST TESTS
  describe("DELETE HTTP method to delete a category from the db", () => {
    it("DELETE /categories/admin/:categoryId should delete categories with specified categoryId", async () => {
      const res = await requestWithSupertest
        .delete(`/categories/admin/${newCategoryId}`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.message).toEqual("Successfully deleted category.");
    });
  });
});

// Ensure db connection pool closes after all the tests to ensure proper teardown and prevent data leaks
afterAll(async () => {
  await pool.end(); // close db connection
});
