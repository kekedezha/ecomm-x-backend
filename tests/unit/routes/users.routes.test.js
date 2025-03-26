import app from "../../../src/index";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

describe("Users endpoints", () => {
  it("GET /users should show all users from db", async () => {
    const res = await requestWithSupertest.get("/users");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("General GET HTTP method on users resource");
  });

  it("GET /users/:userId should show user with specified userId", async () => {
    const res = await requestWithSupertest.get("/users/:1");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("GET HTTP method on user resource for users/:1");
  });

  it("POST /users should create a new user to the users table", async () => {
    const res = await requestWithSupertest.post("/users");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("POST HTTP method on users resource");
  });

  it("PUT /users/:userId should update user with specified userId", async () => {
    const res = await requestWithSupertest.put("/users/:2");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("PUT HTTP method on users resource for users/:2");
  });

  it("DELETE /users/:userId should delete user with specified userId", async () => {
    const res = await requestWithSupertest.delete("/users/:3");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "DELETE HTTP method on users resource for users/:3"
    );
  });
});
