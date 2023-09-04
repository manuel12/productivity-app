import "./styles.css"
import React, { useState, FC, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleCheck,
  faRemove,
  faForward,
} from "@fortawesome/free-solid-svg-icons"

import { setItem, getItem, checkAndUpdateCompletedStatus } from "../../utils"

interface Daily {
  completed: boolean
  dailyText: string
  dateCreated: Date | string
  streakCounter: number
}

const Dailies: FC = () => {
  const [dailies, setDailies] = useState<Daily[]>(getItem("dailies") || [])
  const [newDaily, setNewDaily] = useState<Daily>({
    completed: false,
    dailyText: "",
    dateCreated: "",
    streakCounter: 0,
  })

  useEffect(() => {
    if (dailies.length > 0) {
      const updatedDailies = dailies.map((daily) =>
        checkAndUpdateCompletedStatus(daily)
      )

      const newDailiesArray = [...updatedDailies]

      if (newDailiesArray) {
        setDailies(newDailiesArray)
        setItem("dailies", newDailiesArray)
      }
    }
  }, [])

  const handleAddDaily = (e: any) => {
    e.preventDefault()

    if (newDaily.dailyText === "") return

    const newDailiesArray = [...dailies, newDaily]
    setDailies(newDailiesArray)
    setItem("dailies", newDailiesArray)

    setNewDaily({
      completed: false,
      dailyText: "",
      dateCreated: "",
      streakCounter: 0,
    })
  }

  const handleCheckClick = (dailyIndex: number) => {
    const tempDailies = dailies
    const dailyToUpdate = dailies[dailyIndex]

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

    tempDailies[dailyIndex] = dailyToUpdate
    const newDailiesArray = [...tempDailies]
    setDailies(newDailiesArray)
    setItem("dailies", newDailiesArray)

    dailyToUpdate.completed && playTodoCompletedSound()
  }

  const handleRemoveClick = (dailyIndex: number) => {
    const dailyToRemove = dailies[dailyIndex]
    const newDailies = dailies.filter(
      (daily) => dailyToRemove.dailyText !== daily.dailyText
    )

    const newDailiesArray = [...newDailies]
    setDailies(newDailiesArray)
    setItem("dailies", newDailiesArray)
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
      <div className="my-5">
        <h1 className="display-1" data-test="dailies-heading">
          Dailies
        </h1>
        <form onSubmit={handleAddDaily} data-test="dailies-form">
          <div className="input-group my-5 mx-auto w-50">
            <input
              style={{
                borderRadius: "20px",
                borderWidth: "2px",
                padding: "15px",
              }}
              type="text"
              className="form-control mx-1"
              data-test="dailies-input"
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
          </div>
        </form>
        <div className="mx-auto w-50">
          <ul className="list-group" data-test="dailies-list">
            {dailies.length > 0 ? (
              dailies.map((daily, i) => (
                <li
                  key={i}
                  className="list-group-item"
                  data-test="dailies-item"
                >
                  <div
                    className="check-icon-container"
                    data-test="dailies-check-icon-container"
                  >
                    <FontAwesomeIcon
                      className={
                        dailies[i].completed
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
                      dailies[i].completed
                        ? "text-completed"
                        : "text-not-completed"
                    }`}
                    data-test="dailies-text-container"
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
              <div className="display-4">No dailies added yet...</div>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Dailies
