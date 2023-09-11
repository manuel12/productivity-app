import "./styles.css"
import React, { useState, FC, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleCheck,
  faRemove,
  faForward,
} from "@fortawesome/free-solid-svg-icons"
import { setItem, getItem, checkAndUpdateCompletedStatus } from "../../utils"

export interface Daily {
  completed: boolean
  dailyText: string
  dateCreated: Date | string
  streakCounter: number
}

const DailiesList: FC = () => {
  const [DailiesList, setDailiesList] = useState<Daily[]>(
    getItem("dailies") || []
  )
  const [newDaily, setNewDaily] = useState<Daily>({
    completed: false,
    dailyText: "",
    dateCreated: "",
    streakCounter: 0,
  })

  useEffect(() => {
    if (DailiesList.length > 0) {
      // If there are any dailies pass them through checkAndUpdateCompletedStatus
      // and update their 'completed' property value if needed
      const updatedDailiesList = DailiesList.map((daily) =>
        checkAndUpdateCompletedStatus(daily)
      )

      const newDailiesListArray = [...updatedDailiesList]

      if (newDailiesListArray) {
        setDailiesList(newDailiesListArray)
        setItem("dailies", newDailiesListArray)
      }
    }
  }, [])

  const handleAddDaily = (e: any) => {
    e.preventDefault()

    if (newDaily.dailyText === "") return

    const newDailiesListArray = [...DailiesList, newDaily]
    setDailiesList(newDailiesListArray)
    setItem("dailies", newDailiesListArray)

    setNewDaily({
      completed: false,
      dailyText: "",
      dateCreated: "",
      streakCounter: 0,
    })
  }

  const handleCheckClick = (dailyIndex: number) => {
    const tempDailiesList = DailiesList
    const dailyToUpdate = DailiesList[dailyIndex]

    // Update daily completed property
    const updatedTodoCompleted = dailyToUpdate.completed
    dailyToUpdate.completed = !updatedTodoCompleted

    if (dailyToUpdate.completed) {
      // Update daily streak counter property
      dailyToUpdate.streakCounter += 1
    } else {
      // Update daily streak counter property
      dailyToUpdate.streakCounter -= 1
    }

    tempDailiesList[dailyIndex] = dailyToUpdate
    const newDailiesListArray = [...tempDailiesList]
    setDailiesList(newDailiesListArray)
    setItem("dailies", newDailiesListArray)

    dailyToUpdate.completed && playTodoCompletedSound()
  }

  const handleRemoveClick = (dailyIndex: number) => {
    const dailyToRemove = DailiesList[dailyIndex]
    const newDailiesList = DailiesList.filter(
      (daily) => dailyToRemove.dailyText !== daily.dailyText
    )

    const newDailiesListArray = [...newDailiesList]
    setDailiesList(newDailiesListArray)
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
    <>
      <form onSubmit={handleAddDaily} data-cy="dailies-form">
        <div className="input-group my-5 mx-auto w-50">
          <input
            style={{
              borderRadius: "20px",
              borderWidth: "2px",
              padding: "15px",
            }}
            type="text"
            className="form-control mx-1"
            data-cy="dailies-input"
            placeholder="Add a new daily..."
            aria-label="Add a new daily..."
            aria-describedby="button-addon2"
            value={newDaily.dailyText}
            onChange={(e) => {
              const inputValue = e.target.value
              if (inputValue.length <= 40) {
                setNewDaily({
                  completed: false,
                  dailyText: e.target.value,
                  dateCreated: new Date().toDateString(),
                  streakCounter: 0,
                })
              }
            }}
            maxLength={40}
          />
          <button
            style={{
              borderRadius: "20px",
            }}
            className="btn btn-primary"
            data-cy="dailies-submit"
            type="submit"
            id="button-addon2"
          >
            Add daily
          </button>
        </div>
      </form>
      <div className="mx-auto w-50">
        <ul className="list-group" data-cy="dailies-list">
          {DailiesList.length > 0 ? (
            DailiesList.map((daily, i) => (
              <li key={i} className="list-group-item" data-cy="dailies-item">
                <div
                  className="check-icon-container"
                  data-cy="dailies-check-icon-container"
                >
                  <FontAwesomeIcon
                    className={
                      DailiesList[i].completed
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
                    DailiesList[i].completed
                      ? "text-completed"
                      : "text-not-completed"
                  }`}
                  data-cy="dailies-text-container"
                >
                  {daily.dailyText}
                </div>

                <div className="streak-icon-container">
                  <FontAwesomeIcon
                    icon={faForward}
                    className="streak"
                    onClick={() => {
                      handleRemoveClick(i)
                    }}
                  />
                  {daily.streakCounter}
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
            <div className="display-4">No DailiesList added yet...</div>
          )}
        </ul>
      </div>
    </>
  )
}

export default DailiesList
