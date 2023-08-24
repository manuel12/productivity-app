import "./styles.css"
import { FC, useEffect, useState } from "react"
import BarChart from "../../charts/BarChart/BarChart"

import { setItem, getItem } from "../../utils"

interface LearningItem {
  learningText: string
  learningValue: number
}

const WeeklyLearnings: FC = () => {
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
      <div className="my-5">
        <h1 className="display-1">Weekly Learnings</h1>
      </div>

      <div className="input-group my-5 mx-auto w-50">
        <input
          style={{
            borderRadius: "20px",
            borderWidth: "2px",
            padding: "15px",
          }}
          type="text"
          className="form-control mx-1"
          placeholder="Add a new learning..."
          aria-label="Add a new learning..."
          aria-describedby="button-addon2"
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
          type="button"
          id="button-addon2"
          onClick={handleAddLearningClick}
        >
          Add Learning
        </button>
      </div>

      <div className="chart-container bg-light my-5 mx-auto w-50 border">
        <BarChart chartData={learnings} title="learnings" singleColor={true} />
      </div>
    </>
  )
}

export default WeeklyLearnings
