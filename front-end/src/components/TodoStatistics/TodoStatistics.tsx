import "./styles.css"
import React, { useState, useEffect } from "react"
import ITodo from "../../interfaces/ITodo"
import { percentageDiff } from "../../utils"

interface ITodoListProps {
  todos: ITodo[]
  completedTodos: number
}

const TStatistics: React.FC<ITodoListProps> = ({ todos, completedTodos }) => {
  const [numAverageCompletedTodos, setNumAvgCompletedTodos] = useState(5)
  const [perfecentageDiff, setPercentageDiff] = useState(
    percentageDiff(completedTodos, numAverageCompletedTodos)
  )

  useEffect(() => {
    setPercentageDiff(percentageDiff(completedTodos, numAverageCompletedTodos))
  }, [completedTodos])

  return (
    <div className="w-50 TStatistics">
      <div
        className="TStatistics__stats-container border-danger"
        data-cy="statistics-daily-completed-todos"
      >
        Completed todos:
        <div className="display-1">{completedTodos}</div>
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
