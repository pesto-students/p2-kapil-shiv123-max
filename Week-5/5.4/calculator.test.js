const mathOperations = require("./calculator");

describe("Testing calculator", () => {
  test("Addition test, adding 5 & 9 must return 14", () => {
    let res = mathOperations.sum(5, 9);
    expect(res).toBe(14);
  });

  test("Subtraction test, subtracting 9 from 5 must return 4", () => {
    let res = mathOperations.diff(9, 5);
    expect(res).toBe(4);
  });

  test("Product test, multiplying 5 & 9 must return 45", () => {
    let res = mathOperations.product(5, 9);
    expect(res).toBe(45);
  });
  test("Existence check", () => {
    expect(mathOperations.sum).not.toBeNull();
    expect(mathOperations.diff).not.toBeNull();
    expect(mathOperations.product).not.toBeNull();
  });
});
