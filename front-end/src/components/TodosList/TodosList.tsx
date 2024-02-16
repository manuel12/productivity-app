import React, { useState, useEffect } from "react"

import ITodo from "../../interfaces/ITodo"
import Todo from "../Todo/Todo"
import CustomInput from "../CustomInput/CustomInput"
import CustomList from "../CustomList/CustomList"
import Tabs from "../Tabs/Tabs"

import API from "../../api"

import * as yup from "yup"

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

  const schema = yup.object({
    todo: yup
      .string()
      .required("Todo is required.")
      .min(3, "Todos cannot be less than 3 characters.")
      .max(40, "Todos cannot be more than 40 characters."),
  })

  useEffect(() => {
    const completedTodos = todos.filter((todo) => todo.completed === true)
    setCompletedTodos(completedTodos)

    const uncompletedTodos = todos.filter((todo) => todo.completed === false)
    setUncompletedTodos(uncompletedTodos)

    setListTodos(todos)
  }, [todos])

  const handleAddTodo = (todoData: any, e: any) => {
    e.preventDefault()

    const newTodo = {
      completed: false,
      description: todoData.todo,
    }

    const addNewTodoToArray = (newTodo: any) => {
      const newTodosArray = [...todos, newTodo]
      setTodos(newTodosArray)
    }
    API.addTodo(newTodo, addNewTodoToArray)
  }

  return (
    <>
      <CustomInput
        itemName="todo"
        handleAddItem={handleAddTodo}
        schema={schema}
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
