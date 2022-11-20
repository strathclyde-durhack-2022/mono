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

import Guess from "./Guess.jsx"
import Nav from "./Nav.jsx"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GameChart() {
  const [data, setData] = useState<IDataPerFrame[]>([]);
  const [symbols, setSymbols] = useState<string[]>(["btcusdt"]);

  useEffect(() => {}, []);

  return (
    <div className="h-screen w-screen space-y-32 overflow-hidden">
      <Nav />
      <div className="flex flex-row justify-between space-x-32 items-start h-[90vw] mx-24">
        <div className="flex flex-col items-center w-screen">
          <Chart
            type="line"
            data={{
              labels: data.map((d) => d.EventTime),
              datasets: [
                { data: data.map((d) => d.Price), label: "BTC/USDT", fill: "red" },
              ],
            }}
          />
          <Connection
            Symbols={symbols}
            onMessage={(newData) => setData((prev) => prev.concat([newData]))}
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
