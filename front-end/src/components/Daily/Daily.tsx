import "./styles.css"
import React, {
  ChangeEvent,
  KeyboardEvent,
  //   DragEvent,
  useEffect,
  useState,
} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleCheck,
  faRemove,
  faForward,
} from "@fortawesome/free-solid-svg-icons"
import { IDailyItemProps } from "../../interfaces/interfaces"
import API from "../../api"

const Daily: React.FC<IDailyItemProps> = ({
  index,
  daily,
  dailies,
  setDailies,
  //   setCompletedDailies,
}) => {
  const [completed, setCompleted] = useState(daily.completed)
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(daily.description)

  useEffect(() => {
    setCompleted(daily.completed)
  }, [daily])

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

  const handleCheckClick = (dailyIndex: number) => {
    const tempDailiesList = dailies
    const dailyToUpdate = dailies[dailyIndex]

    // Update daily completed property
    const updatedDailyCompleted = dailyToUpdate.completed
    dailyToUpdate.completed = !updatedDailyCompleted
    setCompleted(dailyToUpdate.completed)

    if (dailyToUpdate.completed) {
      // Update daily streak counter property
      dailyToUpdate.streakCounter += 1
      dailyToUpdate.lastCompletedDate = new Date()
      playTodoCompletedSound()
    } else {
      // Update daily streak counter property
      dailyToUpdate.streakCounter -= 1
    }

    tempDailiesList[dailyIndex] = dailyToUpdate
    const newDailiesListArray = [...tempDailiesList]
    setDailies(newDailiesListArray)

    const dailyId = dailyToUpdate.id
    dailyId && API.editDaily(dailyToUpdate, dailyId)

    dailyToUpdate.completed && playTodoCompletedSound()
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = (dailyIndex: number) => {
    // Save the edited description and exit edit mode
    // You can implement the logic to save the edited description here
    // For example, you can call an API endpoint to update the todo item on the server
    const tempDailies = dailies

    const dailyToUpdate = dailies[dailyIndex]
    dailyToUpdate.description = editedDescription

    tempDailies[dailyIndex] = dailyToUpdate
    setDailies(tempDailies)

    const dailyId = dailyToUpdate.id
    dailyId && API.editDaily(dailyToUpdate, dailyId)

    // todoToUpdate.completed && playTodoCompletedSound()

    setIsEditing(false)
  }

  const handleRemoveClick = (dailyIndex: number) => {
    const dailyToRemove = dailies[dailyIndex]
    const newDailiesList = dailies.filter(
      (daily) => dailyToRemove.description !== daily.description
    )

    const newDailiesListArray = [...newDailiesList]
    setDailies(newDailiesListArray)

    const dailyId = dailyToRemove.id
    dailyId && API.deleteDaily(dailyId)

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

  //   const handleDragStart = (e: DragEvent<HTMLLIElement>, index: number) => {
  //     e.dataTransfer.setData("index", index.toString())
  //   }

  //   const handleDragOver = (e: DragEvent<HTMLLIElement>) => {
  //     e.preventDefault()
  //   }

  //   const handleDrop = (e: DragEvent<HTMLLIElement>, targetIndex: number) => {
  //     e.preventDefault()
  //     const sourceIndex = parseInt(e.dataTransfer.getData("index"))
  //     const updatedDailies = [...dailies]
  //     const [movedDaily] = updatedDailies.splice(sourceIndex, 1)
  //     updatedDailies.splice(targetIndex, 0, movedDaily)
  //     setDailies(updatedDailies)
  //   }

  return (
    <li
      key={daily.description}
      className="list-group-item"
      data-cy="dailies-item"
    >
      <div
        className="check-icon-container"
        data-cy="dailies-check-icon-container"
      >
        <FontAwesomeIcon
          className={completed ? "check-completed" : "check-not-completed"}
          icon={faCircleCheck}
          onClick={() => {
            handleCheckClick(index)
          }}
        />
      </div>
      <div
        className={`description-container ${
          completed ? "description-completed" : "description-not-completed"
        }`}
        data-cy="dailies-description-container"
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
            data-cy="dailies-text-input"
            autoFocus // Automatically focus on the input field when editing starts
          />
        ) : (
          daily.description
        )}
      </div>

      <div className="streak-icon-container">
        <FontAwesomeIcon icon={faForward} className="streak" />
        {daily.streakCounter}
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

export default Daily
