import "./styles.css"
import React, { useState, useEffect } from "react"

import { IDaily } from "../../interfaces/interfaces"
import Daily from "../Daily/Daily"
import CustomInput from "../CustomInput/CustomInput"
import CustomList from "../CustomList/CustomList"

import {
  //   setItem,
  checkAndUpdateCompletedStatus,
  checkAndUpdateStreakCounter,
} from "../../utils"
import API from "../../api"

import * as yup from "yup"

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

  const schema = yup.object({
    daily: yup
      .string()
      .required("Dailies are required.")
      .min(3, "Dailies cannot contain less than 3 characters.")
      .max(40, "Dailies cannot contain more than 40 characters."),
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

  const handleAddDaily = (data: IDaily, e?: React.BaseSyntheticEvent) => {
    setNewDaily({
      completed: false,
      description: data.description,
      dateCreated: "",
      streakCounter: 0,
      lastCompletedDate: "",
    })

    e?.preventDefault()

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
        itemName="daily"
        handleAddItem={handleAddDaily}
        schema={schema}
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
