import React from "react";
import { render } from "@testing-library/react";
import { Chart } from "./Chart";
import configureStore from "redux-mock-store";
import { screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import thunk from "redux-thunk";

const middlewares = [thunk]; // Add any other middleware you're using here
const mockStore = configureStore(middlewares);
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

describe("Chart", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      historicalRate: {
        loading: false,
        error: null,
        data: [
          { date: "2021-01-01", USD: 1.23, EUR: 0.87 },
          { date: "2021-01-02", USD: 1.24, EUR: 0.88 },
        ],
      },
    });
  });

  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Chart />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Last month currency rates")).toBeInTheDocument();
  });
});
