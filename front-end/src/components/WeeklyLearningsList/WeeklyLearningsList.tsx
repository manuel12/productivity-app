import "./styles.css"
import { FC, useEffect, useState } from "react"
import BarChart from "../../charts/BarChart/BarChart"

import { setItem, getItem } from "../../utils"

interface LearningItem {
  learningText: string
  learningValue: number
}

const WeeklyLearningsList: FC = () => {
  const [learnings, setLearnings] = useState<LearningItem[]>(
    getItem("learnings") || []
  )
  const [newLearning, setNewLearning] = useState({
    learningText: "",
    learningValue: 0,
  })

  useEffect(() => {
    setItem("learnings", learnings)
  }, [learnings])

  const handleAddLearningClick = (e: any) => {
    e.preventDefault()

    if (newLearning.learningText === "") return

    const learningWithSameTextFound = learnings.find(
      (learning) => learning.learningText === newLearning.learningText
    )

    if (learningWithSameTextFound) {
      // Check if learningText already exists in learnings array,
      // if so then add + 1 to it's learningValue.
      const newLearningsArray = learnings.map((learning) => {
        if (learning.learningText === learningWithSameTextFound.learningText) {
          learningWithSameTextFound.learningValue += 1
          return learningWithSameTextFound
        } else {
          return learning
        }
      })
      setLearnings(newLearningsArray)
    } else {
      const newLearningsArray = [...learnings, newLearning]
      setLearnings(newLearningsArray)
    }

    setNewLearning({ learningText: "", learningValue: 0 })
  }

  return (
    <>
      <form onSubmit={handleAddLearningClick} data-cy="learnings-form">
        <div className="input-group my-5 mx-auto w-50">
          <input
            type="text"
            className="form-control mx-1 LearningsList__input"
            data-cy="learnings-input"
            placeholder="Add a new learning..."
            aria-label="Add a new learning..."
            aria-describedby="add-learning-button"
            value={newLearning?.learningText}
            onChange={(e) =>
              setNewLearning({
                learningText: e.target.value,
                learningValue: 1,
              })
            }
          />
          <button
            style={{
              borderRadius: "20px",
            }}
            className="btn btn-primary"
            data-cy="learnings-submit"
            type="submit"
            id="add-learning-button"
          >
            Add Learning
          </button>
        </div>
      </form>
      <div
        className="chart-container bg-light my-5 mx-auto w-50 border"
        data-cy="learnings-chart"
      >
        <BarChart chartData={learnings} title="learnings" singleColor={true} />
      </div>
    </>
  )
}

export default WeeklyLearningsList
