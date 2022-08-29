import { describe, expect, test } from "@jest/globals";
import { calculateDollarTotal } from "./";

describe("mathUtils module", () => {
  test("calculates the total price of the dollar after taxes when purchase type is cash", () => {
    expect(
      calculateDollarTotal({
        dollarQuantity: 10,
        dollarValue: 5.2,
        purchaseType: "cash",
        stateTaxes: 8.5,
      })
    ).toBe(57.04062);
  });
  test("calculates the total price of the dollar after taxes when purchase type is card", () => {
    expect(
      calculateDollarTotal({
        dollarQuantity: 10,
        dollarValue: 5.6,
        purchaseType: "card",
        stateTaxes: 2,
      })
    ).toBe(60.70399999999999);
  });
});
