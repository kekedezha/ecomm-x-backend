import app from "../../../src/index";
import supertest from "supertest";
import pool from "../../../src/db";

const requestWithSupertest = supertest(app);
let adminLogin;
let adminToken;

beforeAll(async () => {
  // Login with admin role to use throughout admin/protected routes
  adminLogin = await requestWithSupertest.post("/users/login").send({
    email: "dezha6@hotmail.com",
    password: process.env.ADMIN_PASSWORD,
  });
  adminToken = adminLogin.body.token;
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

  describe.skip("GET HTTP method to retrieve all products by category", () => {
    it("GET /categories/:categoryId should show categories with specified categoryId", async () => {
      const res = await requestWithSupertest.get("/categories/:1");
      expect(res.status).toEqual(200);
      expect(res.text).toEqual(
        "GET HTTP method on categories resource for categories/:1"
      );
    });
  });

  // POST REQUEST TESTS
  describe.skip("POST HTTP method to add a new category to the db", () => {
    it("POST /categories should create a new category to the categories table", async () => {
      const res = await requestWithSupertest.post("/categories");
      expect(res.status).toEqual(201);
      expect(res.text).toEqual("POST HTTP method on categories resource");
    });
  });

  // PUT REQUEST TESTS
  describe.skip("PUT HTTP method to update a cateogry", () => {
    it("PUT /categories/:categoryId should update categories with specified categoryId", async () => {
      const res = await requestWithSupertest.put("/categories/:2");
      expect(res.status).toEqual(200);
      expect(res.text).toEqual(
        "PUT HTTP method on categories resource for categories/:2"
      );
    });
  });

  // DELETE REQUEST TESTS
  describe.skip("DELETE HTTP method to delete a category from the db", () => {
    it("DELETE /categories/:categoryId should delete categories with specified categoryId", async () => {
      const res = await requestWithSupertest.delete("/categories/:3");
      expect(res.status).toEqual(200);
      expect(res.text).toEqual(
        "DELETE HTTP method on categories resource for categories/:3"
      );
    });
  });
});

// Ensure db connection pool closes after all the tests to ensure proper teardown and prevent data leaks
afterAll(async () => {
  await pool.end(); // close db connection
});
