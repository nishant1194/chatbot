
import React, { useState } from "react";
import axios from "axios";
import "./CreateFAQ.css"; // Import the CSS file

 
const CreateFAQ = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
     try {
      const response = await axios.post("http://localhost:6004/chat-bot/faq", { question, answer });
      setMessage("FAQ added successfully!");
      setQuestion("");
      setAnswer("");
    } catch (err) {
      setError("Failed to add FAQ. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="faq-container">
      <h2>Create New FAQ</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="faq-form">
        <div className="input-group">
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            placeholder="Enter question..."
          />
        </div>
        <div className="input-group">
          <label>Answer:</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            placeholder="Enter answer..."
          ></textarea>
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding..." : "Add FAQ"}
        </button>
      </form>
    </div>
  );
};

export default CreateFAQ;
