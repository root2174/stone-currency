import { describe, test } from "@jest/globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "jotai";
import { currencyAtom } from "../../store/CurrencyAtom";
import { ResultContainer } from "./ResultContainer";

jest.mock("../../hooks/useCurrencyConverter", () => ({
  useCurrencyConverter: () => ({
    data: {
      USDBRL: {
        ask: "1",
        bid: "2",
        code: "1",
        codein: "1",
        create_date: "1",
        high: "1",
        low: "1",
        name: "1",
        pctChange: "1",
        timestamp: "1",
        varBid: "1",
      },
    },
  }),
}));

const mockPush = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("ResultPage unit tests", () => {
  test("Page renders correctly", () => {
    render(
      <Provider
        initialValues={
          [
            [
              currencyAtom,
              {
                purchaseType: "card",
                stateTaxes: "2",
                dollarConversionTotal: 2,
              },
            ],
          ] as any
        }
      >
        <ResultContainer />
      </Provider>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText(/cartão/)).toBeInTheDocument();
  });
  test("redirects the user back to the main page if there is no purchaseType", () => {
    render(
      <Provider
        initialValues={
          [
            [
              currencyAtom,
              {
                purchaseType: "",
                stateTaxes: "",
                dollarConversionTotal: 0,
              },
            ],
          ] as any
        }
      >
        <ResultContainer />
      </Provider>
    );

    expect(mockPush).toHaveBeenCalled();
  });
});
