import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useCurrencyConverter } from "../../hooks/useCurrencyConverter";
import { currencyAtom } from "../../store/CurrencyAtom";
import { ResultCard } from "../ResultCard";

export function ResultContainer() {
  const [currencyAtomValue, _] = useAtom(currencyAtom);
  const { data } = useCurrencyConverter();

  const router = useRouter();

  const goToMainPage = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (!currencyAtomValue.purchaseType) {
      goToMainPage();
    }
  }, [currencyAtomValue.purchaseType, goToMainPage]);

  function FormatMoney(result: number) {
    return Intl.NumberFormat("pt-BR").format(result);
  }

  return (
    <ResultCard
      dollarValue={data && FormatMoney(Number(data.USDBRL.bid))}
      result={FormatMoney(currencyAtomValue.dollarConversionTotal)}
      purchaseType={currencyAtomValue.purchaseType}
      stateTaxes={currencyAtomValue.stateTaxes}
      handleBackClick={goToMainPage}
    />
  );
}
