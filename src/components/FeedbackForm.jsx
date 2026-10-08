import { useState } from "react";

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="fb-thanks">
        <div className="fb-thanks-ic">✓</div>
        <h3>Thank you!</h3>
        <p>Your feedback has been noted. We appreciate you helping make Kerala Utility Hub better.</p>
      </div>
    );
  }

  return (
    <form className="fb-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <div className="fb-row">
        <div className="fb-field">
          <label htmlFor="fb-name">Name *</label>
          <input id="fb-name" type="text" name="name" required placeholder="Your name" />
        </div>
        <div className="fb-field">
          <label htmlFor="fb-email">Email (optional)</label>
          <input id="fb-email" type="email" name="email" placeholder="you@example.com" />
        </div>
      </div>
      <div className="fb-row">
        <div className="fb-field">
          <label htmlFor="fb-category">Category</label>
          <select id="fb-category" name="category" defaultValue="suggestion">
            <option value="suggestion">Suggestion</option>
            <option value="issue">Report an issue</option>
            <option value="question">Question</option>
            <option value="praise">Appreciation</option>
          </select>
        </div>
        <div className="fb-field">
          <label>Rating</label>
          <div className="fb-stars">
            {[1, 2, 3, 4, 5].map((v) => (
              <button key={v} type="button" className={v <= rating ? "on" : ""}
                onClick={() => setRating(v)} aria-label={`${v} star${v > 1 ? "s" : ""}`}>
                ★
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="fb-field">
        <label htmlFor="fb-message">Message *</label>
        <textarea id="fb-message" name="message" rows="4" required placeholder="Tell us what you think…" />
      </div>
      <button type="submit" className="btn btn-primary">Send feedback</button>
    </form>
  );
}
