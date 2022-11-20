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
import { createRef, useEffect, useRef, useState } from "react";
import Connection, { IDataPerFrame } from "./Connection";

import Guess from "./Guess.jsx";
import Nav from "./Nav.jsx";

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
  const [startTime, setStartTime] = useState<number>(1);
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

  return (
    <div className="h-screen w-screen space-y-16 overflow-hidden">
      <Nav />
      <div className="flex flex-row justify-between space-x-32 items-start h-[90vw] mx-24">
        <div className="flex flex-col items-center w-screen">
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
              })),
            }}
          />
          <Connection
            Symbols={data.map((d) => d.internalName)}
            onMessage={(newData) => {
              setData((prev) => {
                return prev.map((d) => {
                  if (
                    d.internalName ===
                    newData.Symbol.split("@")[0].toLowerCase()
                  ) {
                    if (d.startingPrice === 0) d.startingPrice = newData.Price;
                    return {
                      ...d,
                      data: [
                        ...d.data,
                        {
                          ...newData,
                          Price:
                            ((newData.Price - d.startingPrice) /
                              d.startingPrice) *
                            100,
                          EventTime: Math.round(newData.EventTime - startTime),
                        },
                      ],
                    };
                  }
                  return d;
                });
              });
            }}
          />
        </div>
        <div className="flex justify-center items-center h-1/3">
          <Guess />
        </div>
      </div>
    </div>
  );
}

export default GameChart;
