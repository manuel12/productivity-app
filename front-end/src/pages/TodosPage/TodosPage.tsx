import "./styles.css"
import React, { useState, useEffect } from "react"
import CustomPage from "../CustomPage/CustomPage"
import TodoStatistics from "../../components/TodoStatistics/TodoStatistics"
import TodoList from "../../components/TodosList/TodosList"
import { getItem, getNumCompletedTodos } from "../../utils"
import ITodo from "../../interfaces/ITodo"
import API from "../../api"

const TodoPage: React.FC = () => {
  const getTodosFromDbOrStorage = (setTodos: any) => {
    const useDB = true
    if (useDB) {
      API.getTodos(setTodos)
    } else {
      setTodos(getItem("todos") || [])
    }
  }

  const [todos, setTodos] = useState<ITodo[]>([])
  const [numCompletedTodos, setNumCompletedTodos] = useState(0)

  useEffect(() => {
    getTodosFromDbOrStorage(setTodos)
  }, [])

  useEffect(() => {
    setNumCompletedTodos(getNumCompletedTodos(todos))
  }, [todos])

  return (
    <>
      <CustomPage headingText="To Dos" dataCyAttr="todos-heading">
        <TodoStatistics todos={todos} numCompletedTodos={numCompletedTodos} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          setNumCompletedTodos={setNumCompletedTodos}
        />
      </CustomPage>
    </>
  )
}

export default TodoPage
