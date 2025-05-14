import React, { useState, useEffect } from "react"

import { ITodo } from "../../interfaces/interfaces"
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
    todos.filter((todo) => todo.completed == true)
  )
  const [uncompletedTodos, setUncompletedTodos] = useState<ITodo[]>(
    todos.filter((todo) => todo.completed == false)
  )

  const [allTodos, setAllTodos] = useState<ITodo[]>(
    todos.filter((todo) => todo.completed == false)
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
      .required("Todo description text is required.")
      .min(3, "Todos must be at least 3 characters.")
      .max(40, "Todos cannot contain more than 40 characters."),
  })

  useEffect(() => {
    const completedTodos = todos.filter((todo) => todo.completed == true)
    setCompletedTodos(completedTodos)

    const uncompletedTodos = todos.filter((todo) => todo.completed == false)
    setUncompletedTodos(uncompletedTodos)

    const allTodos = todos
    setAllTodos(allTodos)

    if (tabState.all === "active") {
      setListTodos(allTodos)
    }
  }, [todos])

  useEffect(() => {
    if (tabState.complete === "active") {
      setListTodos(completedTodos)
    }
  }, [completedTodos])

  useEffect(() => {
    if (tabState.uncomplete === "active") {
      setListTodos(uncompletedTodos)
    }
  }, [uncompletedTodos])

  useEffect(() => {
    if (tabState.all === "active") {
      setListTodos(allTodos.reverse())
    }
  }, [allTodos])

  const handleAddTodo = (data: any, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault()

    const newTodo = {
      completed: false,
      description: data.todo,
      dateCompleted: "",
    }

    const addNewTodoToArray = (newTodo: ITodo) => {
      const newTodosArray = [newTodo, ...todos]
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
        todos={allTodos}
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
          listTodos.map((todo, i) => {
            return (
              <Todo
                index={todo.id as number}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                setNumCompletedTodos={setNumCompletedTodos}
              />
            )
          })}
      </CustomList>
    </>
  )
}

export default TodoList
