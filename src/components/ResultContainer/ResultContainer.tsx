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

  function formatResult(result: number) {
    return String(result.toFixed(2)).replace(".", ",");
  }

  return (
    <ResultCard
      dollarValue={data && data.USDBRL.bid}
      result={formatResult(currencyAtomValue.dollarConversionTotal)}
      purchaseType={currencyAtomValue.purchaseType}
      stateTaxes={currencyAtomValue.stateTaxes}
      handleBackClick={goToMainPage}
    />
  );
}
