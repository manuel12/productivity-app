import React, { useState, useEffect } from "react"
import CustomPage from "../CustomPage/CustomPage"
import DailiesList from "../../components/DailiesList/DailiesList"
import IDaily from "../../interfaces/IDaily"

import API from "../../api"

const DailyPage: React.FC = () => {
  const getDailiesFromDbOrStorage = (setDailies: any) => {
    API.getDailies(setDailies)
  }

  const [dailies, setDailies] = useState<IDaily[]>([])
  const [completedDailies, setCompletedDalies] = useState(0)

  useEffect(() => {
    getDailiesFromDbOrStorage(setDailies)
  }, [])

  return (
    <CustomPage headingText="Dailies" dataCyAttr="dailies-heading">
      <DailiesList
        dailies={dailies}
        setDailies={setDailies}
        setCompletedDailies={setCompletedDalies}
      />
    </CustomPage>
  )
}

export default DailyPage
