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
import { setItem, getNumCompletedTodos } from "../../utils"
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
    console.log(tempTodos)

    // Get specific todo to update
    const todoToUpdate = todos[todoIndex]

    // Set todo complete prop to true
    const updatedTodoCompleted = todoToUpdate.completed
    todoToUpdate.completed = !updatedTodoCompleted
    setCompleted(todoToUpdate.completed)

    // Set todo dateCompleted prop to the current date
    todoToUpdate.dateCompleted = new Date().toISOString()

    tempTodos[todoIndex] = todoToUpdate
    console.log(tempTodos)

    setTodos(tempTodos)
    setNumCompletedTodos(getNumCompletedTodos(tempTodos))

    const useDB = true
    if (useDB) {
      const todoId = todoToUpdate.id
      todoId && API.editTodo(todoToUpdate, todoId)
    } else {
      setItem("todos", tempTodos)
    }

    todoToUpdate.completed && playTodoCompletedSound()
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = (todoIndex: number) => {
    // Save the edited description and exit edit mode
    // You can implement the logic to save the edited description here
    // For example, you can call an API endpoint to update the todo item on the server
    const tempTodos = todos

    const todoToUpdate = todos[todoIndex]
    todoToUpdate.description = editedDescription

    tempTodos[todoIndex] = todoToUpdate
    setTodos(tempTodos)

    const useDB = true
    if (useDB) {
      const todoId = todoToUpdate.id
      todoId && API.editTodo(todoToUpdate, todoId)
    } else {
      setItem("todos", tempTodos)
    }

    // todoToUpdate.completed && playTodoCompletedSound()

    setIsEditing(false)
  }

  const handleRemoveClick = (todoIndex: number) => {
    const todoToRemove = todos[todoIndex]
    const newTodos = todos.filter(
      (todo) => todoToRemove.description !== todo.description
    )

    setTodos(newTodos)

    const useDB = true
    if (useDB) {
      const todoId = todoToRemove.id
      todoId && API.deleteTodo(todoId)
    } else {
      setItem("todos", newTodos)
    }

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
    console.log("sourceIndex", sourceIndex)

    const updatedTodos = [...todos]
    console.log("updatedTodos", updatedTodos)

    const [movedTodo] = updatedTodos.splice(sourceIndex, 1)
    console.log("movedTodo", movedTodo)

    updatedTodos.splice(targetIndex, 0, movedTodo)
    console.log("updatedTodos", updatedTodos)

    setTodos(updatedTodos)
  }

  return (
    <li
      key={todo.description}
      className="list-group-item"
      data-cy="todos-item"
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
    >
      <div
        className="check-icon-container"
        data-cy="todos-check-icon-container"
      >
        <FontAwesomeIcon
          className={completed ? "check-completed" : "check-not-completed"}
          icon={faCircleCheck}
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
        {isEditing ? (
          <input
            type="text"
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
