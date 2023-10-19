import "./styles.css"
import React, { useState } from "react"

import Todo from "../Todo/Todo"
import ITodo from "../../interfaces/ITodo"

import CustomInput from "../CustomInput/CustomInput"
import CustomList from "../CustomList/CustomList"

import { setItem } from "../../utils"
import API from "../../api"

interface ITodoListProps {
  todos: ITodo[]
  setTodos: (todos: ITodo[]) => void
  setCompletedTodos: (completedTodos: number) => void
}

const TodoList: React.FC<ITodoListProps> = ({
  todos,
  setTodos,
  setCompletedTodos,
}) => {
  const [newTodo, setNewTodo] = useState<ITodo>({
    completed: false,
    description: "",
  })

  const handleAddTodo = (e: any) => {
    e.preventDefault()

    if (newTodo.description === "") return

    const newTodosArray = [...todos, newTodo]
    setTodos(newTodosArray)

    const useDB = true
    if (useDB) {
      API.addTodo(newTodo)
    } else {
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
        {todos.map((todo, i) => (
          <Todo
            index={i}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            setCompletedTodos={setCompletedTodos}
          />
        ))}
      </CustomList>
    </>
  )
}

export default TodoList
