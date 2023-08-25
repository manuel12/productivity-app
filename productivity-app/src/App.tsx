import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import WeeklyLearnings from "./components/WeeklyLearnings/WeeklyLearnings"
import ToDos from "./components/ToDos/ToDos"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WeeklyLearnings />} />
          <Route path="/todos" element={<ToDos />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
