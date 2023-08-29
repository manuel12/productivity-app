import "./styles.css"
import React, { useState, FC, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faRemove } from "@fortawesome/free-solid-svg-icons"

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

  const playTodoCompletedSound = () => {
    let audio = new Audio("complete-todo.ogg")
    audio.play()
  }

  const playTodoRemovedSound = () => {
    let audio = new Audio("remove-todo.mp3")
    audio.volume = 0.2
    audio.play()
  }

  useEffect(() => {
    console.log("Todos updated!")
  }, [todos])

  const handleAddTodo = (e: any) => {
    e.preventDefault()

    if (newTodo.todoText === "") return

    const newTodosArray = [...todos, newTodo]
    setTodos(newTodosArray)
    setNewTodo({ completed: false, todoText: "" })
  }

  const handleCheckClick = (todoIndex: number) => {
    const tempTodos = todos

    const todoToUpdate = todos[todoIndex]
    const updatedTodoCompleted = todoToUpdate.completed
    todoToUpdate.completed = !updatedTodoCompleted

    tempTodos[todoIndex] = todoToUpdate
    setTodos([...tempTodos])

    todoToUpdate.completed && playTodoCompletedSound()
  }

  const handleRemoveClick = (todoIndex: number) => {
    const todoToRemove = todos[todoIndex]
    const newTodos = todos.filter(
      (todo) => todoToRemove.todoText !== todo.todoText
    )

    setTodos([...newTodos])
    playTodoRemovedSound()
  }

  return (
    <>
      <div className="my-5">
        <h1 className="display-1">To Dos</h1>
        <form onSubmit={handleAddTodo}>
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
          <ul className="list-group">
            {todos.length > 0 ? (
              todos.map((todo, i) => (
                <li key={i} className="list-group-item">
                  <div className="check-icon-container">
                    <FontAwesomeIcon
                      className={
                        todos[i].completed
                          ? "check-completed"
                          : "check-not-completed"
                      }
                      icon={faCircleCheck}
                      onClick={() => {
                        handleCheckClick(i)
                      }}
                    />
                  </div>
                  <div
                    className={`text-container ${
                      todos[i].completed
                        ? "text-completed"
                        : "text-not-completed"
                    }`}
                  >
                    {todo.todoText}
                  </div>
                  <div className="remove-icon-container">
                    <FontAwesomeIcon
                      icon={faRemove}
                      className="remove"
                      onClick={() => {
                        handleRemoveClick(i)
                      }}
                    />
                  </div>
                </li>
              ))
            ) : (
              <div className="display-4">No todos added yet...</div>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default ToDos
