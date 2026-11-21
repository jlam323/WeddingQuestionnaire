import React from 'react';
import { QuestionOne } from './QuestionOne';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';

export function QuizFlow({ questions, currentIndex, answers, onSelectAnswer }) {
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const currentAnswer = answers[currentQuestion.id];
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <section className="card quiz-card fade-in" key={currentQuestion.id}>
      <div className="quiz-header">
        <span className="eyebrow">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <div className="progress-track" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {currentQuestion.type === 'unique' ? (
        <QuestionOne
          question={currentQuestion}
          selectedValue={currentAnswer}
          onSelect={(value) => onSelectAnswer(currentQuestion.id, value)}
        />
      ) : (
        <MultipleChoiceQuestion
          question={currentQuestion}
          selectedValue={currentAnswer}
          onSelect={(value) => onSelectAnswer(currentQuestion.id, value)}
        />
      )}
    </section>
  );
}
