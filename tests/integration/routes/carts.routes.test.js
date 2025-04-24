import app from "../../../src/index";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

describe.skip("Carts endpoints", () => {
  it("GET /carts should show all carts from db", async () => {
    const res = await requestWithSupertest.get("/carts");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("General GET HTTP method on carts resource");
  });

  it("GET /carts/:cartId should show cart with specified cartId", async () => {
    const res = await requestWithSupertest.get("/carts/:1");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("GET HTTP method on carts resource for carts/:1");
  });

  it("POST /carts should create a new cart to the carts table", async () => {
    const res = await requestWithSupertest.post("/carts");
    expect(res.status).toEqual(201);
    expect(res.text).toEqual("POST HTTP method on carts resource");
  });

  it("PUT /carts/:cartId should update cart with specified cartId", async () => {
    const res = await requestWithSupertest.put("/carts/:2");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("PUT HTTP method on carts resource for carts/:2");
  });

  it("DELETE /carts/:cartId should delete cart with specified cartId", async () => {
    const res = await requestWithSupertest.delete("/carts/:3");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "DELETE HTTP method on carts resource for carts/:3"
    );
  });
});
