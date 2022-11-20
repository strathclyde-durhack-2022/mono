import Nav from "./Nav";
import { IScore } from "../models/Interface";
import ScoreList from "./ScoreList";
import { useEffect, useState } from "react";

export const MOCK_LEADERBOARD: IScore[] = [
  { username: "Mark", score: 20, totalGuess: 34 },
  { username: "Joe", score: 12, totalGuess: 18 },
  { username: "John", score: 78, totalGuess: 100 },
  { username: "Bob", score: 21, totalGuess: 29 },
  { username: "Andy", score: 3, totalGuess: 3 },
];

function Leaderboard() {
  const [scores, setScores] = useState<IScore[]>([]);

  useEffect(() => {
    getScores();
  }, []);

  async function getScores() {
    fetch(`http://localhost:5000/${100}`)
      .then((data) => data.json())
      .then((data) => setScores(data));
  }

  return (
    <div className="h-screen">
      <Nav />
      <ScoreList players={scores} />
    </div>
  );
}

export default Leaderboard;
