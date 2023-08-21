import React, { FC } from "react";

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
  console.log(learningKeys, learningValues);

  return (
    <>
      <span>{learningValues[0]}:</span> <span>{learningValues[1]}</span>
    </>
  );
};

export default WeeklyLearnings;
