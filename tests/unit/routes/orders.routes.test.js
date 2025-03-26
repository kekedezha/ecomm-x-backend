import app from "../../../src/index";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

describe("Orders endpoints", () => {
  it("GET /orders should show all orders from db", async () => {
    const res = await requestWithSupertest.get("/orders");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("General GET HTTP method on orders resource");
  });

  it("GET /orders/:orderId should show order with specified orderId", async () => {
    const res = await requestWithSupertest.get("/orders/:1");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "GET HTTP method on orders resource for orders/:1"
    );
  });

  it("POST /orders should create a new order to the orders table", async () => {
    const res = await requestWithSupertest.post("/orders");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("POST HTTP method on orders resource");
  });

  it("PUT /orders/:orderId should update order with specified orderId", async () => {
    const res = await requestWithSupertest.put("/orders/:2");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "PUT HTTP method on orders resource for orders/:2"
    );
  });

  it("DELETE /orders/:orderId should delete order with specified orderId", async () => {
    const res = await requestWithSupertest.delete("/orders/:3");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "DELETE HTTP method on orders resource for orders/:3"
    );
  });
});
