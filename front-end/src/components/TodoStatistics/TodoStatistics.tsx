import "./styles.css"
import React, { useState, useEffect } from "react"
import ITodo from "../../interfaces/ITodo"
import { percentageDiff, getAvgDailyCompletedTodos } from "../../utils"

interface ITodoListProps {
  todos: ITodo[]
  numCompletedTodos: number
}

const TStatistics: React.FC<ITodoListProps> = ({
  todos,
  numCompletedTodos,
}) => {
  const [numAverageCompletedTodos, setNumAvgCompletedTodos] = useState(0)
  const [perfecentageDiff, setPercentageDiff] = useState(
    percentageDiff(numCompletedTodos, numAverageCompletedTodos)
  )

  useEffect(() => {
    const numAverageCompletedTodos = getAvgDailyCompletedTodos(todos)
    setNumAvgCompletedTodos(numAverageCompletedTodos)
  }, [numCompletedTodos])

  useEffect(() => {
    setPercentageDiff(
      percentageDiff(numCompletedTodos, numAverageCompletedTodos)
    )
  }, [numCompletedTodos])

  return (
    <div className="w-50 TStatistics">
      <div
        className="TStatistics__stats-container border-danger"
        data-cy="statistics-daily-completed-todos"
      >
        Completed todos:
        <div className="display-1">{numCompletedTodos}</div>
      </div>
      <div
        className="TStatistics__stats-container border-success"
        data-cy="statistics-daily-avg-completed-todos"
      >
        Avg daily completed todos:
        <div className="display-1">{numAverageCompletedTodos}</div>
      </div>
      <div
        className="TStatistics__stats-container border-warning"
        data-cy="statistics-percentage-diff"
      >
        Percentage difference:
        <div className="display-1">{perfecentageDiff}%</div>
      </div>
    </div>
  )
}

export default TStatistics
