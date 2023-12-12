import React from "react"
import CustomPage from "../CustomPage/CustomPage"
import WeeklyLearningsList from "../../components/WeeklyLearningsList/WeeklyLearningsList"

const WeeklyLearningPage: React.FC = () => {
  return (
    <>
      <div className="display-6 mt-5 text-danger">⚠️ Under Construction ⚠️</div>
      <CustomPage headingText="Weekly Learnings" dataCyAttr="learnings-heading">
        <WeeklyLearningsList />
      </CustomPage>
    </>
  )
}

export default WeeklyLearningPage
