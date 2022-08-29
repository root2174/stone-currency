import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import ptBR from "date-fns/locale/pt-BR";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Client, HydrationProvider } from "react-hydration-provider";
import styled from "styled-components";

const Container = styled.header`
  display: flex;
  align-items: center;
  gap: 48px;
  padding: 50px 0;
  margin-bottom: 50px;

  @media (max-width: 536px) {
    flex-direction: column;
    margin: 0 -50px;
  }
`;

const DateContainer = styled.div`
  width: 279px;
  height: 21px;
  display: flex;
  justify-content: space-between;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 21px;
  color: #45505e;
`;

const ExchangeRateInfo = styled.span`
  width: 327px;
  height: 16px;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  color: #8c9cad;
`;

export function Header() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setTimeout(
      () => setCurrentDate(new Date()),
      currentDate.getMilliseconds() - 60000 // updates every minute
    );
  }, [currentDate]);

  const getCurrentDateFormatted = (formatString: string) => {
    return format(utcToZonedTime(currentDate, "UTC"), formatString, {
      locale: ptBR,
    });
  }
  return (
    <HydrationProvider>
      <Client>
        <Container>
          <Image
            src="/assets/stone-logo.svg"
            height={81}
            width={163}
            alt="stone currency logo"
          />
          <div>
            <DateContainer>
              <time>{getCurrentDateFormatted("d 'de' LLLL yyyy")}</time>|
              <time>{getCurrentDateFormatted("k:mm 'UTC'")}</time>
            </DateContainer>
            <ExchangeRateInfo>
              Dados de câmbio disponibilizados pela Morningstar
            </ExchangeRateInfo>
          </div>
        </Container>
      </Client>
    </HydrationProvider>
  );
}
