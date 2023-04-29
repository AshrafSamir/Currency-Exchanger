import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ConverterPanel } from "./ConverterPanel";
import { fetchConversion1 } from "../../redux/slices/Currency";
import configureStore from "redux-mock-store";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import thunk from "redux-thunk";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "redux";

const middlewares = [thunk]; // Add any other middleware you're using here
const mockStore = configureStore(middlewares);
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

jest.mock("../../redux/slices/Currency", () => ({
  fetchConversion1: jest.fn(),
}));
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("ConverterPanel component", () => {
  let store: any;
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    (useDispatch as jest.Mock<Dispatch<AnyAction>>).mockReturnValue(dispatch);

    store = mockStore({
      currency: {
        loading: false,
        error: null,
        symbols: {
          AUD: "Australian Dollar",
          BGN: "Bulgarian Lev",
          BRL: "Brazilian Real",
          CAD: "Canadian Dollar",
          CHF: "Swiss Franc",
          CNY: "Chinese Yuan Renminbi",
          CZK: "Czech Koruna",
          DKK: "Danish Krone",
          EUR: "Euro",
          GBP: "British Pound Sterling",
          HKD: "Hong Kong Dollar",
          HRK: "Croatian Kuna",
          HUF: "Hungarian Forint",
          ILS: "Israeli New Shekel",
          INR: "Indian Rupee",
          ISK: "Icelandic Krona",
          JPY: "Japanese Yen",
          KRW: "South Korean Won",
          MXN: "Mexican Peso",
          MYR: "Malaysian Ringgit",
          NOK: "Norwegian Krone",
          NZD: "New Zealand Dollar",
          PHP: "Philippine Peso",
          PLN: "Polish Zloty",
          RON: "Romanian Leu",
          RUB: "Russian Ruble",
          SEK: "Swedish Krona",
          SGD: "Singapore Dollar",
          THB: "Thai Baht",
          TRY: "Turkish Lira",
          USD: "US Dollar",
          ZAR: "South African Rand",
        },
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the component correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ConverterPanel />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Currency Converter")).toBeInTheDocument();
  });

  it("handles user input correctly", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ConverterPanel />
        </MemoryRouter>
      </Provider>
    );

    const fromInput = screen.getByLabelText("From");
    const toInput = screen.getByLabelText("To");
    const amountInput = screen.getByLabelText("Amount");
    const convertButton = screen.getByText("Convert");

    fireEvent.change(fromInput, { target: { value: "EUR" } });
    fireEvent.change(toInput, { target: { value: "USD" } });
    fireEvent.change(amountInput, { target: { value: "100" } });
    fireEvent.click(convertButton);

    expect(dispatch).toHaveBeenCalledWith(
      fetchConversion1({
        from: "EUR",
        to: "USD",
        amount: 100,
      })
    );
  });
});
