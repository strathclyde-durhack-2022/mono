// @ts-ignore
import Home from "./pages/Home.jsx"
import GameChart from "./components/GameChart"
import History from "./components/History"
import Leaderboard from "./components/Leaderboard"

import {
  BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GameChart />} />
        <Route path="/history" element={<History />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  )
}

export default App
