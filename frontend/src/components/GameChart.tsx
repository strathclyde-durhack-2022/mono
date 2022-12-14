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

import Guess from "./Guess.jsx";
import Nav from "./Nav.jsx";

import ModalFail from "./ModalFail.jsx";
import ModalSuccess from "./ModalSuccess.jsx";
import { ICoin, IHistory } from "../models/Interface";

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

const DEFAULT_COINS: ITickerWithData[] = [
  { internalName: "btcusdt", label: "BTC", colour: "orange" },
  {
    internalName: "ethusdt",
    label: "ETH",
    colour: "gray",
  },
  {
    internalName: "ltcusdt",
    label: "LTC",
    colour: "darkblue",
  },
].map((c) => ({ ...c, data: [], startingPrice: 0 }));

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    borderRadius: "2rem",
    borderColor: "rgb(255 255 255)",
    padding: "2.5rem",
  },
};

function GameChart() {
  const [tickerCount, setTickerCount] = useState<number>(0);
  const [streaming, setStreaming] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<string>();
  const [data, setData] = useState<ITickerWithData[]>(DEFAULT_COINS);

  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [backMessage, setBackMessage] = useState("");
  const [modalIsOpenSuccess, setIsOpenSuccess] = useState(false);
  const [modalIsOpenFailure, setIsOpenFailure] = useState(false);

  function openModalSuccess() {
    setIsOpenSuccess(true);
  }

  function closeModalSuccess(name: string) {
    setIsOpenSuccess(false);
    saveData(name, 1);
  }

  function openModalFailure() {
    setIsOpenFailure(true);
  }

  function closeModalFailure(name: string) {
    setIsOpenFailure(false);
    saveData(name, 0);
  }

  async function saveData(name: string, correct: number) {
    if (!selectedCoin) return;
    await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: name, correct }),
    });
    const historyData: IHistory[] = JSON.parse(
      localStorage.getItem("HISTORY_DATA") || "[]"
    );
    localStorage.setItem(
      `HISTORY_DATA`,
      JSON.stringify([
        ...historyData,
        {
          coin: selectedCoin,
          result: getFinalScore()
            .map((d, i) => `${i + 1}. ${d.label}`)
            .join(", "),
        },
      ])
    );
  }

  const reset = () => {
    setStreaming(false);
    setData(DEFAULT_COINS);
    setTickerCount(0);
  };

  const getFinalScore = () => {
    if (data.length === 0 || data[0].data.length < 2) return [...data];
    return [...data].sort(
      (a, b) =>
        b.data[b.data.length - 1].Price - a.data[a.data.length - 1].Price
    );
  };

  useEffect(() => {
    if (Math.round(tickerCount) === MAX_TICKS + 1) {
      setStreaming(false);
      if (selectedCoin === getFinalScore()[0].label) {
        setMessage(`Well done, you have guessed the coin correctly!`);
        setSuccessMessage("Correct guess!");
        setBackMessage("Go back");
        openModalSuccess();
      } else if (selectedCoin !== null) {
        setBackMessage("Go back");
        setMessage(
          `Unfortunately... your guess was incorrect. Feel free to try again!`
        );
        openModalFailure();
      }
    }
  }, [tickerCount]);

  return (
    <div className="h-screen w-screen space-y-16 overflow-hidden">
      <Nav />
      <div className="flex flex-row justify-between space-x-32 items-start h-[90vw] mx-24">
        <div className="flex flex-col items-center w-screen">
          <Chart
            type="line"
            options={{
              animations: {
                y: { type: "number", easing: "linear", duration: 1, from: NaN },
              },
              scales: {
                y: {
                  ticks: { callback: (value) => `${value} %` },
                  suggestedMin: -0.01,
                  suggestedMax: 0.01,
                },
              },
            }}
            data={{
              labels: Array(MAX_TICKS)
                .fill(0)
                .map((_, i) => `${Math.round(i * 10000) / 10000}s `),
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
        <div className="flex justify-center space-y-8 items-start h-1/3 flex-col">
          <div className="font-light">
            <p>
              Please choose which coin will gain the most (or lose the least) in
              the next {MAX_TICKS} seconds!
            </p>
          </div>

          {streaming && tickerCount < MAX_TICKS / 2 && (
            <p className="font-light">
              You can still pick a coin for{" "}
              {Math.round(MAX_TICKS / 2 - tickerCount)} seconds!
            </p>
          )}
          <div className="flex flex-row space-x-8 w-4/5">
            {tickerCount < MAX_TICKS / 2 && (
              <Guess
                coins={data.map((d) => d.label)}
                onChange={(coin) => setSelectedCoin(coin)}
                selected={selectedCoin}
              />
            )}
            {!streaming && (
              <button
                className="flex w-2/3 shadow-2xl items-center justify-center rounded-md bg-red-700 text-sm font-semibold text-white opacity-80 transition duration-300 ease-in-out hover:opacity-100
                sm:pt-[10px] sm:pb-[10px] sm:pl-[25px] sm:pr-[25px]"
                onClick={() => {
                  reset();
                  setStreaming(!streaming);
                }}
              >
                Start game
              </button>
            )}
          </div>
          {!selectedCoin && tickerCount > MAX_TICKS / 2 && (
            <p className="font-light">You cannot pick a coin anymore.</p>
          )}

          <div>
            {tickerCount !== 0 && (
              <p className="font-light">
                Current score:{" "}
                <span
                  className="font-light"
                  style={{
                    color: selectedCoin
                      ? selectedCoin === getFinalScore()[0].label
                        ? "green"
                        : "red"
                      : "inherit",
                  }}
                >
                  {getFinalScore()
                    ?.map((d, i) => `${i + 1}. ${d.label}`)
                    ?.join(", ")}
                </span>
              </p>
            )}
          </div>

          {Math.round(tickerCount) === MAX_TICKS + 1 && (
            <p>{selectedCoin === getFinalScore()[0].label}</p>
          )}
        </div>
      </div>

      {
        <ModalSuccess
          modalState={modalIsOpenSuccess}
          closeModalFunction={closeModalSuccess}
          styles={customStyles}
          message={message}
          successMessage={successMessage}
          backMessage={backMessage}
        />
      }
      {
        <ModalFail
          modalState={modalIsOpenFailure}
          closeModalFunction={closeModalFailure}
          styles={customStyles}
          message={message}
          backMessage={backMessage}
        />
      }
    </div>
  );
}

export default GameChart;
