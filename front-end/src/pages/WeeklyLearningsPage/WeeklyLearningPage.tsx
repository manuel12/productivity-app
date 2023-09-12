import React from "react"
import CustomPage from "../CustomPage/CustomPage"
import WeeklyLearningsList from "../../components/WeeklyLearningsList/WeeklyLearningsList"

const WeeklyLearningPage: React.FC = () => {
  return (
    <CustomPage
      headingText="Weekly Learnings"
      dataCyAttr="learnings-heading"
      listComponent={WeeklyLearningsList}
    />
  )
}

export default WeeklyLearningPage
