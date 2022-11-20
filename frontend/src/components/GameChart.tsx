import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import Connection, { IDataPerFrame } from "./Connection";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface ITickerWithData {
  internalName: string;
  label: string;
  colour: string;
  data: IDataPerFrame[];
  startingPrice: number;
}

function GameChart() {
  const [startTime, setStartTime] = useState<number>(0);
  const [data, setData] = useState<ITickerWithData[]>([
    {
      internalName: "btcusdt",
      label: "BTC",
      colour: "orange",
      data: [],
      startingPrice: 0,
    },
    {
      internalName: "ethusdt",
      label: "ETH",
      colour: "gray",
      data: [],
      startingPrice: 0,
    },
    {
      internalName: "xmrusdt",
      label: "XMR",
      colour: "red",
      data: [],
      startingPrice: 0,
    },
  ]);

  useEffect(() => {}, []);

  return (
    <div style={{ width: "80%" }}>
      <Chart
        type="line"
        data={{
          labels: data[0]?.data?.map((d) => d.EventTime) ?? [],
          datasets: data.map((d) => ({
            data: d.data.map((d) => d.Price),
            label: d.label,
            borderColor: d.colour,
            backgroundColor: "transparent",
            pointBorderColor: "transparent",
            tension: 0,
          })),
        }}
      />
      <Connection
        Symbols={data.map((d) => d.internalName)}
        onMessage={(newData) => {
          if (startTime === 0) setStartTime(newData.EventTime);
          setData((prev) => {
            return prev.map((d) => {
              if (
                d.internalName === newData.Symbol.split("@")[0].toLowerCase()
              ) {
                if (d.startingPrice === 0) d.startingPrice = newData.Price;
                d.data.push({
                  ...newData,
                  Price:
                    ((newData.Price - d.startingPrice) / d.startingPrice) * 100,
                  EventTime: newData.EventTime - startTime,
                });
              }
              return d;
            });
          });
        }}
      />
    </div>
  );
}

export default GameChart;
