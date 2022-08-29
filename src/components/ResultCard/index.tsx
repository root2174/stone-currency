import Image from "next/image";
import { MouseEventHandler } from "react";
import styled from "styled-components";
import { PurchaseType, purchaseTypesLabel } from "../../utils/purchaseUtils";
import { Button } from "../Button/Button";

const Content = styled.div``;
const CardContainer = styled.div``;
const PreResultText = styled.h6`
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 2rem;
  margin: 32px 0 0 0;
  color: ${(props) => props.theme.gray600};
`;
const ResultText = styled.h2`
  font-family: "Sharon Sans", "Roboto", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 4rem;
  line-height: 80px;
  margin: 5px 0 30px 0;
  color: ${(props) => props.theme.green500};
`;
const CurrencyInfoContainer = styled.div`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 2rem;
  color: ${(props) => props.theme.gray300};
`;
const CurrencyInfoText = styled.span`
  display: block;
`;

type ResultCardProps = {
  result: string;
  purchaseType: PurchaseType;
  stateTaxes: string;
  dollarValue?: string;
  handleBackClick: MouseEventHandler<HTMLButtonElement>;
};

export function ResultCard({
  result,
  purchaseType,
  stateTaxes,
  dollarValue,
  handleBackClick,
}: ResultCardProps) {
  return (
    <CardContainer>
      <Button
        variant="secondary"
        width="120px"
        height="56px"
        onClick={handleBackClick}
        data-testid="back-button"
      >
        <Image
          src="/assets/arrow-left.svg"
          width={20}
          height={20}
          alt="back arrow"
        />{" "}
        Voltar
      </Button>
      <Content>
        <PreResultText>O Resultado do cálculo é</PreResultText>
        <ResultText>R$ {result}</ResultText>
        <CurrencyInfoContainer>
          <CurrencyInfoText>
            Compra no {purchaseTypesLabel[purchaseType]} e taxa de {stateTaxes}%
          </CurrencyInfoText>
          <CurrencyInfoText>
            Cotação do dólar: $1,00 = R$ {dollarValue}
          </CurrencyInfoText>
        </CurrencyInfoContainer>
      </Content>
    </CardContainer>
  );
}
