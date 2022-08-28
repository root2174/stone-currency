import { describe, test } from "@jest/globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { mainTheme } from "../../pages/_app";
import { Button } from "./Button";

describe("Button unit tests", () => {
  test("render correctly with primary variant", () => {
    render(
      <ThemeProvider theme={mainTheme}>
        <Button variant="primary" type="submit" />
      </ThemeProvider>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("render correctly with secondary variant", () => {
    render(
      <ThemeProvider theme={mainTheme}>
        <Button variant="secondary" type="submit" />
      </ThemeProvider>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("render correctly with no variant", () => {
    render(
      <ThemeProvider theme={mainTheme}>
        <Button type="submit" />
      </ThemeProvider>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
