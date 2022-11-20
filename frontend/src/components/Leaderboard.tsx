import Nav from './Nav';
import {IScore} from '../models/Interface';
import ScoreList from './ScoreList';

export const MOCK_LEADERBOARD: IScore[] = [
    { username: "Mark", score: 20, totalGuess: 34 },
    { username: "Joe", score: 12, totalGuess: 18 },
    { username: "John", score: 78, totalGuess: 100 },
    { username: "Bob", score: 21, totalGuess: 29 },
    { username: "Andy", score: 3, totalGuess: 3 },
]

function Leaderboard() {
    return (
        <div className='h-screen'>
            <Nav />
            <ScoreList players={MOCK_LEADERBOARD}/>
        </div>
    )
}

export default Leaderboard
