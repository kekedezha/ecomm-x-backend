import app from "../../../src/index";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

describe("API Home URL", () => {
  it("should show a welcome message for the backend REST API for the X fitness brand", async () => {
    const res = await requestWithSupertest.get("/");
    console.log(res.status);
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(
      "Welcome to the home route for the backend REST API for X fitness brand."
    );
  });
});
