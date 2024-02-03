import "./App.css"
import { useState } from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"

import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"

import Navbar from "./components/Navbar/Navbar"
import TodoPage from "./pages/TodosPage/TodosPage"
import DailyPage from "./pages/DailiesPage/DailyPage"
import WeeklyLearningPage from "./pages/WeeklyLearningsPage/WeeklyLearningPage"
import { getItem } from "./utils"

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(getItem("userLoggedIn"))

  return (
    <div className="App">
      {userLoggedIn ? (
        <LoggedInRoutes />
      ) : (
        <LoggedOutRoutes setLogin={setUserLoggedIn} />
      )}
    </div>
  )
}

export default App

const LoggedInRoutes = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/dailies" element={<DailyPage />} />
          <Route path="/weekly-learnings" element={<WeeklyLearningPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

interface LoggedOutRoutesProps {
  setLogin: any
}

const LoggedOutRoutes: React.FC<LoggedOutRoutesProps> = ({ setLogin }) => {
  return (
    <Router>
      <Routes>
        <Route
          path="/account/login"
          element={<LoginPage setLogin={setLogin} />}
        />
        <Route path="/account/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/account/login" replace />} />
      </Routes>
    </Router>
  )
}
