import { atom } from "jotai";
import { PurchaseType } from "../utils/purchaseUtils";

export const currencyAtom = atom({
  purchaseType: "" as PurchaseType,
  stateTaxes: "0" as string,
  dollarConversionTotal: 0 as number,
});
