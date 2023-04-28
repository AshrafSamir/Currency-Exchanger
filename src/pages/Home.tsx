import React from "react";
import { ConverterPanel } from "../components/ConverterPanel";
import { CurrencyCardContainer } from "../containers/CurrencyCardContainer";

const Home: React.FC = () => {
  return (
    <>
      <ConverterPanel />
      <CurrencyCardContainer />
    </>
  );
};

export { Home };
