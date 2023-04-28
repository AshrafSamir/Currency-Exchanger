import React, { useEffect, useCallback } from "react";
import Classes from "./ConverterPanel.module.css";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import Currency from "../../models/currency";
import { fetchConversion1 } from "../../redux/slices/Currency";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link, useLocation, useNavigate } from "react-router-dom";

// https://app.freecurrencyapi.com/request-playground

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

const ConverterPanel: React.FC<{
  type?: string;
  parentFrom?: string;
  parentTo?: string;
  parentAmount?: number;
}> = ({ type }) => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, conversionResult, symbols } = useSelector(
    (state: { currency: Currency }) => state.currency
  );
  const navigate = useNavigate();
  const location = useLocation();
  const routingData = location.state;

  const [disabled, setDisabled] = React.useState(false);
  const [from, setFrom] = React.useState("EUR");
  const [to, setTo] = React.useState("USD");
  const [amount, setAmount] = React.useState(1);


  const fetchConversion1Callback = useCallback(
    (conversionData: { from: string; to: string; amount: number }) => {
      dispatch(fetchConversion1(conversionData));
    },
    [dispatch]
  );

  useEffect(() => {
    if (type === "details") {
      if (routingData) {
        setFrom(routingData.from);
        setTo(routingData.to);
        setAmount(routingData.amount);
      } else {
        setFrom("EUR");
        setTo("USD");
        setAmount(1);
      }
    }
  }, [routingData, type]);

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
      let amount2decimal = Math.round(parseFloat(e.target.value) * 100) / 100;
      setAmount(amount2decimal);
      if (e.target.value) setDisabled(false);
    }
  };

  const handleConvert = () => {
    if (!disabled) {
      const conversionData = { from, to, amount };
      fetchConversion1Callback(conversionData);
    }

    if (type === "details") {
      navigate("/details", { state: { from, to, amount } });
    }
  };

  return (
    <div className={Classes["panel-container"]}>
      {type === "details" ? (
        <div className={Classes["panel-container_details"]}>
          <h2 className={Classes["panel-header"]}>
            {from} -{" "}
            <span className={Classes["panel-subheader"]}>{symbols[from]}</span>
          </h2>
          <Link to="/home">
            <button className={Classes["panel-home_button"]}>
              Back to Home
            </button>
          </Link>
        </div>
      ) : (
        <h2 className={Classes["panel-header"]}>Currency Converter</h2>
      )}
      <div className={Classes["panel-body"]}>
        <div className={Classes["panel-body_left-container"]}>
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
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
              <label
                htmlFor="from"
                style={disabled || type === "details" ? { color: "grey" } : {}}
              >
                From
              </label>
              <select
                name="from"
                id="from"
                value={from}
                onChange={handleFromSelection}
                disabled={type === "details" ? true : false}
              >
                {Object.keys(symbols).map((key) => {
                  return (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={Classes["switch-button"]}>
              <button
                onClick={handleSwitch}
                disabled={type === "details" ? true : false}
              >
                <i className="fa-solid fa-arrows-left-right"></i>
              </button>
            </div>
            <div className={Classes["to-selection"]}>
              <label htmlFor="to" style={disabled ? { color: "grey" } : {}}>
                To
              </label>
              <select
                value={to}
                onChange={handleToSelection}
                disabled={disabled}
                id="to"
                name="to"
              >
                {Object.keys(symbols).map((key) => {
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
            <div
              className={Classes["result-div"]}
              style={type === "details" ? { width: "100%" } : {}}
            >
              <p>
                {loading
                  ? "Loading..."
                  : error
                  ? "Error"
                  : conversionResult
                  ? conversionResult?.amount + " " + conversionResult?.from
                  : "XX.XX USD"}
              </p>
            </div>
            <div className={Classes["details-button"]}>
              <Link to="/details" state={{ from, to, amount }}>
                <button
                  disabled={type === "details" ? true : false}
                  style={type === "details" ? { display: "none" } : {}}
                >
                  More Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ConverterPanel };
