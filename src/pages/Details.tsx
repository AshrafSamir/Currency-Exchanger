import React from "react";
import { ConverterPanel } from "../components/ConverterPanel";
import { Chart } from "../components/Chart";

const Details: React.FC = () => {
  return (
    <>
      <ConverterPanel type="details" />
      <Chart />
    </>
  );
};

export { Details };
