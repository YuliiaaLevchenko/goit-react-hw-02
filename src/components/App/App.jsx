import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Description from "../Description/Description";
import Feedback from "../Feedback/Feedback";
import Options from "../Options/Options";
import Notification from "../Notification/Notification";

const initialState = { good: 0, neutral: 0, bad: 0 };

const getInitialFeedback = () => {
  const savedFeedback = window.localStorage.getItem('feedback');
  return savedFeedback !== null ? JSON.parse(savedFeedback) : initialState;
};

function App() {
  const [feedback, setFeedback] = useState(getInitialFeedback);

  useEffect(() => {
    window.localStorage.setItem('saved-feedback', JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (key) => {
    setFeedback({
      ...feedback,
      [key]: feedback[key] + 1
    });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const resetFeedback = () => {
    setFeedback(initialState);
  };

  const positiveFeedback =
    Math.round(((feedback.good + feedback.neutral) / totalFeedback) * 100) +
    "%";

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
