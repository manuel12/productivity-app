import "./styles.css"
import React, { useState, useEffect } from "react"

import ITodo from "../../interfaces/ITodo"
import Todo from "../Todo/Todo"
import CustomInput from "../CustomInput/CustomInput"
import CustomList from "../CustomList/CustomList"

import { setItem } from "../../utils"
import API from "../../api"

interface ITodoListProps {
  todos: ITodo[]
  setTodos: (todos: ITodo[]) => void
  setNumCompletedTodos: (numCompletedTodos: number) => void
}

const TodoList: React.FC<ITodoListProps> = ({
  todos,
  setTodos,
  setNumCompletedTodos,
}) => {
  const [completedTodos, setCompletedTodos] = useState<ITodo[]>([])
  const [uncompletedTodos, setUncompletedTodos] = useState<ITodo[]>([])
  const [listTodos, setListTodos] = useState(todos)

  useEffect(() => {
    const completedTodos = todos.filter((todo) => todo.completed === true)
    setCompletedTodos(completedTodos)

    const uncompletedTodos = todos.filter((todo) => todo.completed === false)
    setUncompletedTodos(uncompletedTodos)
  }, [todos])

  const [newTodo, setNewTodo] = useState<ITodo>({
    completed: false,
    description: "",
  })

  const handleAddTodo = (e: any) => {
    e.preventDefault()

    if (newTodo.description === "") return

    const useDB = true
    if (useDB) {
      const addNewTodoToArray = (newTodo: any) => {
        const newTodosArray = [...todos, newTodo]
        setTodos(newTodosArray)
      }
      API.addTodo(newTodo, addNewTodoToArray)
    } else {
      const newTodosArray = [...todos, newTodo]
      setTodos(newTodosArray)
      setItem("todos", newTodosArray)
    }

    setNewTodo({ completed: false, description: "" })
  }

  return (
    <>
      <CustomInput
        itemName="todos"
        handleAddItem={handleAddTodo}
        newItem={newTodo}
        onChange={(e) => {
          const inputValue = e.target.value
          if (inputValue.length <= 40) {
            setNewTodo({ completed: false, description: e.target.value })
          }
        }}
      />

      <CustomList items={todos} itemName="todos" dataCyAttr="todos-list">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <div
              className="nav-link active"
              aria-current="page"
              onClick={() => setListTodos(todos)}
            >
              All
            </div>
            <div
              className="nav-link active"
              aria-current="page"
              onClick={() => setListTodos(completedTodos)}
            >
              Completed
            </div>
            <div
              className="nav-link active"
              aria-current="page"
              onClick={() => setListTodos(uncompletedTodos)}
            >
              Uncompleted
            </div>
          </li>
        </ul>
        {listTodos &&
          listTodos.map((todo, i) => (
            <Todo
              index={i}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              setNumCompletedTodos={setNumCompletedTodos}
            />
          ))}
      </CustomList>
    </>
  )
}

export default TodoList
