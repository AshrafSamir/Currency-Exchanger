import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "./Navbar";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Navbar", () => {
  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Exchanger")).toBeInTheDocument();
    expect(screen.getByText("EUR-USD Details")).toBeInTheDocument();
    expect(screen.getByText("EUR-GBP Details")).toBeInTheDocument();
  });
});
