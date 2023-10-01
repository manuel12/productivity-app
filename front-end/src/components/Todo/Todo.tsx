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

const Todo: React.FC<ITodoItemProps> = ({
  index,
  todo,
  todos,
  setTodos,
  setCompletedTodos,
}) => {
  const [completed, setCompleted] = useState(todo.completed)
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(todo.text)

  useEffect(() => {
    setCompleted(todo.completed)
  }, [todo])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value)
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

    const todoToUpdate = todos[todoIndex]
    const updatedTodoCompleted = todoToUpdate.completed
    todoToUpdate.completed = !updatedTodoCompleted
    setCompleted(todoToUpdate.completed)

    tempTodos[todoIndex] = todoToUpdate
    setTodos(tempTodos)
    setCompletedTodos(getNumCompletedTodos(tempTodos))
    setItem("todos", tempTodos)

    todoToUpdate.completed && playTodoCompletedSound()
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = (todoIndex: number) => {
    // Save the edited text and exit edit mode
    // You can implement the logic to save the edited text here
    // For example, you can call an API endpoint to update the todo item on the server
    const tempTodos = todos

    const todoToUpdate = todos[todoIndex]
    todoToUpdate.text = editedText

    tempTodos[todoIndex] = todoToUpdate
    setTodos(tempTodos)
    setItem("todos", tempTodos)

    // todoToUpdate.completed && playTodoCompletedSound()

    setIsEditing(false)
  }

  const handleRemoveClick = (todoIndex: number) => {
    const todoToRemove = todos[todoIndex]
    const newTodos = todos.filter((todo) => todoToRemove.text !== todo.text)

    setTodos(newTodos)
    setItem("todos", newTodos)
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
      key={todo.text}
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

      {isEditing ? (
        // If editing display an input field
        <input
          type="text"
          value={editedText}
          onChange={handleInputChange}
          onBlur={() => handleSaveClick(index)} // Save the edited text when the input field loses focus
          onKeyDown={(e) => {
            handleKeyDown(e, index)
          }}
          autoFocus // Automatically focus on the input field when editing starts
        />
      ) : (
        // If not editing, display the todo text
        <div
          className={`text-container ${
            completed ? "text-completed" : "text-not-completed"
          }`}
          data-cy="todos-text-container"
          onClick={handleEditClick} // Enable editing mode when the text is clicked
        >
          {todo.text}
        </div>
      )}
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
