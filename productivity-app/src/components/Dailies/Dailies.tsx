import "./styles.css"
import React, { useState, FC, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faRemove } from "@fortawesome/free-solid-svg-icons"

import { setItem, getItem, checkAndUpdateCompletedStatus } from "../../utils"

interface Daily {
  completed: boolean
  dailyText: string
  dateCreated: Date | string
}

const Dailies: FC = () => {
  const [dailies, setDailies] = useState<Daily[]>(getItem("dailies") || [])
  const [newDaily, setNewDaily] = useState({
    completed: false,
    dailyText: "",
    dateCreated: "",
  })

  useEffect(() => {
    const updatedDailies = dailies.map((daily) =>
      checkAndUpdateCompletedStatus(daily)
    )

    const newDailiesArray = [...updatedDailies]
    setDailies(newDailiesArray)
    setItem("dailies", newDailiesArray)
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
    })
  }

  const handleCheckClick = (dailyIndex: number) => {
    const tempDailies = dailies

    const dailyToUpdate = dailies[dailyIndex]
    const updatedTodoCompleted = dailyToUpdate.completed
    dailyToUpdate.completed = !updatedTodoCompleted

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
        <h1 className="display-1">Dailies</h1>
        <form onSubmit={handleAddDaily}>
          <div className="input-group my-5 mx-auto w-50">
            <input
              style={{
                borderRadius: "20px",
                borderWidth: "2px",
                padding: "15px",
              }}
              type="text"
              className="form-control mx-1"
              placeholder="Add a new daily..."
              aria-label="Add a new daily..."
              aria-describedby="button-addon2"
              value={newDaily.dailyText}
              onChange={(e) =>
                setNewDaily({
                  completed: false,
                  dailyText: e.target.value,
                  dateCreated: new Date().toDateString(),
                })
              }
            />
          </div>
        </form>
        <div className="mx-auto w-50">
          <ul className="list-group">
            {dailies.length > 0 ? (
              dailies.map((daily, i) => (
                <li key={i} className="list-group-item">
                  <div className="check-icon-container">
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
                  >
                    {daily.dailyText}
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
