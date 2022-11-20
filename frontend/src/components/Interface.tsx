export interface IHistory {
  coin: ICoin;
  guess: number;
  result: number;
}

export interface IScore {
  username: string; 
  score: number;
  totalGuess:number;
}

export type ICoin = string;
