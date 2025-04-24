import app from "../../../src/index";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

describe.skip("Categories endpoints", () => {
  it("GET /categories should show all categories from db", async () => {
    const res = await requestWithSupertest.get("/categories");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("General GET HTTP method on categories resource");
  });

  it("GET /categories/:categoryId should show categories with specified categoryId", async () => {
    const res = await requestWithSupertest.get("/categories/:1");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "GET HTTP method on categories resource for categories/:1"
    );
  });

  it("POST /categories should create a new category to the categories table", async () => {
    const res = await requestWithSupertest.post("/categories");
    expect(res.status).toEqual(201);
    expect(res.text).toEqual("POST HTTP method on categories resource");
  });

  it("PUT /categories/:categoryId should update categories with specified categoryId", async () => {
    const res = await requestWithSupertest.put("/categories/:2");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "PUT HTTP method on categories resource for categories/:2"
    );
  });

  it("DELETE /categories/:categoryId should delete categories with specified categoryId", async () => {
    const res = await requestWithSupertest.delete("/categories/:3");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "DELETE HTTP method on categories resource for categories/:3"
    );
  });
});
