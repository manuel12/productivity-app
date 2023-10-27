import React, { useState } from "react"
import CustomPage from "../CustomPage/CustomPage"
import DailiesList from "../../components/DailiesList/DailiesList"
import IDaily from "../../interfaces/IDaily"

const DailyPage: React.FC = () => {
  const [dailies, setDailies] = useState<IDaily[]>([])
  const [completedDailies, setCompletedDalies] = useState(0)

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
