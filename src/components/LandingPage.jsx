import React from 'react';
import { weddingConfig } from '../config/weddingConfig';

export function LandingPage({ onStart }) {
  return (
    <section className="card landing-card fade-in" aria-labelledby="landing-title">
      <p className="eyebrow">{weddingConfig.eyebrow}</p>
      <h1 id="landing-title" className="couple-names">
        {weddingConfig.coupleNames}
      </h1>

      <div className="photo-frame">
        <div className="photo-viewport">
          <img
            src={weddingConfig.couplePhotoUrl}
            alt={weddingConfig.couplePhotoAlt}
            className="couple-photo"
          />
        </div>
      </div>

      <h2 className="landing-headline">{weddingConfig.landingHeadline}</h2>
      <p className="lead-copy">{weddingConfig.landingMessage}</p>

      <div className="actions-center">
        <button type="button" className="btn btn-primary" onClick={onStart}>
          {weddingConfig.startButtonText}
        </button>
      </div>
    </section>
  );
}
