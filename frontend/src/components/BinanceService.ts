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
const URL_WEB_SOCKET = 'wss://stream.binance.com:443/ws';


export class Connection {
  private ws: WebSocket | null = null;

  onMessage(data:IDataPerFrame): void {
    console.log(data);
  }

  constructor(Symbols: Array<string>, onMessage: (data: any) => void){
    const requesparams = Symbols.map(s=>    s+"@kline_1s"   )
    console.log(requesparams,Symbols)
    const request = {
      method: 'SUBSCRIBE',
      params: requesparams,
      id: 1,
    };
    const wsClient = new WebSocket(URL_WEB_SOCKET);
    wsClient.onopen = () => {
      this.ws = wsClient;
      wsClient.send(JSON.stringify(request));
    };
    wsClient.onmessage = (evt) => {
      const trade = JSON.parse(evt.data);  
      const currData:IDataPerFrame = {Symbol: trade["k"]["s"] , EventTime: trade["E"], Price: (Number(trade["k"]["o"])+Number(trade["k"]["c"]))/2}
      console.log(currData);
      onMessage(currData);
    };
    wsClient.onclose = () => console.log('ws closed');

  }
  
  closStream() {
    this.ws?.close();
  }
};
