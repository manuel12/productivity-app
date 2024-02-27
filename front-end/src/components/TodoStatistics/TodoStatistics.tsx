import "./styles.css"
import React, { useState, useEffect } from "react"
import ITodo from "../../interfaces/ITodo"
import {
  getNumCompletedTodosToday,
  getAvgDailyCompletedTodos,
  percentageDiff,
} from "../../utils"

interface ITodoListProps {
  todos: ITodo[]
  numCompletedTodos: number
}

const TStats: React.FC<ITodoListProps> = ({ todos, numCompletedTodos }) => {
  const [numCompletedTodosToday, setNumCompletedTodosToday] = useState(0)
  const [numAverageCompletedTodos, setNumAvgCompletedTodos] = useState(0)
  const [perfecentageDiff, setPercentageDiff] = useState(
    percentageDiff(numCompletedTodos, numAverageCompletedTodos)
  )

  useEffect(() => {
    // Print all completed todos dates.
    const numTodosCompletedToday = getNumCompletedTodosToday(todos)

    setNumCompletedTodosToday(numTodosCompletedToday)
  })

  useEffect(() => {
    const numAverageCompletedTodos = getAvgDailyCompletedTodos(todos)
    setNumAvgCompletedTodos(numAverageCompletedTodos)
  }, [numCompletedTodos])

  useEffect(() => {
    setPercentageDiff(
      percentageDiff(numCompletedTodosToday, numAverageCompletedTodos)
    )
  }, [numCompletedTodos, numAverageCompletedTodos])

  return (
    <div className="TStats" aria-label="Todo Statistics">
      <div
        className="TStats__stats-container border-danger"
        data-cy="statistics-daily-completed-todos"
      >
        <div className="TStats_text-container">Completed today:</div>
        <div className="display-1 TStats_num-container" aria-live="polite">
          {numCompletedTodosToday}
        </div>
      </div>
      <div
        className="TStats__stats-container border-success"
        data-cy="statistics-daily-avg-completed-todos"
      >
        <div className="TStats_text-container">Avg daily completed:</div>
        <div className="display-1 TStats_num-container" aria-live="polite">
          {numAverageCompletedTodos}
        </div>
      </div>
      <div
        className="TStats__stats-container border-warning"
        data-cy="statistics-percentage-diff"
      >
        <div className="TStats_text-container">Percentage difference:</div>

        <div className="display-1 TStats_num-container" aria-live="polite">
          {perfecentageDiff}%
        </div>
      </div>
    </div>
  )
}

export default TStats
