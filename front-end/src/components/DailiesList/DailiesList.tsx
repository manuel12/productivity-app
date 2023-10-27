import "./styles.css"
import React, { useState, useEffect } from "react"

import IDaily from "../../interfaces/IDaily"
import Daily from "../Daily/Daily"
import CustomInput from "../CustomInput/CustomInput"
import CustomList from "../CustomList/CustomList"

import {
  setItem,
  getItem,
  checkAndUpdateCompletedStatus,
  checkAndUpdateStreakCounter,
} from "../../utils"

interface IDaliesListProps {
  dailies: IDaily[]
  setDailies: (dailies: IDaily[]) => void
  setCompletedDailies: (completedDailies: number) => void
}

const DailiesList: React.FC<IDaliesListProps> = () => {
  const [dailies, setDailies] = useState<IDaily[]>(getItem("dailies") || [])
  const [newDaily, setNewDaily] = useState<IDaily>({
    completed: false,
    description: "",
    dateCreated: "",
    streakCounter: 0,
  })

  useEffect(() => {
    if (dailies.length > 0) {
      // If there are any dailies pass them through checkAndUpdateCompletedStatus
      // and update their 'completed' property value if needed
      let updatedDailiesList = dailies.map((daily) =>
        checkAndUpdateCompletedStatus(daily)
      )

      updatedDailiesList = dailies.map((daily) =>
        checkAndUpdateStreakCounter(daily)
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

    if (newDaily.description === "") return

    const newDailiesListArray = [...dailies, newDaily]
    setDailies(newDailiesListArray)
    setItem("dailies", newDailiesListArray)

    setNewDaily({
      completed: false,
      description: "",
      dateCreated: "",
      streakCounter: 0,
    })
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
              description: e.target.value,
              dateCreated: new Date().toDateString(),
              streakCounter: 0,
            })
          }
        }}
      />

      <CustomList items={dailies} itemName="dailies" dataCyAttr="dailies-list">
        {dailies.map((daily, i) => (
          <Daily
            index={i}
            daily={daily}
            dailies={dailies}
            setDailies={setDailies}
            setCompletedDailies={() => {}}
          />
        ))}
      </CustomList>
    </>
  )
}

export default DailiesList
