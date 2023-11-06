import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

const FEEDBACK_TYPES = {
  GOOD: 'good',
  NEUTRAL: 'neutral',
  BAD: 'bad',
};

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbackOptions = { good, neutral, bad };

  const handleLeaveFeedback = feedbackOption => {
    switch (feedbackOption) {
      case FEEDBACK_TYPES.GOOD:
        setGood(prev => prev + 1);
        break;

      case FEEDBACK_TYPES.NEUTRAL:
        setNeutral(prev => prev + 1);
        break;

      case FEEDBACK_TYPES.BAD:
        setBad(prev => prev + 1);
        break;

      default:
        break;
    }

    toast('Thank you for your feedback!');
  };

  const countTotalFeedback = () => {
    return Object.values(feedbackOptions).reduce(
      (total, value) => total + value,
      0
    );
  };

  const countPositiveFeedbackPercentage = total => {
    return Math.round((good * 100) / total);
  };

  const totalFeedback = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage(totalFeedback);

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(feedbackOptions)}
          onLeaveFeedback={handleLeaveFeedback}
        />
      </Section>

      <Section title="Statistics">
        {totalFeedback ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Section>
    </>
  );
};