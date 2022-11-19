import react, { useState } from 'react'
import HistList from './HistList';
import IHistory from './Interface';

function History() {
    const mockHist: IHistory[] = [ //mock data
        { coin: "BNB", guess: 2, result: 4 },
        { coin: "BTC", guess: 1, result: 1 },
        { coin: "DOGE", guess: 3, result: 2 },
        { coin: "ADA", guess: 5, result: 3 },
        { coin: "XRP", guess: 4, result: 5 },
    ]
    return (
        <div className='history'>
            <HistList hist={mockHist}  />
        </div>
    )
}

export default History