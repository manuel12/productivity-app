import React, { useState, useEffect } from "react"
import CustomPage from "../CustomPage/CustomPage"
import TodoStatistics from "../../components/TodoStatistics/TodoStatistics"
import TodoList from "../../components/TodosList/TodosList"
import { getItem, getNumCompletedTodos } from "../../utils"
import ITodo from "../../interfaces/ITodo"
import API from "../../api"

const TodoPage: React.FC = () => {
  const useDB = true

  const getTodosFromDbOrStorage = (setTodos: any) => {
    if (useDB) {
      API.getTodos(setTodos)
    } else {
      setTodos(getItem("todos") || [])
    }
  }

  const [todos, setTodos] = useState<ITodo[]>([])
  const [completedTodos, setCompletedTodos] = useState(0)

  useEffect(() => {
    getTodosFromDbOrStorage(setTodos)
  }, [])

  useEffect(() => {
    setCompletedTodos(getNumCompletedTodos(todos))
  }, [todos])

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
