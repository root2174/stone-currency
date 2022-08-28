import { describe, test } from "@jest/globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ResultCard } from ".";

describe("ResultCard tests", () => {
  test("renders correctly", () => {
    render(
      <ResultCard
        dollarValue="1"
        handleBackClick={jest.fn()}
        purchaseType="cash"
        result="1"
        stateTaxes="1"
      />
    );
    expect(screen.getByTestId("back-button")).toBeInTheDocument();
  });
});
