const express = require("express");
const axios = require("axios");
const Item = require("../models/item"); // Import your Mongoose Item model
const router = express.Router();

// API endpoint for querying Ollama
router.post("/api/ask-ollama", async (req, res) => {
  const { question } = req.body;

  try {
    // Fetch all items from the MongoDB database
    const items = await Item.find(); // Retrieves all items in the collection

    // Create a custom prompt using your MongoDB data
    const customPrompt = `
      Here is the inventory of our skate shop:
      ${items
        .map(
          (item) =>
            `- ${item.title}: ${item.typeOfItem} in ${item.color} (${item.brand}) at $${item.price}. Features a rating of ${item.rating}/5.`
        )
        .join("\n")}
      
      Question: ${question}
    `;

    // Send the custom prompt to the Ollama server
    const response = await axios.post("http://127.0.0.1:11434/api/generate", {
      model: "phi3.5", // The AI model to use
      prompt: customPrompt, // Custom prompt with MongoDB data
    });

    // Return the AI's response
    res.json({ answer: response.data.response });
  } catch (error) {
    console.error("Error querying Ollama:", error.message);
    res.status(500).send("Error querying AI model");
  }
});

module.exports = router;
