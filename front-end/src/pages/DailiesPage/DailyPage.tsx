import React from "react"
import CustomPage from "../CustomPage/CustomPage"
import DailiesList from "../../components/DailiesList/DailiesList"

const DailyPage: React.FC = () => {
  return (
    <CustomPage headingText="Dailies" dataCyAttr="dailies-heading">
      <DailiesList />
    </CustomPage>
  )
}

export default DailyPage
