// import App from 'next/app'

import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { Header } from "../components/Header/Header";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  `;

const AppContainer = styled.div`
  background: #ffffff;
  max-width: 50vw;
  margin: 0 0 0 50px;
  height: 60vh;
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

const BackgroundImage = styled.svg`
  width: 1440px;
  height: 100vh;
  z-index: -1;
  position: absolute;
  bottom: 0;
  right: 0;
  background: url("/assets/mask.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={mainTheme}>
      <QueryClientProvider client={queryClient}>
        <AppContainer>
          <GlobalStyle />
          <Header />
          <Component {...pageProps} />
        </AppContainer>
        <BackgroundImage />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
