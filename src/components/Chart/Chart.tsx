import React, { useCallback, useEffect } from "react";
import Classes from "./Chart.module.css";
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

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

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
    fetchHistoricalRatesCallback({
      from: routingData.from,
      to: routingData.to,
    });
    // console.log({ testdata });
  }, [fetchHistoricalRatesCallback, routingData]);

  return (
    <>
      {loading ? (
        <div className={Classes["chart-container"]}>Loading...</div>
      ) : error ? (
        <div className={Classes["chart-container"]}>{error}</div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height="39%"
          className={Classes["chart-container"]}
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
              dataKey={routingData.to}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
export { Chart };
