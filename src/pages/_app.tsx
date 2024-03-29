// import App from 'next/app'

import { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { Header } from "../components/Header/Header";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'CircularStd';
    src: url('../assets/CircularStd-Book.ttf');
    font-weight: 400;
    font-style: normal;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  `;

const AppContainer = styled.div`
  height: 100vh;
  position: relative;
  overflow: hidden;
  width: 100vw;
`;

const MainContainer = styled.main`
  background: #ffffff;
  margin: 0 0 0 50px;
  width: 550px;
  height: 600px;

  @media (max-width: 1220px) {
    width: 100vw;
    height: 100vh;
  }
`;

export const mainTheme = {
  white: "#fff",
  gray100: "#D7E0EB",
  gray200: "#8C9CAD",
  gray300: "#6E7E90",
  gray600: "#45505E",
  gray700: "#2E3742",
  green500: "#00AB63",
  green600: "#008B57",
};

const MoneyImage = styled.svg`
  width: 1440px;
  height: 969px;
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  background: url("/assets/mask.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const CircularImage = styled.svg`
  height: 310px;
  width: 310px;
  position: absolute;
  top: 236px;
  right: 290px;
  z-index: 1000;
  background: url("/assets/graph.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Images = styled.div`
  @media (max-width: 1220px) {
    display: none;
  }
`;

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={mainTheme}>
      <QueryClientProvider client={queryClient}>
        <AppContainer>
          <Head>
            <title>Stone Currency</title>
          </Head>
          <MainContainer>
            <GlobalStyle />
            <Header />
            <Component {...pageProps} />
          </MainContainer>
          <Images>
            <MoneyImage />
            <CircularImage />
          </Images>
        </AppContainer>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
