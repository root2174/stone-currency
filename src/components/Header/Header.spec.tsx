import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header unit tests", () => {
  test("renders correcly", () => {
    render(<Header />);

    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
