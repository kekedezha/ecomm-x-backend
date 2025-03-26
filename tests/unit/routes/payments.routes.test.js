import app from "../../../src/index";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

describe("Payments endpoints", () => {
  it("GET /payments should show all payments from db", async () => {
    const res = await requestWithSupertest.get("/payments");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("General GET HTTP method on payments resource");
  });

  it("GET /payments/:paymentId should show payment with specified paymentId", async () => {
    const res = await requestWithSupertest.get("/payments/:1");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "GET HTTP method on payments resource for payments/:1"
    );
  });

  it("POST /payments should create a new payment to the payments table", async () => {
    const res = await requestWithSupertest.post("/payments");
    expect(res.status).toEqual(201);
    expect(res.text).toEqual("POST HTTP method on payments resource");
  });

  it("PUT /payments/:paymentId should update payment with specified paymentId", async () => {
    const res = await requestWithSupertest.put("/payments/:2");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "PUT HTTP method on payments resource for payments/:2"
    );
  });

  it("DELETE /payments/:paymentId should delete payment with specified paymentId", async () => {
    const res = await requestWithSupertest.delete("/payments/:3");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "DELETE HTTP method on payments resource for payments/:3"
    );
  });
});
