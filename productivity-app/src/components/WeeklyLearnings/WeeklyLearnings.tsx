import "./styles.css";
import { FC, useEffect, useState } from "react";
import BarChart from "../../charts/BarChart/BarChart";

import { setItem, getItem } from "../../utils";

interface LearningItem {
  learningText: string;
  learningValue: number;
}

interface LearningListProps {
  items: LearningItem[];
}

const WeeklyLearnings: FC = () => {
  const [learnings, setLearnings] = useState<LearningItem[]>(
    getItem("learnings") || []
  );
  const [newLearning, setNewLearning] = useState({
    learningText: "",
    learningValue: 0,
  });

  useEffect(() => {
    console.log(learnings);
    console.log(getItem("learnings"));
    setItem("learnings", learnings);
  }, [learnings]);

  const handleAddLearningClick = (e: any) => {
    console.log(
      learnings.find(
        (learning) => learning.learningText === newLearning.learningText
      )
    );

    const learningWithSameTextFound = learnings.find(
      (learning) => learning.learningText === newLearning.learningText
    );

    if (learningWithSameTextFound) {
      // Check if learningText already exists in learnings array,
      // if so then add + 1 to it's learningValue.
      const newLearningsArray = learnings.map((learning) => {
        if (learning.learningText === learningWithSameTextFound.learningText) {
          learningWithSameTextFound.learningValue += 1;
          return learningWithSameTextFound;
        } else {
          return learning;
        }
      });
      setLearnings(newLearningsArray);
    } else {
      const newLearningsArray = [...learnings, newLearning];
      setLearnings(newLearningsArray);
    }
  };

  return (
    <>
      <h1>Weekly Learnings</h1>

      <div className='input-group my-5 mx-auto w-50'>
        <input
          type='text'
          className='form-control'
          placeholder='Add a new learning...'
          aria-label='Add a new learning...'
          aria-describedby='button-addon2'
          value={newLearning?.learningText}
          onChange={(e) =>
            setNewLearning({ learningText: e.target.value, learningValue: 1 })
          }
        />
        <button
          className='btn btn-outline-secondary'
          type='button'
          id='button-addon2'
          onClick={handleAddLearningClick}
        >
          Button
        </button>
      </div>

      <div className='chart-container my-5 mx-auto'>
        <BarChart chartData={learnings} title='learnings' singleColor={true} />
      </div>
    </>
  );
};

export default WeeklyLearnings;
