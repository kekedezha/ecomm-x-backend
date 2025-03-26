import app from "../../../src/index";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

describe("Products endpoints", () => {
  it("GET /products should show all products from db", async () => {
    const res = await requestWithSupertest.get("/products");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("General GET HTTP method on products resource");
  });

  it("GET /products/:productId should show product with specified productId", async () => {
    const res = await requestWithSupertest.get("/products/:1");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "GET HTTP method on products resource for products/:1"
    );
  });

  it("POST /products should create a new product to the products table", async () => {
    const res = await requestWithSupertest.post("/products");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("POST HTTP method on products resource");
  });

  it("PUT /products/:productId should update product with specified productId", async () => {
    const res = await requestWithSupertest.put("/products/:2");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "PUT HTTP method on products resource for products/:2"
    );
  });

  it("DELETE /products/:productId should delete product with specified productId", async () => {
    const res = await requestWithSupertest.delete("/products/:3");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "DELETE HTTP method on products resource for products/:3"
    );
  });
});
