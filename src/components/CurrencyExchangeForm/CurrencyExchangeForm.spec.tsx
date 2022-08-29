import { describe, test } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CurrencyExchangeForm } from "./CurrencyExchangeForm";

jest.mock("../../hooks/useCurrencyConverter", () => ({
  useCurrencyConverter: () => ({
    isLoading: false,
    getDollarConversionTotal: jest.fn(),
  }),
}));

const mockPush = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("CurrencyExchangeForm unit tests", () => {
  test.only("submits form value", async () => {
    render(<CurrencyExchangeForm />);
    fireEvent.change(screen.getByTestId("state-taxes"), {
      target: { value: "2" },
    });

    fireEvent.click(screen.getByTestId("card"));

    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  test("submit button should be disabled when state taxes input is empty", () => {
    render(<CurrencyExchangeForm />);
    const submitButton = screen.getByRole("button");

    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByTestId("state-taxes"), {
      target: { value: "2" },
    });

    expect(submitButton).toBeEnabled();

    fireEvent.change(screen.getByTestId("state-taxes"), {
      target: { value: "" },
    });

    expect(submitButton).toBeDisabled();
  });
});
