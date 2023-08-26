import "./styles.css"
import React, { useState, FC, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

interface Todo {
  completed: boolean
  todoText: string
}

const ToDos: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState({
    completed: false,
    todoText: "",
  })

  useEffect(() => {
    console.log("Todos updated!")
  }, [todos])

  const handleAddTodoClick = (e: any) => {
    e.preventDefault()

    const newTodosArray = [...todos, newTodo]
    setTodos(newTodosArray)
    setNewTodo({ completed: false, todoText: "" })
  }

  const handleCheckClick = (todoIndex: number) => {
    const tempTodos = todos

    const updatedTodo = todos[todoIndex]
    const updatedTodoCompleted = updatedTodo.completed
    updatedTodo.completed = !updatedTodoCompleted

    tempTodos[todoIndex] = updatedTodo
    setTodos([...tempTodos])
  }

  return (
    <>
      <div className="my-5">
        <h1 className="display-1">To Dos</h1>
        <form onSubmit={handleAddTodoClick}>
          <div className="input-group my-5 mx-auto w-50">
            <input
              style={{
                borderRadius: "20px",
                borderWidth: "2px",
                padding: "15px",
              }}
              type="text"
              className="form-control mx-1"
              placeholder="Add a new todo..."
              aria-label="Add a new todo..."
              aria-describedby="button-addon2"
              value={newTodo.todoText}
              onChange={(e) =>
                setNewTodo({ completed: false, todoText: e.target.value })
              }
            />
          </div>
        </form>
        <div className="mx-auto w-50">
          <ul>
            {todos &&
              todos.map((todo, i) => (
                <li key={i}>
                  <div className="icon-container">
                    <FontAwesomeIcon
                      className={
                        todos[i].completed ? "completed" : "not-completed"
                      }
                      icon={faCircleCheck}
                      onClick={() => {
                        handleCheckClick(i)
                      }}
                    />
                  </div>
                  <div className="text-container">{todo.todoText}</div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default ToDos
