import app from "../../../src/index";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

describe("Order-items endpoints", () => {
  it("GET /order-items should show all order-items from db", async () => {
    const res = await requestWithSupertest.get("/order-items");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("General GET HTTP method on order-items resource");
  });

  it("GET /order-items/:orderItemId should show order-item with specified orderItemId", async () => {
    const res = await requestWithSupertest.get("/order-items/:1");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "GET HTTP method on order-items resource for order-items/:1"
    );
  });

  it("POST /order-items should create a new order-item to the order-items table", async () => {
    const res = await requestWithSupertest.post("/order-items");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("POST HTTP method on order-items resource");
  });

  it("PUT /order-items/:orderItemId should update order-item with specified orderItemId", async () => {
    const res = await requestWithSupertest.put("/order-items/:2");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "PUT HTTP method on order-items resource for order-items/:2"
    );
  });

  it("DELETE /order-items/:orderItemId should delete order-items with specified orderItemId", async () => {
    const res = await requestWithSupertest.delete("/order-items/:3");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "DELETE HTTP method on order-items resource for order-items/:3"
    );
  });
});
