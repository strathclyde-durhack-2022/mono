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

function GameChart() {
  const [data, setData] = useState<IDataPerFrame[]>([]);
  const [symbols, setSymbols] = useState<string[]>(["btcusdt"]);

  useEffect(() => {}, []);

  return (
    <div style={{ width: "80%" }}>
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
  );
}

export default GameChart;
