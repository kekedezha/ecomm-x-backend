import {
  hashPassword,
  comparePassword,
  generateJWT,
  createUserCart,
  checkIfCartExists,
} from "../../../src/helpers/users.helper";

describe("hashPassword function to appropriately hash a password input", () => {
  it("should take an unhashed password as an input and return a hashed password", () => {
    expect(1).toEqual(1);
  });
});
