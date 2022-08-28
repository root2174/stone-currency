import { useQuery } from "react-query";
import { api } from "../../services/api";
import { calculateDollarTotal } from "../../utils/mathUtils";
import { PurchaseType } from "../../utils/purchaseUtils";

type Data = {
  USDBRL: {
    ask: string;
    bid: string;
    code: string;
    codein: string;
    create_date: string;
    high: string;
    low: string;
    name: string;
    pctChange: string;
    timestamp: string;
    varBid: string;
  };
};

type GetDollarConversionArgs = {
  purchaseType: PurchaseType;
  stateTaxes: number;
  dollarQuantity: number;
};

export function useCurrencyConverter() {
  const fetchCurrencies = (): Promise<Data> =>
    api
      .get("/json/last/USD-BRL")
      .then((res) => res.data)
      .catch(() => "Problem retrieving data");

  const { data, isLoading, isSuccess } = useQuery(
    ["currencies"],
    fetchCurrencies
  );

  const getDollarConversionTotal = ({
    purchaseType,
    stateTaxes,
    dollarQuantity,
  }: GetDollarConversionArgs) => {
    if (isLoading || !isSuccess) {
      return 0;
    }

    return calculateDollarTotal({
      dollarValue: Number(data?.USDBRL?.bid),
      purchaseType,
      dollarQuantity,
      stateTaxes,
    });
  };

  return { data, isLoading, getDollarConversionTotal };
}
