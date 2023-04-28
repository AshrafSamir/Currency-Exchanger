import React, { useCallback, useEffect } from "react";
import Classes from "./CurrencyCardContainer.module.css";
import { CurrencyCard } from "../../components/CurrencyCard";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchMostCommonRates } from "../../redux/slices/Currency";
import Currency from "../../models/currency";

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

const CurrencyCardContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { conversionResult, conversionResults } = useSelector(
    (state: { currency: Currency }) => {
      return state.currency;
    }
  );

  const fetchMostCommonRatesCallback = useCallback(() => {
    if (conversionResult)
      dispatch(
        fetchMostCommonRates({
          from: conversionResult.from,
          to: conversionResult.to,
          amount: conversionResult.amount,
        })
      );
  }, [conversionResult, dispatch]);

  useEffect(() => {
    fetchMostCommonRatesCallback();
  }, [fetchMostCommonRatesCallback]);

  return (
    <div className={Classes["container"]}>
      {conversionResults ? (
        conversionResults.map(
          (conversionResult: {
            from: string;
            to: string;
            amount: number;
            result: number;
          }) => {
            return <CurrencyCard conversionResult={conversionResult} />;
          }
        )
      ) : (
        <>
          <CurrencyCard />
          <CurrencyCard />
          <CurrencyCard />
          <CurrencyCard />
          <CurrencyCard />
          <CurrencyCard />
          <CurrencyCard />
          <CurrencyCard />
          <CurrencyCard />
        </>
      )}
    </div>
  );
};
export { CurrencyCardContainer };
