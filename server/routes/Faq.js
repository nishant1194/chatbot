import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { pipeline } from "@xenova/transformers";
import FAQ from "../model/Faq.js";

const router = express.Router();
// Load NLP Model
let model;
async function loadModel() {
  model = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
}
loadModel();

const genAI = new GoogleGenerativeAI("AIzaSyDeGzP4YMJ-NjTcoxglTx4Ynv7Y5M_808E");
const genmodel = genAI.getGenerativeModel({ model: "gemini-pro" });

const getNeutralResponseFromAi = async (answer) => {
  try {
    const result = await genmodel.generateContent(
      "Analyze the following text and check if it contains overly positive or biased marketing phrases (e.g., 'Our product is the best'). If the text is already neutral, return it as it is. Otherwise, rephrase it into a fact-based statement while keeping the length almost the same. Ensure the output is plain text without any formatting. The text is :: " +
        answer
    );
    const text =  result.response.text();
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
  }
};
// Helper function to calculate cosine similarity
function cosineSimilarity(vec1, vec2) {
  const dotProduct = vec1.reduce((sum, v, i) => sum + v * vec2[i], 0);
  const norm1 = Math.sqrt(vec1.reduce((sum, v) => sum + v * v, 0));
  const norm2 = Math.sqrt(vec2.reduce((sum, v) => sum + v * v, 0));
  return dotProduct / (norm1 * norm2);
}

// API to Add FAQ
router.post("/faq", async (req, res) => {
  try {
    const { question, answer, id } = req.body;
    const embedding = await model(question, {
      pooling: "mean",
      normalize: true,
    });
    const newFAQ = new FAQ({
      id,
      question,
      answer,
      embedding: embedding.tolist()[0],
    });
    await newFAQ.save();
    console.log(newFAQ);
    res.json({ message: "FAQ added successfully!" });
  } catch (error) {
    console.log(error);
  }
});

// API to Update FAQ
router.put("/faq/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    // Generate embedding for the new question
    const embedding = await model(question, {
      pooling: "mean",
      normalize: true,
    });

    // Update the FAQ in the database
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      id,
      {
        question,
        answer,
        embedding: embedding.tolist()[0], // Ensure this is correctly converted
      },
      { new: true } // Return the updated document
    );

    if (!updatedFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.json({ message: "FAQ updated successfully!", updatedFAQ });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// API to Delete FAQ
router.delete("/faq/:id", async (req, res) => {
  try {
    const { id } = req.params;
     // delete the FAQ in the database
    const deleteFAQ = await FAQ.findByIdAndDelete(id);

    if (!deleteFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.json({ message: "FAQ deleteFAQ successfully!", deleteFAQ });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// API to Add FAQ in bulk array
router.post("/faq-more", async (req, res) => {
  try {
    const { faqs } = req.body;

    if (!faqs || !Array.isArray(faqs)) {
      return res
        .status(400)
        .json({ error: "Invalid input data. Expected an array of FAQs." });
    }

    for (let faq of faqs) {
      // ✅ Corrected loop
      if (!faq.question || !faq.answer) {
        console.warn("Skipping invalid FAQ:", faq);
        continue; // Skip invalid data
      }

      const embedding = await model(faq.question, {
        pooling: "mean",
        normalize: true,
      });

      const newFAQ = new FAQ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        embedding: embedding.tolist()[0],
      });

      await newFAQ.save();
      console.log("Saved FAQ:", newFAQ);
    }

    res.json({ message: "FAQs added successfully!" });
  } catch (error) {
    console.error("Error adding FAQs:", error);
    res.status(500).json({ error: "Failed to add FAQs." });
  }
});

// API to Get All FAQs
router.get("/faq", async (req, res) => {
  const faqs = await FAQ.find({});
  res.json(faqs);
});





// API for Chatbot
router.post("/chat", async (req, res) => {
  const { query } = req.body;
  const userEmbedding = await model(query, {
    pooling: "mean",
    normalize: true,
  });

  const faqs = await FAQ.find({});
  let bestMatch = null;
  let bestScore = -1;

  faqs.forEach((faq) => {
    const score = cosineSimilarity(userEmbedding.tolist()[0], faq.embedding);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  });

  if (bestMatch && bestScore > 0.5) {
    const neutralAnswer = await getNeutralResponseFromAi(bestMatch.answer);
    console.log(neutralAnswer)
    res.json({ answer: neutralAnswer, confidence: bestScore.toFixed(2) });
  } else {
    res.json({
      answer: "I'm not sure about this. Can you provide more details?",
      confidence: bestScore.toFixed(2)
    });
  }
});

export default router;
