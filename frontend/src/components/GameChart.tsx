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
import { ICoin } from "./Interface";

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
  label: ICoin;
  colour: string;
  data: IDataPerFrame[];
  startingPrice: number;
}

export const MAX_TICKS = 60;

function GameChart() {
  const [tickerCount, setTickerCount] = useState<number>(0);
  const [streaming, setStreaming] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<string>();
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

  const reset = () => {
    setStreaming(false);
    setData([]);
    setTickerCount(0);
  };

  const getFinalScore = () => {
    if (data.length === 0 || !data[0]?.data?.[0]?.Price) return data;
    data.sort(
      (a, b) =>
        a.data[a.data.length - 1].Price - b.data[b.data.length - 1].Price
    );
    return data;
  };

  useEffect(() => {
    if (Math.round(tickerCount) === MAX_TICKS + 1) setStreaming(false);
  }, [tickerCount]);

  return (
    <div className="h-screen w-screen space-y-8 overflow-hidden">
      <Nav />
      <div className="flex flex-row justify-between space-x-32 items-start h-[90vw] mx-24">
        <div className="flex flex-col items-center w-screen">
          <Chart
            type="line"
            options={{
              animations: {
                y: {
                  type: "number",
                  easing: "linear",
                  duration: 1,
                  from: NaN,
                },
              },
            }}
            data={{
              labels: Array(60)
                .fill(0)
                .map((_, i) => i),
              datasets: data.map((d) => ({
                data: d.data.map((d) => d.Price),
                label: d.label,
                borderColor: d.colour,
                backgroundColor: "transparent",
                pointBorderColor: "transparent",
                tension: 0.1,
              })),
            }}
          />
          <Connection
            start={streaming}
            Symbols={data.map((d) => d.internalName)}
            onMessage={(newData) => {
              setTickerCount((prev) => prev + 1 / data.length);
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
                          EventTime: newData.EventTime,
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
        <div className="flex justify-center items-center h-1/3 flex-col">
          <button onClick={() => setStreaming(!streaming)}>
            stream is {streaming ? "on" : "off"}
          </button>
          <button onClick={reset}>reset</button>
          <p>ticker: {Math.round(tickerCount)}</p>
          <p>
            {selectedCoin ? (
              <>Your selected coin is {selectedCoin}</>
            ) : (
              <>
                Please choose which coin would gain the most or lose the least
                in the next minute!
              </>
            )}
          </p>
          <Guess
            coins={data.map((d) => d.label)}
            onChange={(coin) => setSelectedCoin(coin)}
          />
          {getFinalScore()
            .map((d, i) => `${i + 1}. ${d.label}`)
            .join(", ")}
        </div>
      </div>
    </div>
  );
}

export default GameChart;
