import app from "../../../src/index";
import supertest from "supertest";
import pool from "../../../src/db";

const requestWithSupertest = supertest(app);

describe("Users endpoints", () => {
  let userId;

  describe("GET HTTP method to retrieve all users", () => {
    it("GET /users/admin should show all users from db", async () => {
      const res = await requestWithSupertest.get("/users/admin");
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            username: expect.any(String),
            email: expect.any(String),
            first_name: expect.any(String),
            last_name: expect.any(String),
            address: expect.any(String),
            created_at: expect.any(String),
          }),
        ])
      );
    });
  });

  describe("GET HTTP method to retrieve one single user", () => {
    it("GET /users/1 should retrieve user with id of 1 which is a Christian", async () => {
      const res = await requestWithSupertest.get("/users/1");
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.id).toEqual(1);
      expect(res.body.first_name).toEqual("Christian");
      expect(res.body.last_name).toEqual("Dezha");
    });

    it("GET /users/999 should fail to retrieve a users with id of 999", async () => {
      const res = await requestWithSupertest.get("/users/999");
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("User not found.");
    });
  });

  describe("POST HTTP method to register a new user to the database", () => {
    it("POST /users/register should add a new user, Luffy", async () => {
      const res = await requestWithSupertest.post("/users/register").send({
        username: "kopMonkeyDLuffy",
        email: "dluffy@gmail.com",
        password: "ilovemeat",
        firstName: "Luffy",
        lastName: "Monkey",
        address: "Somewhere in the New World",
      });
      userId = parseInt(res.body.user.id, 10);
      expect(res.status).toEqual(201);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.user).toEqual(
        expect.objectContaining({
          username: "kopMonkeyDLuffy",
          first_name: "Luffy",
        })
      );
    });

    it("POST /users/register should fail to create a new product with insufficient/missing information", async () => {
      const res = await requestWithSupertest.post("/users/register").send({
        firstName: "Ace",
        lastName: "Portagas",
      });
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual(
        "Bad Request. Missing or invalid user information."
      );
    });
  });

  describe("PUT HTTP method to update/modify a user from the database", () => {
    it(`PUT /users/xx should update the user created in the POST request to /users/register path and update the name be Nika`, async () => {
      const res = await requestWithSupertest.put(`/users/${userId}`).send({
        username: "Nika",
      });
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.id).toEqual(userId);
      expect(res.body.username).toEqual("Nika");
    });
    it("PUT /users/999 should fail to update the user because it does not exist in the database", async () => {
      const res = await requestWithSupertest.put("/users/999").send({
        username: "Luffy-chan",
      });
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("User not found.");
    });
    it("PUT /users/test should fail to update because of invalid path/userId", async () => {
      const res = await requestWithSupertest.put("/users/test").send({
        username: "Mugi-chan",
      });
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Invalid user ID.");
    });

    it(`PUT /users/xx should fail to update with no information sent over with the request`, async () => {
      const res = await requestWithSupertest.put(`/users/${userId}`);
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("No fields provided for update.");
    });
  });

  describe("DELETE HTTP method to delete a specified user from the database", () => {
    it(`DELETE /users/xx should delete the user created in the POST request to the path /users/register from the database`, async () => {
      const res = await requestWithSupertest.delete(`/users/${userId}`);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.message).toEqual("Successfully deleted product.");
    });

    it("DELETE /users/999 should fail to delete a product not found in the database", async () => {
      const res = await requestWithSupertest.delete("/users/999");
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("User not found.");
    });

    it("PUT /users/test should fail to delete a product with an invalid path/productId", async () => {
      const res = await requestWithSupertest.put("/users/test");
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.error).toEqual("Invalid user ID.");
    });
  });
});

// Ensure db connection pool closes after all the tests to ensure proper teardown and prevent data leaks
afterAll(async () => {
  await pool.end(); // close db connection
});
