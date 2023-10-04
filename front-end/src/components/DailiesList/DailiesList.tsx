import "./styles.css"
import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleCheck,
  faRemove,
  faForward,
} from "@fortawesome/free-solid-svg-icons"

import IDaily from "../../interfaces/IDaily"
import CustomInput from "../CustomInput/CustomInput"
import CustomList from "../CustomList/CustomList"

import { setItem, getItem, checkAndUpdateCompletedStatus } from "../../utils"

const DailiesList: React.FC = () => {
  const [dailies, setDailies] = useState<IDaily[]>(getItem("dailies") || [])
  const [newDaily, setNewDaily] = useState<IDaily>({
    completed: false,
    text: "",
    dateCreated: "",
    streakCounter: 0,
  })

  useEffect(() => {
    if (DailiesList.length > 0) {
      // If there are any dailies pass them through checkAndUpdateCompletedStatus
      // and update their 'completed' property value if needed
      const updatedDailiesList = dailies.map((daily) =>
        checkAndUpdateCompletedStatus(daily)
      )

      const newDailiesListArray = [...updatedDailiesList]

      if (newDailiesListArray) {
        setDailies(newDailiesListArray)
        setItem("dailies", newDailiesListArray)
      }
    }
  }, [])

  const handleAddDaily = (e: any) => {
    e.preventDefault()

    if (newDaily.text === "") return

    const newDailiesListArray = [...dailies, newDaily]
    setDailies(newDailiesListArray)
    setItem("dailies", newDailiesListArray)

    setNewDaily({
      completed: false,
      text: "",
      dateCreated: "",
      streakCounter: 0,
    })
  }

  const handleCheckClick = (dailyIndex: number) => {
    const tempDailiesList = dailies
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

    tempDailiesList[dailyIndex] = dailyToUpdate
    const newDailiesListArray = [...tempDailiesList]
    setDailies(newDailiesListArray)
    setItem("dailies", newDailiesListArray)

    dailyToUpdate.completed && playTodoCompletedSound()
  }

  const handleRemoveClick = (dailyIndex: number) => {
    const dailyToRemove = dailies[dailyIndex]
    const newDailiesList = dailies.filter(
      (daily) => dailyToRemove.text !== daily.text
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
    <>
      <CustomInput
        itemName="dailies"
        handleAddItem={handleAddDaily}
        newItem={newDaily}
        onChange={(e) => {
          const inputValue = e.target.value
          if (inputValue.length <= 40) {
            setNewDaily({
              completed: false,
              text: e.target.value,
              dateCreated: new Date().toDateString(),
              streakCounter: 0,
            })
          }
        }}
      />

      <CustomList items={dailies} itemName="dailies" dataCyAttr="dailies-list">
        {dailies.map((daily, i) => (
          <li key={i} className="list-group-item" data-cy="dailies-item">
            <div
              className="check-icon-container"
              data-cy="dailies-check-icon-container"
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
                dailies[i].completed ? "text-completed" : "text-not-completed"
              }`}
              data-cy="dailies-text-container"
            >
              {daily.text}
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
        ))}
      </CustomList>
    </>
  )
}

export default DailiesList
