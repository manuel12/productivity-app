import React, { useState, useEffect } from "react"

import ITodo from "../../interfaces/ITodo"
import Todo from "../Todo/Todo"
import CustomInput from "../CustomInput/CustomInput"
import CustomList from "../CustomList/CustomList"
import Tabs from "../Tabs/Tabs"

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
  const [completedTodos, setCompletedTodos] = useState<ITodo[]>(
    todos.filter((todo) => todo.completed === true)
  )
  const [uncompletedTodos, setUncompletedTodos] = useState<ITodo[]>(
    todos.filter((todo) => todo.completed === false)
  )
  const [listTodos, setListTodos] = useState<ITodo[]>([])

  const [tabState, setTabState] = useState({
    all: "active",
    complete: "",
    uncomplete: "",
  })

  useEffect(() => {
    const completedTodos = todos.filter((todo) => todo.completed === true)
    setCompletedTodos(completedTodos)

    const uncompletedTodos = todos.filter((todo) => todo.completed === false)
    setUncompletedTodos(uncompletedTodos)

    setListTodos(todos)
  }, [todos])

  const [newTodo, setNewTodo] = useState<ITodo>({
    completed: false,
    description: "",
  })

  const handleAddTodo = (e: any) => {
    e.preventDefault()

    if (newTodo.description === "") return

    const addNewTodoToArray = (newTodo: any) => {
      const newTodosArray = [...todos, newTodo]
      setTodos(newTodosArray)
    }
    API.addTodo(newTodo, addNewTodoToArray)

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

      <Tabs
        tabState={tabState}
        setTabState={setTabState}
        setListTodos={setListTodos}
        todos={todos}
        completedTodos={completedTodos}
        uncompletedTodos={uncompletedTodos}
      ></Tabs>

      <CustomList items={todos} itemName="todos" dataCyAttr="todos-list">
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
