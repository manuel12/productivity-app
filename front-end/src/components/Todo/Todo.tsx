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
import { ITodoItemProps } from "../../interfaces/interfaces"
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
    // Get specific todo to update by id value
    const todoToUpdate = todos.find((todo) => todo.id === todoIndex)

    if (todoToUpdate) {
      // 1. Update todoToUpdate to have completed = true
      const updatedTodoCompleted = todoToUpdate.completed
      todoToUpdate.completed = !updatedTodoCompleted
      setCompleted(todoToUpdate.completed)

      // 2. Play completed todo sound
      if (todoToUpdate.completed) {
        // Set todo dateCompleted prop to the current date
        todoToUpdate.dateCompleted = new Date().toISOString()
        playTodoCompletedSound()
      } else {
        // If uncompleted set to undefined
        todoToUpdate.dateCompleted = undefined
      }

      // 3. Update todo with api
      const todoId = todoToUpdate.id
      todoId &&
        API.editTodo(todoToUpdate, todoId)
          .then(() => {
            // 4. Get all updated user todos with api
            // 5. Call setTodos passing update todos array
            API.getUserTodos(setTodos)
          })

          .then(() => {
            // Update
            setNumCompletedTodos(getNumCompletedTodos(todos))
          })
    }
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = (todoIndex: number) => {
    if (editedDescription.length === 0) {
      setErrorLabel("Todo description is required.")
    } else if (editedDescription.length > 40) {
      setErrorLabel("Todos cannot contain more than 40 characters.")
    } else if (editedDescription.length < 3) {
      setErrorLabel("Todos must be at least 3 characters.")
    } else {
      setErrorLabel("")
      const tempTodos = todos

      const todoToUpdate = todos.find((todo) => todo.id === todoIndex)
      if (todoToUpdate) {
        todoToUpdate.description = editedDescription

        tempTodos[todoIndex] = todoToUpdate
        setTodos(tempTodos)

        const todoId = todoToUpdate.id
        todoId && API.editTodo(todoToUpdate, todoId)

        setIsEditing(false)
      }
    }
  }

  const handleRemoveClick = (todoIndex: number) => {
    const todoToRemove = todos.find((todo) => todo.id === todoIndex)

    if (todoToRemove) {
      const newTodos = todos.filter(
        (todo) => todoToRemove.description !== todo.description
      )

      setTodos(newTodos)

      const todoId = todoToRemove.id
      todoId && API.deleteTodo(todoId)

      playTodoRemovedSound()
    }
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

  //   const handleDragStart = (e: DragEvent<HTMLLIElement>, index: number) => {
  //     e.dataTransfer.setData("index", index.toString())
  //   }

  //   const handleDragOver = (e: DragEvent<HTMLLIElement>) => {
  //     e.preventDefault()
  //   }

  //   const handleDrop = (e: DragEvent<HTMLLIElement>, targetIndex: number) => {
  //     e.preventDefault()
  //     const sourceIndex = parseInt(e.dataTransfer.getData("index"))
  //     const updatedTodos = [...todos]
  //     const [movedTodo] = updatedTodos.splice(sourceIndex, 1)
  //     updatedTodos.splice(targetIndex, 0, movedTodo)
  //     setTodos(updatedTodos)
  //   }

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
