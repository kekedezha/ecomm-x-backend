import {
  hashPassword,
  comparePassword,
  generateJWT,
} from "../../../src/helpers/users.helper";

describe("hashPassword function to appropriately hash a password input", () => {
  it("should take an unhashed password as an input and return a hashed password", async () => {
    const password = "NotAHashedPassword";
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).not.toEqual(password);
    expect(typeof hashedPassword).toBe("string");
    expect(hashedPassword.length).toBeGreaterThan(10);
  });
});

describe("comparePassword function should correctly unhash using bcrypt library to compare correct password", () => {
  it("should take the correct password and compare it against the hashed password", async () => {
    const password = "NotAHashedPassword";
    const hashedPassword = await hashPassword(password);
    const isCorrectPassword = await comparePassword(password, hashedPassword);
    expect(isCorrectPassword).toBeTruthy();
  });
});

describe("generateJWT should generate a JWT", () => {
  it("should take payload as an input and use the jsonwebtoken library to produce a JWT", () => {
    const payload = {
      id: 99,
      username: "tempUser",
      role: "user",
      cart_id: 99,
    };
    const jwt = generateJWT(payload);
    expect(typeof jwt).toBe("string");
    expect(payload).not.toEqual(jwt);
  });
});
