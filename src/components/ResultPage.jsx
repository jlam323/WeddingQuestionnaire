import React from 'react';
import { weddingConfig } from '../config/weddingConfig';

function FeedbackCard({ item }) {
  return (
    <article
      className={`feedback-item ${item.failed ? 'feedback-item-fail' : 'feedback-item-note'}`}
    >
      <div className="feedback-meta">
        <span className="feedback-question-label">{item.questionLabel}</span>
        <span className="feedback-answer-pill">You chose: {item.selectedLabel}</span>
      </div>
      <p className="feedback-message">{item.feedback}</p>
    </article>
  );
}

export function ResultPage({ result, onRetry, onBackToLanding }) {
  const { passed, feedbackItems, noteItems } = result;

  if (passed) {
    return (
      <section className="card result-card result-approved fade-in" aria-live="polite">
        <div className="status-emblem status-approved" aria-hidden="true">
          ✦
        </div>
        <p className="eyebrow">{weddingConfig.approvedCopy.eyebrow}</p>
        <h2 className="result-headline">{weddingConfig.approvedCopy.headline}</h2>
        <p className="lead-copy">{weddingConfig.approvedCopy.message}</p>

        {noteItems.length > 0 && (
          <div className="feedback-list" aria-label="Notes on your responses">
            {noteItems.map((item) => (
              <FeedbackCard key={item.questionId} item={item} />
            ))}
          </div>
        )}

        <div className="reveal-box">
          <p className="reveal-couple">{weddingConfig.coupleNames}</p>
          <a
            href={weddingConfig.saveTheDateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-reveal"
          >
            {weddingConfig.saveTheDateLinkText}
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>

        <button type="button" className="btn-link" onClick={onBackToLanding}>
          Return to Cover
        </button>
      </section>
    );
  }

  return (
    <section className="card result-card result-denied fade-in" aria-live="polite">
      <div className="status-emblem status-denied" aria-hidden="true">
        ✕
      </div>
      <p className="eyebrow">{weddingConfig.deniedCopy.eyebrow}</p>
      <h2 className="result-headline">{weddingConfig.deniedCopy.headline}</h2>
      <p className="lead-copy">{weddingConfig.deniedCopy.message}</p>

      {feedbackItems.length > 0 && (
        <div className="feedback-list" aria-label="Feedback on your responses">
          {feedbackItems.map((item) => (
            <FeedbackCard key={item.questionId} item={item} />
          ))}
        </div>
      )}

      <div className="actions-center">
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          {weddingConfig.deniedCopy.retryButtonText}
        </button>
      </div>
    </section>
  );
}
