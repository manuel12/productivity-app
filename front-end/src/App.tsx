import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar/Navbar"
import TodoPage from "./pages/TodosPage/TodosPage"
import DailyPage from "./pages/DailiesPage/DailyPage"
import WeeklyLearningPage from "./pages/WeeklyLearningsPage/WeeklyLearningPage"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/dailies" element={<DailyPage />} />
          <Route path="/weekly-learnings" element={<WeeklyLearningPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
