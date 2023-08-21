import React from "react";
import "./App.css";

import WeeklyLearnings from "./components/WeeklyLearnings/WeeklyLearnings";

function App() {
  const learnings = [{ learningText: "Exercise more", learningValue: 3 }];
  return (
    <div className='App'>
      <WeeklyLearnings items={learnings} />
    </div>
  );
}

export default App;
