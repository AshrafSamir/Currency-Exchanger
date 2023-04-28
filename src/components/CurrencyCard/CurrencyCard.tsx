import React from "react";
import Classes from "./CurrencyCard.module.css";

const CurrencyCard: React.FC<{
  conversionResult?: {
    from: string;
    to: string;
    amount: number;
    result: number;
  };
}> = ({ conversionResult }) => {
  return (
    <div className={Classes["card-container"]}>
      <div className={Classes["card-body"]}>
        <p>
          {conversionResult
            ? `${conversionResult.amount} ${conversionResult.from} = ${conversionResult.result} ${conversionResult.to}`
            : ""}
        </p>
      </div>
    </div>
  );
};
export { CurrencyCard };
