import "./styles.css"
import React, {
  ChangeEvent,
  KeyboardEvent,
  DragEvent,
  useEffect,
  useState,
} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleCheck,
  faRemove,
  faForward,
} from "@fortawesome/free-solid-svg-icons"
import { setItem, getNumCompletedTodos } from "../../utils"
import IDailyItemProps from "../../interfaces/IDailyItemProps"

const Daily: React.FC<IDailyItemProps> = ({
  index,
  daily,
  dailies,
  setDailies,
  setCompletedDailies,
}) => {
  const [completed, setCompleted] = useState(daily.completed)
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(daily.description)

  useEffect(() => {
    console.log(daily)
    setCompleted(daily.completed)
  }, [daily])

  const handleCheckClick = (dailyIndex: number) => {
    const tempDailiesList = dailies
    const dailyToUpdate = dailies[dailyIndex]

    // Update daily completed property
    const updatedTodoCompleted = dailyToUpdate.completed
    dailyToUpdate.completed = !updatedTodoCompleted
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
    setItem("dailies", newDailiesListArray)
  }

  const handleRemoveClick = (dailyIndex: number) => {
    const dailyToRemove = dailies[dailyIndex]
    const newDailiesList = dailies.filter(
      (daily) => dailyToRemove.description !== daily.description
    )

    const newDailiesListArray = [...newDailiesList]
    setDailies(newDailiesListArray)
    setItem("dailies", newDailiesListArray)
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
      >
        {daily.description}
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
