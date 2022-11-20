export interface IHistory { //for mockData, subject to change
    coin: string;
    guess: number;
    result: number;
}

export interface IScore {
    username: string; 
    score: number;
    totalGuess:number;
  }
  
type ICoin = string;
