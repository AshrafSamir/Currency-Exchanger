import React, { useEffect } from "react";
import Classes from "./ConverterPanel.module.css";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import Currency from "../../models/currency";
import { fetchSymbols } from "../../redux/slices/Currency";
import { ThunkDispatch } from "@reduxjs/toolkit";

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

const ConverterPanel: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, symbols } = useSelector(
    (state: { currency: Currency }) => state.currency
  );

  useEffect(() => {
    dispatch(fetchSymbols());
  }, [dispatch]);

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };
  const handleSwitch = () => {
    console.log("switch");
  };
  const handleOptions = () => {
    if (loading) {
      console.log("loading", loading);
      return <option>Loading...</option>;
    } else if (error) {
      console.log("error", error);
      return <option>Error</option>;
    } else if (symbols) {
      console.log("success", symbols);
      // loop on the object keys
      Object.keys(symbols).map((key) => {
        console.log(key);
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
            <input type="number" name="amount" defaultValue={1} />
          </div>
          <div>
            <p>1 EUR = XX.XX USD</p>
          </div>
        </div>
        <div className={Classes["panel-body_right-container"]}>
          <div className={Classes["right-container_selection-form"]}>
            <div className={Classes["from-selection"]}>
              <label>From</label>
              <select name="from">{handleOptions()}</select>
            </div>
            <div className={Classes["switch-button"]}>
              <button>
                <i className="fa-solid fa-arrows-left-right"></i>
              </button>
            </div>
            <div className={Classes["to-selection"]}>
              <label>To</label>
              <select name="to">
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
          <div className={Classes["right-container_submit-button"]}>
            <button>Convert</button>
          </div>
          <div className={Classes["details-container"]}>
            <div className={Classes["result-div"]}>
              <p> XX.XX USD</p>
            </div>
            <div className={Classes["details-button"]}>
              <button>More Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ConverterPanel };
