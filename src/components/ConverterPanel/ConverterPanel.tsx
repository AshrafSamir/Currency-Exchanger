import React, { useEffect, useCallback } from "react";
import Classes from "./ConverterPanel.module.css";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import Currency from "../../models/currency";
import { fetchSymbols, fetchConversion1 } from "../../redux/slices/Currency";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { parse } from "path";
// https://app.freecurrencyapi.com/request-playground
type AppDispatch = ThunkDispatch<any, any, AnyAction>;

const ConverterPanel: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, symbols, conversionResult } = useSelector(
    (state: { currency: Currency }) => state.currency
  );

  const [disabled, setDisabled] = React.useState(false);
  const [from, setFrom] = React.useState("EUR");
  const [to, setTo] = React.useState("USD");
  const [amount, setAmount] = React.useState(1);
  const currencies = [
    "AUD",
    "BGN",
    "BRL",
    "CAD",
    "CHF",
    "CNY",
    "CZK",
    "DKK",
    "EUR",
    "GBP",
    "HKD",
    "HRK",
    "HUF",
    "ILS",
    "INR",
    "ISK",
    "JPY",
    "KRW",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PHP",
    "PLN",
    "RON",
    "RUB",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "USD",
    "ZAR",
  ];

  const fetchSymbolsCallback = useCallback(() => {
    dispatch(fetchSymbols());
  }, []);
  const fetchConversion1Callback = useCallback(
    (conversionData: { from: string; to: string; amount: number }) => {
      dispatch(fetchConversion1(conversionData));
    },
    [dispatch, from, to, amount]
  );

  useEffect(() => {
    // fetchSymbolsCallback();
  }, [disabled]);

  const handleFromSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!disabled) setFrom(e.target.value);
  };
  const handleToSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!disabled) setTo(e.target.value);
  };
  const handleSwitch = () => {
    setFrom(to);
    setTo(from);
  };
  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) <= 0 || !e.target.value) {
      setAmount(parseInt(e.target.value));
      setDisabled(true);
    } else {
      setAmount(parseInt(e.target.value));
      if (e.target.value) setDisabled(false);
    }
  };

  const handleConvert = () => {
    if (!disabled) {
      const conversionData = { from, to, amount };
      fetchConversion1Callback(conversionData);
    }
  };
  const handleOptions = () => {
    if (loading) {
      console.log("loading", loading);
      return <option>Loading...</option>;
    } else if (error) {
      console.log("error", error);
      return <option>Error</option>;
    } else {
      Object.keys(symbols).map((key) => {
        return (
          <option key={key} value={key}>
            {key}
          </option>
        );
      });
    }
  };

  return (
    <div className={Classes["panel-container"]}>
      <h2 className={Classes["panel-header"]}>Currency Exchanger</h2>
      <div className={Classes["panel-body"]}>
        <div className={Classes["panel-body_left-container"]}>
          <div>
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={handleAmount}
            />
          </div>
          <div>
            <p>
              {loading
                ? "Loading..."
                : error
                ? "Error"
                : conversionResult
                ? `${conversionResult.amount} ${conversionResult.from} = ${conversionResult.result} ${conversionResult.to}`
                : "1 EUR = XX.XX USD"}
            </p>
          </div>
        </div>
        <div className={Classes["panel-body_right-container"]}>
          <div className={Classes["right-container_selection-form"]}>
            <div className={Classes["from-selection"]}>
              <label>From</label>
              <select
                name="from"
                value={from}
                onChange={handleFromSelection}
                disabled={disabled}
              >
                {currencies.map((key) => {
                  return (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={Classes["switch-button"]}>
              <button onClick={handleSwitch} disabled={disabled}>
                <i className="fa-solid fa-arrows-left-right"></i>
              </button>
            </div>
            <div className={Classes["to-selection"]}>
              <label>To</label>
              <select
                value={to}
                onChange={handleToSelection}
                disabled={disabled}
                name="to"
              >
                {currencies.map((key) => {
                  return (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={Classes["right-container_submit-button"]}>
            <button onClick={handleConvert} disabled={disabled}>
              Convert
            </button>
          </div>
          <div className={Classes["details-container"]}>
            <div className={Classes["result-div"]}>
              <p> XX.XX USD</p>
            </div>
            <div className={Classes["details-button"]}>
              <button disabled={disabled}>More Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ConverterPanel };
