// @ts-ignore
import Home from "./pages/Home.jsx"
import GameChart from "./components/GameChart"
import History from "./components/History.js"
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
      </Routes>
    </Router>
  )
}

export default App
