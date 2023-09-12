import "./styles.css"
import React, { useState, FC } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faRemove } from "@fortawesome/free-solid-svg-icons"
import { setItem, getItem } from "../../utils"

interface Todo {
  completed: boolean
  todoText: string
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(getItem("todos") || [])
  const [newTodo, setNewTodo] = useState<Todo>({
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

  const handleAddTodo = (e: any) => {
    e.preventDefault()

    if (newTodo.todoText === "") return

    const newTodosArray = [...todos, newTodo]
    setTodos(newTodosArray)
    setItem("todos", newTodosArray)
    setNewTodo({ completed: false, todoText: "" })
  }

  const handleCheckClick = (todoIndex: number) => {
    const tempTodos = todos

    const todoToUpdate = todos[todoIndex]
    const updatedTodoCompleted = todoToUpdate.completed
    todoToUpdate.completed = !updatedTodoCompleted

    tempTodos[todoIndex] = todoToUpdate
    setTodos([...tempTodos])
    setItem("todos", [...tempTodos])

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
      <form onSubmit={handleAddTodo} data-cy="todos-form">
        <div className="input-group my-5 mx-auto w-50">
          <input
            style={{
              borderRadius: "20px",
              borderWidth: "2px",
              padding: "15px",
            }}
            type="text"
            className="form-control mx-1"
            data-cy="todos-input"
            placeholder="Add a new todo..."
            aria-label="Add a new todo..."
            aria-describedby="button-addon2"
            value={newTodo.todoText}
            onChange={(e) => {
              const inputValue = e.target.value
              if (inputValue.length <= 40) {
                setNewTodo({ completed: false, todoText: e.target.value })
              }
            }}
            maxLength={40}
          />

          <button
            style={{
              borderRadius: "20px",
            }}
            className="btn btn-primary"
            data-cy="todos-submit"
            type="submit"
            id="button-addon2"
          >
            Add todo
          </button>
        </div>
      </form>
      <div className="mx-auto w-50">
        <ul className="list-group" data-cy="todos-list">
          {todos.length > 0 ? (
            todos.map((todo, i) => (
              <li key={i} className="list-group-item" data-cy="todos-item">
                <div
                  className="check-icon-container"
                  data-cy="todos-check-icon-container"
                >
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
                    todos[i].completed ? "text-completed" : "text-not-completed"
                  }`}
                  data-cy="todos-text-container"
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
    </>
  )
}

export default TodoList
