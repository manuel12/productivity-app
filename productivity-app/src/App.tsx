import "./App.css";

import WeeklyLearnings from "./components/WeeklyLearnings/WeeklyLearnings";

function App() {
  const learnings = [
    { learningText: "Exercise more", learningValue: 3 },
    { learningText: "Don't drink cofffee in the mornings", learningValue: 5 },
  ];

  return (
    <div className='App'>
      <WeeklyLearnings items={learnings} />
    </div>
  );
}

export default App;
