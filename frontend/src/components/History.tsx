import HistList from './HistList';
import Nav from './Nav';

import IHistory from '../models/Interface';

export const MOCK_HIST: IHistory[] = [
    { coin: "BNB", guess: 2, result: 4 },
    { coin: "BTC", guess: 1, result: 1 },
    { coin: "DOGE", guess: 3, result: 2 },
    { coin: "ADA", guess: 5, result: 3 },
    { coin: "XRP", guess: 4, result: 5 },
]

function History() {
    return (
        <div className='h-screen w-screen'>
            <Nav />
            <HistList hist={MOCK_HIST}  />
        </div>
    )
}

export default History