import React, { useState, useEffect } from "react"

import { ITodo } from "../../interfaces/interfaces"
import Todo from "../Todo/Todo"
import CustomInput from "../CustomInput/CustomInput"
import CustomList from "../CustomList/CustomList"
import Tabs from "../Tabs/Tabs"

import API from "../../api"

import * as yup from "yup"
import { getItem } from "../../utils"

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
  //   const [newTodo, setNewTodo] = useState<ITodo>({
  //     completed: false,
  //     description: "",
  //     dateCompleted: "",
  //   })

  const [completedTodos, setCompletedTodos] = useState<ITodo[]>(
    todos.filter((todo) => todo.completed === true)
  )
  const [uncompletedTodos, setUncompletedTodos] = useState<ITodo[]>(
    todos.filter((todo) => todo.completed === false)
  )
  const [listTodos, setListTodos] = useState<ITodo[]>([])

  const [tabState, setTabState] = useState({
    uncomplete: "active",
    complete: "",
    all: "",
  })

  const schema = yup.object({
    todo: yup
      .string()
      .required("Todo is required.")
      .min(3, "Todos cannot contain less than 3 characters.")
      .max(40, "Todos cannot contain more than 40 characters."),
  })

  useEffect(() => {
    const completedTodos = todos.filter((todo) => todo.completed == true)
    setCompletedTodos(completedTodos)

    const uncompletedTodos = todos.filter((todo) => todo.completed == false)
    setUncompletedTodos(uncompletedTodos)

    if (tabState.all === "active") setListTodos(todos)
    if (tabState.complete === "active") setListTodos(completedTodos)
    if (tabState.uncomplete === "active") setListTodos(uncompletedTodos)
  }, [todos])

  const handleAddTodo = (data: any, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault()
    console.log("handleAddTodo!")
    console.log(data)

    const newTodo = {
      completed: false,
      description: data.todo,
      dateCompleted: "",
    }
    // setNewTodo(newTodo)
    console.log(newTodo)

    const addNewTodoToArray = (newTodo: ITodo) => {
      const newTodosArray = [...todos, newTodo]
      setTodos(newTodosArray)
    }

    // 1. Create new todo with API
    API.addTodo(newTodo, addNewTodoToArray).then(() => {
      // 2. GET all created todo with API
      // 3. Once we have all created todos fetched(old ones + new one)
      // 4. Call setTodos to repopulate the todo list
      API.getUserTodos(setTodos)
    })
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
        aria-label="Todo Tabs"
      ></Tabs>

      <CustomList
        items={todos}
        itemName="todos"
        dataCyAttr="todos-list"
        aria-label="List of Todos"
      >
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
