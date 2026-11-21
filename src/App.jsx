import React, { useEffect, useMemo, useRef, useState } from 'react';
import { questions } from './data/questions';
import { evaluateQuiz } from './utils/evaluateQuiz';
import { LandingPage } from './components/LandingPage';
import { QuizFlow } from './components/QuizFlow';
import { ResultPage } from './components/ResultPage';

const STAGES = {
  LANDING: 'landing',
  QUIZ: 'quiz',
  RESULT: 'result',
};

const AUTO_ADVANCE_DELAY_MS = 220;

export function App() {
  const [stage, setStage] = useState(STAGES.LANDING);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const advanceTimerRef = useRef(null);
  const isAdvancingRef = useRef(false);

  const clearPendingAdvance = () => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    isAdvancingRef.current = false;
  };

  useEffect(() => clearPendingAdvance, []);

  const result = useMemo(() => {
    if (stage !== STAGES.RESULT) return null;
    return evaluateQuiz(questions, answers);
  }, [stage, answers]);

  const handleStart = () => {
    clearPendingAdvance();
    setAnswers({});
    setCurrentIndex(0);
    setStage(STAGES.QUIZ);
  };

  const handleSelectAnswer = (questionId, value) => {
    if (isAdvancingRef.current) return;
    isAdvancingRef.current = true;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    const isLastQuestion = currentIndex >= questions.length - 1;
    advanceTimerRef.current = setTimeout(() => {
      advanceTimerRef.current = null;
      isAdvancingRef.current = false;
      if (isLastQuestion) {
        setStage(STAGES.RESULT);
      } else {
        setCurrentIndex((idx) => idx + 1);
      }
    }, AUTO_ADVANCE_DELAY_MS);
  };

  const handleRetry = () => {
    clearPendingAdvance();
    setAnswers({});
    setCurrentIndex(0);
    setStage(STAGES.QUIZ);
  };

  const handleBackToLanding = () => {
    clearPendingAdvance();
    setAnswers({});
    setCurrentIndex(0);
    setStage(STAGES.LANDING);
  };

  return (
    <main className="page-shell">
      <div className="page-container">
        {stage === STAGES.LANDING && <LandingPage onStart={handleStart} />}

        {stage === STAGES.QUIZ && (
          <QuizFlow
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            onSelectAnswer={handleSelectAnswer}
          />
        )}

        {stage === STAGES.RESULT && result && (
          <ResultPage
            result={result}
            onRetry={handleRetry}
            onBackToLanding={handleBackToLanding}
          />
        )}
      </div>
    </main>
  );
}

export default App;
