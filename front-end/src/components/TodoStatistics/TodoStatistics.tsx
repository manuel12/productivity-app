import "./styles.css"
import React, { useState, useEffect } from "react"
import ITodo from "../../interfaces/ITodo"
import { percentageDiff } from "../../utils"

interface ITodoListProps {
  todos: ITodo[]
  completedTodos: number
}

const TodoStatistics: React.FC<ITodoListProps> = ({
  todos,
  completedTodos,
}) => {
  const [numAverageCompletedTodos, setNumAvgCompletedTodos] = useState(12)
  const [perfecentageDiff, setPercentageDiff] = useState(
    percentageDiff(completedTodos, numAverageCompletedTodos)
  )

  useEffect(() => {
    console.log("todos updated!")
  }, [todos])

  useEffect(() => {
    console.log("completedTodos updated!")
    setPercentageDiff(percentageDiff(completedTodos, numAverageCompletedTodos))
  }, [completedTodos])

  return (
    <div className="w-50 TodoStatistics">
      <div className="TodoStatistics__statistics-container">
        Completed todos:
        <div className="display-1">{completedTodos}</div>
      </div>
      <div className="TodoStatistics__statistics-container">
        Avg daily completed todos
        <div className="display-1">{numAverageCompletedTodos}</div>
      </div>
      <div className="TodoStatistics__statistics-container ">
        Percentage difference
        <div className="display-1">{perfecentageDiff}%</div>
      </div>
    </div>
  )
}

export default TodoStatistics
