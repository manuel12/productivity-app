import React, { useState, useEffect } from "react"
import CustomPage from "../CustomPage/CustomPage"
import TodoStatistics from "../../components/TodoStatistics/TodoStatistics"
import TodoList from "../../components/TodosList/TodosList"
import { getItem, getNumCompletedTodos } from "../../utils"
import ITodo from "../../interfaces/ITodo"

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>(getItem("todos") || [])
  const [completedTodos, setCompletedTodos] = useState(
    getNumCompletedTodos(todos)
  )

  useEffect(() => {})

  return (
    <>
      <CustomPage headingText="To Dos" dataCyAttr="todos-heading">
        <TodoStatistics todos={todos} completedTodos={completedTodos} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </CustomPage>
    </>
  )
}

export default TodoPage
