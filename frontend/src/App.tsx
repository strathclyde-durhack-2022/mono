// @ts-ignore
import Home from "./pages/Home.jsx"
import GameChart from "./components/GameChart"
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
      </Routes>
    </Router>
  )
}

export default App
