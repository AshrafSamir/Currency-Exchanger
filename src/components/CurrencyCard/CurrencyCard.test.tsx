import React from "react";
import { render } from "@testing-library/react";
import { CurrencyCard } from "./CurrencyCard";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("CurrencyCard", () => {
  it("renders without crashing", () => {
    render(<CurrencyCard />);
  });

  it("renders the correct conversion result", () => {
    const conversionResult = {
      from: "USD",
      to: "EUR",
      amount: 100,
      result: 80,
    };

    render(<CurrencyCard conversionResult={conversionResult} />);

    const conversionResultText = screen.getByText(
      `${conversionResult.amount} ${conversionResult.from} = ${conversionResult.result} ${conversionResult.to}`
    );

    expect(conversionResultText).toBeInTheDocument();
  });

  it("does not display anything when no conversion result data is provided", () => {
    render(<CurrencyCard />);

    const paragraphElement = screen.queryByRole("paragraph");

    expect(paragraphElement).not.toBeInTheDocument();
  });
});
