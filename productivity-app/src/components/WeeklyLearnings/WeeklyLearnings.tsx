import "./styles.css";
import { FC } from "react";
import BarChart from "../../charts/BarChart/BarChart";

interface LearningItem {
  learningText: string;
  learningValue: number;
}

interface LearningListProps {
  items: LearningItem[];
}

const WeeklyLearnings: FC<LearningListProps> = ({ items }) => {
  const firstItem = items[0];
  const learningKeys = Object.keys(firstItem);
  const learningValues = Object.values(firstItem);

  return (
    <>
      <span>{learningValues[0]}:</span> <span>{learningValues[1]}</span>
      <div className='chart-container'>
        <BarChart chartData={items} title='learnings' singleColor={true} />
      </div>
    </>
  );
};

export default WeeklyLearnings;
