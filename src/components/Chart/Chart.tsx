import React, { useCallback, useEffect } from "react";
import "./Chart.module.css";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import historicalRate from "../../models/historicalRate";
import { fetchHistoricalRates } from "../../redux/slices/HistoricalRate";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

const Chart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const fetchHistoricalRatesCallback = useCallback(
    (data: { from: string; to: string }) => {
      dispatch(fetchHistoricalRates(data));
    },
    [dispatch]
  );
  const { loading, error, data } = useSelector(
    (state: { historicalRate: historicalRate }) => state.historicalRate
  );
  const location = useLocation();
  const routingData = location.state;

  useEffect(() => {
    if (routingData) {
      fetchHistoricalRatesCallback({
        from: routingData.from,
        to: routingData.to,
      });
    } else {
      fetchHistoricalRatesCallback({
        from: "USD",
        to: "EUR",
      });
    }
  }, [fetchHistoricalRatesCallback, routingData]);

  return (
    <>
      <h1>Last month currency rates</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height="39%"
          minWidth="0"
          minHeight="undefined"
        >
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={routingData ? routingData.to : "EUR"}
              stroke="#0057d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
export { Chart };
