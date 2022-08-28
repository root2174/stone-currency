import { describe, test } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useCurrencyConverter } from ".";
import { api } from "../../services/api";

describe("useCurrencyConverter", () => {
  const mockedData = {
    USDBRL: {
      ask: "1",
      bid: "1",
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
  };
  const createWrapper = () => {
    type WrapperProps = {
      children: React.ReactNode;
    };
    const queryClient = new QueryClient();
    return function Wrapper({ children }: WrapperProps) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    };
  };

  beforeEach(() =>
    new MockAdapter(api).onGet("/json/last/USD-BRL").reply(200, mockedData)
  );

  test("gets currency data", async () => {
    const { result } = renderHook(() => useCurrencyConverter(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.data).toStrictEqual(mockedData));
  });

  test("calculates dollar conversion using cash", async () => {
    const { result } = renderHook(() => useCurrencyConverter(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(
        result.current.getDollarConversionTotal({
          dollarQuantity: 1,
          purchaseType: "cash",
          stateTaxes: 2,
        })
      ).toBe(1.03122);
    });
  });

  test("calculates dollar conversion using cash", async () => {
    new MockAdapter(api).onGet("/json/last/USD-BRL").reply(200, mockedData);
    const { result } = renderHook(() => useCurrencyConverter(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(
        result.current.getDollarConversionTotal({
          dollarQuantity: 1,
          purchaseType: "cash",
          stateTaxes: 2,
        })
      ).toBe(1.03122);
    });
  });

  test("doest calculates dollar conversion if there is a problem getting data from server", () => {
    new MockAdapter(api).onGet("/json/last/USD-BRL").reply(400);
    const { result } = renderHook(() => useCurrencyConverter(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(
      result.current.getDollarConversionTotal({
        dollarQuantity: 1,
        purchaseType: "cash",
        stateTaxes: 2,
      })
    ).toBe(undefined);
  });
});
