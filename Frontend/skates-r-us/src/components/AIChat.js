import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AIChat = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    try {
      const res = await axios.post("/api/ask-ai", { question });
      setResponse(res.data.answer);
    } catch (error) {
      console.error("Error querying AI:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="text-center">Ask About Our Skates!</h2>
        </div>
        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
          >
            <div className="mb-3">
              <label htmlFor="question" className="form-label">
                Your Question:
              </label>
              <input
                type="text"
                id="question"
                className="form-control"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What type of skates are good for beginners?"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Ask
              </button>
            </div>
          </form>
          {response && (
            <div className="alert alert-success mt-4" role="alert">
              <strong>AI Response:</strong> {response}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIChat;
