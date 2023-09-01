import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar/Navbar"
import TodoPage from "./pages/TodosPage/TodoPage"
import Dailies from "./components/Dailies/Dailies"
import WeeklyLearnings from "./components/WeeklyLearnings/WeeklyLearnings"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/dailies" element={<Dailies />} />
          <Route path="/weekly-learnings" element={<WeeklyLearnings />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
