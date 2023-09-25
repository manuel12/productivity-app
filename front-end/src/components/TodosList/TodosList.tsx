import "./styles.css"
import React, { useState, useEffect } from "react"
import Todo from "../Todo/Todo"
import ITodo from "../../interfaces/ITodo"
import { setItem, getItem } from "../../utils"

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
    text: "",
  })

  const handleAddTodo = (e: any) => {
    e.preventDefault()

    if (newTodo.text === "") return

    const newTodosArray = [...todos, newTodo]
    setTodos(newTodosArray)
    setItem("todos", newTodosArray)
    setNewTodo({ completed: false, text: "" })
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
            value={newTodo.text}
            onChange={(e) => {
              const inputValue = e.target.value
              if (inputValue.length <= 40) {
                setNewTodo({ completed: false, text: e.target.value })
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
              <Todo
                index={i}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                setCompletedTodos={setCompletedTodos}
              />
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
