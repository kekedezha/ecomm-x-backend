import app from "../../../src/index";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

describe("Cart-items endpoints", () => {
  it("GET /cart-items should show all cart items from db", async () => {
    const res = await requestWithSupertest.get("/cart-items");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("General GET HTTP method on cart-items resource");
  });

  it("GET /cart-items/:cartItemId should show cart item with specified cartItemId", async () => {
    const res = await requestWithSupertest.get("/cart-items/:1");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "GET HTTP method on cart-item resource for cart-items/:1"
    );
  });

  it("POST /cart-items should create a new cart item", async () => {
    const res = await requestWithSupertest.post("/cart-items");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("POST HTTP method on cart-items resource");
  });

  it("PUT /cart-items/:cartItemId should update cart item with specified cartItemId", async () => {
    const res = await requestWithSupertest.put("/cart-items/:2");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "PUT HTTP method on cart-items resource for cart-items/:2"
    );
  });

  it("DELETE /cart-items/:cartItemId should delete cart item with specified cartItemId", async () => {
    const res = await requestWithSupertest.delete("/cart-items/:3");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "DELETE HTTP method on cart-items resource for cart-items/:3"
    );
  });
});
