import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useCurrencyConverter } from "../../hooks/useCurrencyConverter";
import { currencyAtom } from "../../store/CurrencyAtom";
import { ResultCard } from "../ResultCard";

export function ResultContainer() {
  const [currencyAtomValue, _] = useAtom(currencyAtom);
  const { data } = useCurrencyConverter({ refetch: false });

  const router = useRouter();

  const goToMainPage = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (!currencyAtomValue.purchaseType) {
      goToMainPage();
    }
  }, [currencyAtomValue.purchaseType, goToMainPage]);

  const formatMoney = (result: number) => {
    return Intl.NumberFormat("pt-BR").format(result);
  }

  return (
    <ResultCard
      dollarValue={data && formatMoney(Number(data.USDBRL.bid))}
      result={formatMoney(currencyAtomValue.dollarConversionTotal)}
      purchaseType={currencyAtomValue.purchaseType}
      stateTaxes={currencyAtomValue.stateTaxes}
      handleBackClick={goToMainPage}
    />
  );
}
