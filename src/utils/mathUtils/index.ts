import { PurchaseType } from "../purchaseUtils";

type CalculateDollarTotal = {
  dollarValue: number;
  stateTaxes: number;
  dollarQuantity: number;
  purchaseType: PurchaseType;
};

const IOF = {
  cash: 1.1,
  card: 6.4,
};

export const percentage = (partialValue: number, totalValue: number) =>
  (partialValue / 100) * totalValue;

export const calculateDollarTotal = ({
  dollarValue,
  dollarQuantity,
  stateTaxes,
  purchaseType,
}: CalculateDollarTotal) => {
  switch (purchaseType) {
    case "cash":
      return (
        (dollarQuantity + percentage(stateTaxes, dollarQuantity)) *
        (dollarValue + percentage(IOF.cash, dollarQuantity))
      );
    case "card":
      return (
        (dollarQuantity +
          percentage(stateTaxes, dollarQuantity) +
          percentage(IOF.card, dollarQuantity)) *
        dollarValue
      );
  }
};
