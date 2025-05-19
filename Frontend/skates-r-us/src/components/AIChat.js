import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AIChat = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [products, setProducts] = useState([]);

  const handleAsk = async () => {
    try {
      const res = await axios.post("http://localhost:9000/api/ask-ai", {
        question,
      });
      setResponse(res.data.answer); // 🧠 ChatGPT's natural language reply
      setProducts(res.data.products); // 🛍️ Actual product cards
    } catch (error) {
      console.error("Error querying AI:", error);
    }
  };

  return (
    <>
      {response && (
        <div className="alert alert-info mt-4" role="alert">
          <strong>AI Suggestion:</strong> {response}
        </div>
      )}
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
            {products.length > 0 && (
              <div className="row mt-4">
                {products.map((product, index) => (
                  <div className="col-md-6 mb-4" key={index}>
                    <div className="card h-100 shadow">
                      <img
                        src={product.picture}
                        className="card-img-top"
                        alt={product.title}
                        style={{
                          maxHeight: "300px",
                          width: "100%",
                          objectFit: "contain",
                          padding: "10px",
                          backgroundColor: "#fff",
                          borderRadius: "8px",
                        }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">
                          <strong>Price:</strong> ${product.price}
                          <br />
                          <strong>Color:</strong> {product.color}
                          <br />
                          <strong>Rating:</strong> {product.rating} ⭐<br />
                          {product.skillLevel?.[0] && (
                            <>
                              <strong>Skill Level:</strong>{" "}
                              {product.skillLevel[0].charAt(0).toUpperCase() +
                                product.skillLevel[0].slice(1)}
                              <br />
                            </>
                          )}
                          {product.wheelType?.[0] && (
                            <>
                              <strong>Wheel Type:</strong>{" "}
                              {product.wheelType[0].charAt(0).toUpperCase() +
                                product.wheelType[0].slice(1)}
                              <br />
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChat;
