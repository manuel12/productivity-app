import "./styles.css"
import React, { useState, useEffect } from "react"

import IDaily from "../../interfaces/IDaily"
import Daily from "../Daily/Daily"
import CustomInput from "../CustomInput/CustomInput"
import CustomList from "../CustomList/CustomList"

import {
  setItem,
  checkAndUpdateCompletedStatus,
  checkAndUpdateStreakCounter,
} from "../../utils"
import API from "../../api"

interface IDaliesListProps {
  dailies: IDaily[]
  setDailies: (dailies: IDaily[]) => void
  setCompletedDailies: (completedDailies: number) => void
}

const DailiesList: React.FC<IDaliesListProps> = ({ dailies, setDailies }) => {
  const [newDaily, setNewDaily] = useState<IDaily>({
    completed: false,
    description: "",
    dateCreated: "",
    streakCounter: 0,
    lastCompletedDate: "",
  })

  useEffect(() => {
    if (dailies) {
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
        // setDailies(newDailiesListArray)
      }
    }
  }, [dailies])

  const handleAddDaily = () => {
    // e.preventDefault()

    if (newDaily.description === "") return

    const addNewDailyToArray = (newDaily: any) => {
      const newDailiesListArray = [...dailies, newDaily]
      setDailies(newDailiesListArray)
    }
    API.addDaily(newDaily, addNewDailyToArray)

    setNewDaily({
      completed: false,
      description: "",
      dateCreated: "",
      streakCounter: 0,
      lastCompletedDate: "",
    })
  }

  return (
    <>
      <CustomInput
        itemName="dailies"
        handleAddItem={handleAddDaily}
        // newItem={newDaily}
        // onChange={(e) => {
        //   const inputValue = e.target.value
        //   if (inputValue.length <= 40) {
        //     setNewDaily({
        //       completed: false,
        //       description: e.target.value,
        //       dateCreated: new Date().toDateString(),
        //       streakCounter: 0,
        //     })
        //   }
        // }}
        schema={null}
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
