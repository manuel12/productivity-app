import "./styles.css"
import React, {
  ChangeEvent,
  KeyboardEvent,
  DragEvent,
  useEffect,
  useState,
} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faRemove } from "@fortawesome/free-solid-svg-icons"
import ITodoItemProps from "../../interfaces/ITodoItemProps"
import { getNumCompletedTodos } from "../../utils"
import API from "../../api"

const Todo: React.FC<ITodoItemProps> = ({
  index,
  todo,
  todos,
  setTodos,
  setNumCompletedTodos,
}) => {
  const [completed, setCompleted] = useState(todo.completed)
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(todo.description)
  const [errorLabel, setErrorLabel] = useState("")

  useEffect(() => {
    setCompleted(todo.completed)
  }, [todo])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedDescription(e.target.value)
  }

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    todoIndex: number
  ) => {
    // Check if ENTER key was pressed
    if ((e as any).key === "Enter") {
      handleSaveClick(todoIndex)
    }
  }

  const handleCheckClick = (todoIndex: number) => {
    const tempTodos = todos

    // Get specific todo to update
    const todoToUpdate = todos[todoIndex]

    // Set todo complete prop to true
    const updatedTodoCompleted = todoToUpdate.completed
    todoToUpdate.completed = !updatedTodoCompleted
    setCompleted(todoToUpdate.completed)

    if (todoToUpdate.completed) {
      // Set todo dateCompleted prop to the current date
      todoToUpdate.dateCompleted = new Date().toISOString()
      playTodoCompletedSound()
    } else {
      // If uncompleted set to undefined
      todoToUpdate.dateCompleted = undefined
    }

    tempTodos[todoIndex] = todoToUpdate

    const updatedTempTodos = [...tempTodos]
    setTodos(updatedTempTodos)
    setNumCompletedTodos(getNumCompletedTodos(tempTodos))

    const todoId = todoToUpdate.id
    todoId && API.editTodo(todoToUpdate, todoId)
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = (todoIndex: number) => {
    if (editedDescription.length === 0) {
      setErrorLabel("Todos is required.")
    } else if (editedDescription.length > 40) {
      setErrorLabel("Todos cannot contain more than 40 characters.")
    } else if (editedDescription.length < 3) {
      setErrorLabel("Todos cannot contain less than 3 characters.")
    } else {
      setErrorLabel("")
      const tempTodos = todos

      const todoToUpdate = todos[todoIndex]
      todoToUpdate.description = editedDescription

      tempTodos[todoIndex] = todoToUpdate
      setTodos(tempTodos)

      const todoId = todoToUpdate.id
      todoId && API.editTodo(todoToUpdate, todoId)

      setIsEditing(false)
    }
  }

  const handleRemoveClick = (todoIndex: number) => {
    const todoToRemove = todos[todoIndex]
    const newTodos = todos.filter(
      (todo) => todoToRemove.description !== todo.description
    )

    setTodos(newTodos)

    const todoId = todoToRemove.id
    todoId && API.deleteTodo(todoId)

    playTodoRemovedSound()
  }

  const playTodoCompletedSound = () => {
    let audio = new Audio("complete-todo.ogg")
    audio.play()
  }

  const playTodoRemovedSound = () => {
    let audio = new Audio("remove-todo.mp3")
    audio.volume = 0.2
    audio.play()
  }

  const handleDragStart = (e: DragEvent<HTMLLIElement>, index: number) => {
    e.dataTransfer.setData("index", index.toString())
  }

  const handleDragOver = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: DragEvent<HTMLLIElement>, targetIndex: number) => {
    e.preventDefault()
    const sourceIndex = parseInt(e.dataTransfer.getData("index"))
    const updatedTodos = [...todos]
    const [movedTodo] = updatedTodos.splice(sourceIndex, 1)
    updatedTodos.splice(targetIndex, 0, movedTodo)
    setTodos(updatedTodos)
  }

  return (
    <li
      id={`todo-description-${index}`}
      key={todo.description}
      className="list-group-item todo-item"
      data-cy="todo-item"
      draggable={false}
      // onDragStart={(e) => handleDragStart(e, index)}
      // onDragOver={handleDragOver}
      // onDrop={(e) => handleDrop(e, index)}
      aria-label={`todo-description-${index}`}
    >
      <div
        className="check-icon-container"
        data-cy="todos-check-icon-container"
      >
        <FontAwesomeIcon
          className={completed ? "check-completed" : "check-not-completed"}
          icon={faCircleCheck}
          data-cy="fa-circle-check"
          onClick={() => {
            handleCheckClick(index)
          }}
        />
      </div>
      {/* If editing display an input field*/}
      <div
        className={`description-container ${
          completed ? "description-completed" : "description-not-completed"
        }`}
        data-cy="todos-description-container"
        onClick={handleEditClick} // Enable editing mode when the description is clicked
      >
        {errorLabel && (
          <label className="text-danger w-100 mb-3" data-cy="todo-error-label">
            {errorLabel}
          </label>
        )}
        {isEditing ? (
          <input
            type="text"
            className="form-control input"
            value={editedDescription}
            onChange={handleInputChange}
            onBlur={() => handleSaveClick(index)} // Save the edited description when the input field loses focus
            onKeyDown={(e) => {
              handleKeyDown(e, index)
            }}
            data-cy="todos-text-input"
            autoFocus // Automatically focus on the input field when editing starts
          />
        ) : (
          todo.description
        )}
      </div>
      <div className="remove-icon-container">
        <FontAwesomeIcon
          icon={faRemove}
          className="remove"
          onClick={() => {
            handleRemoveClick(index)
          }}
        />
      </div>
    </li>
  )
}

export default Todo
