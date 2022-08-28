import { atom } from "jotai";

export const currencyAtom = atom({
  purchaseType: "",
  stateTaxes: "0",
  dollarConversionTotal: 0,
});
