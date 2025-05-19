const express = require("express");
const router = express.Router();
const axios = require("axios");
const Product = require("../models/item.js"); // Your MongoDB schema
require("dotenv").config();

// 🔍 Helper to match skates and wheels
function getMatchingProducts(products, question) {
  const q = question.toLowerCase();

  const scored = products
    .filter((p) => p.quantity > 0) // ✅ Skip out-of-stock
    .map((p) => {
      const matchSkill = (p.skillLevel || []).some((s) =>
        q.includes(s.toLowerCase())
      );
      const matchWheel = (p.wheelType || []).some((w) =>
        q.includes(w.toLowerCase())
      );
      const matchGender = (p.gender || []).some((g) =>
        q.includes(g.toLowerCase())
      );
      const matchColor = p.color && q.includes(p.color.toLowerCase());

      const score =
        (matchSkill ? 1 : 0) +
        (matchWheel ? 1 : 0) +
        (matchGender ? 1 : 0) +
        (matchColor ? 1 : 0);

      return { product: p, score };
    });

  // 🧠 If no in-stock products matched at all, return any 1 fallback product
  const nonZeroMatches = scored.filter((entry) => entry.score > 0);
  const sorted = nonZeroMatches.length
    ? nonZeroMatches.sort((a, b) => b.score - a.score)
    : scored.sort((a, b) => b.product.rating - a.product.rating); // fallback: highest rating

  return sorted.slice(0, 2).map((entry) => entry.product);
}

/*function getMatchingProducts(products, question) {
  const q = question.toLowerCase();

  return products
    .filter((p) => {
      const matchSkill = (p.skillLevel || []).some((s) =>
        q.includes(s.toLowerCase())
      );
      const matchWheel = (p.wheelType || []).some((w) =>
        q.includes(w.toLowerCase())
      );
      const matchGender = (p.gender || []).some((g) =>
        q.includes(g.toLowerCase())
      );

      return matchSkill || matchWheel || matchGender;
    })
    .slice(0, 2); // Limit to 2 matches
} */

router.post("/ask-ai", async (req, res) => {
  const { question } = req.body;

  try {
    // 🔄 Get all products from MongoDB
    const allItems = await Product.find();

    // 🧠 Filter relevant items
    const matched = getMatchingProducts(allItems, question);

    // 3. Build product descriptions for ChatGPT
    const productText = matched
      .map(
        (p) =>
          `${p.title} - $${p.price}, Color: ${p.color}, Rating: ${p.rating}, ` +
          `Skill Level: ${(p.skillLevel || []).join(", ")}, ` +
          `Stock: ${p.quantity > 0 ? "In stock" : "Out of stock"}`
      )
      .join("\n");

    // 4. Send to ChatGPT
    const messages = [
      {
        role: "system",
        content: `You are a skate store assistant helping customers choose the right skates. Use the list of products to make a recommendation.`,
      },
      {
        role: "user",
        content: `Customer asked: "${question}"\n\nHere are the matching products:\n${productText}`,
      },
    ];

    // 🤖 Send to OpenAI
    const aiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const answer = aiResponse.data.choices[0].message.content;
    res.json({ answer, products: matched });
  } catch (error) {
    console.error("OpenAI error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
});

module.exports = router;
