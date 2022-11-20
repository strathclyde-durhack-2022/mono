import { useEffect, useState } from "react";
export interface IDataPerFrame {
  Symbol: string;
  EventTime: number;
  Price: number;
}
/*
<symbol>@kline_<interval>
{
  "e": "kline",     // Event type
  "E": 123456789,   // Event time
  "s": "BNBBTC",    // Symbol
  "k": {
    "t": 123400000, // Kline start time
    "T": 123460000, // Kline close time
    "s": "BNBBTC",  // Symbol
    "i": "1m",      // Interval
    "f": 100,       // First trade ID
    "L": 200,       // Last trade ID
    "o": "0.0010",  // Open price
    "c": "0.0020",  // Close price
    "h": "0.0025",  // High price
    "l": "0.0015",  // Low price
    "v": "1000",    // Base asset volume
    "n": 100,       // Number of trades
    "x": false,     // Is this kline closed?
    "q": "1.0000",  // Quote asset volume
    "V": "500",     // Taker buy base asset volume
    "Q": "0.500",   // Taker buy quote asset volume
    "B": "123456"   // Ignore
  }
}
*/
const URL_WEB_SOCKET = "wss://stream.binance.com:443/ws";

const Connection = (props: {
  Symbols: Array<string>;
  onMessage: (data: IDataPerFrame) => void;
}) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  const close = () => {
    if (ws) ws.close();
  };

  useEffect(() => {
    const request = {
      method: "SUBSCRIBE",
      params: props.Symbols.map((s) => s + "@kline_1s"),
      id: 1,
    };
    const wsClient = new WebSocket(URL_WEB_SOCKET);
    wsClient.onopen = () => {
      setWs(wsClient);
      wsClient.send(JSON.stringify(request));
    };
    wsClient.onclose = () => console.log("ws closed");
    wsClient.onmessage = (evt) => {
      const trade = JSON.parse(evt.data);
      if (!trade.k) return;
      const currData: IDataPerFrame = {
        Symbol: trade["k"]["s"],
        EventTime: trade["E"],
        Price: (Number(trade["k"]["o"]) + Number(trade["k"]["c"])) / 2,
      };
      console.log(currData);
      props.onMessage(currData);
    };
    return () => {
      wsClient.close();
    };
  }, []);

  return <></>;
};
export default Connection;
