import "./styles.css"
import React, { useState, useEffect } from "react"
import CustomPage from "../CustomPage/CustomPage"
import TodoStatistics from "../../components/TodoStatistics/TodoStatistics"
import TodoList from "../../components/TodosList/TodosList"
import { getNumCompletedTodos } from "../../utils"
import ITodo from "../../interfaces/ITodo"
import API from "../../api"

const TodoPage: React.FC = () => {
  const getTodosFromDbOrStorage = (setTodos: any) => {
    API.getTodos(setTodos)
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
    <div className="container" data-cy="todo-page-container">
      <CustomPage headingText="To Dos" dataCyAttr="todos-heading">
        <div className="TodosPage-upper-stats">
          <TodoStatistics todos={todos} numCompletedTodos={numCompletedTodos} />
        </div>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          setNumCompletedTodos={setNumCompletedTodos}
        />
        <div className="TodosPage-lower-stats">
          <TodoStatistics todos={todos} numCompletedTodos={numCompletedTodos} />
        </div>
      </CustomPage>
    </div>
  )
}

export default TodoPage
