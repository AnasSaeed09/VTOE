// routes/aiRoutes.js
import express from "express";
import { GoogleGenAI } from "@google/genai";
import productModel from "../models/productModel.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const tools = []; // You can add tools like googleSearch if needed
    const config = {
      tools,
      responseMimeType: "text/plain",
    };

    const model = "gemini-1.5-flash"; // Use the correct model
    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let finalResponse = "";

    for await (const chunk of response) {
      if (chunk.text) {
        finalResponse += chunk.text;
      }
    }

    res.status(200).json({
      success: true,
      response: finalResponse,
    });
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

// router.post("/recommend", async (req, res) => {
//   const { message } = req.body;

//   if (!message || message.trim() === "") {
//     return res.status(400).json({ error: "Message is required" });
//   }

//   try {
//     // Get best-selling products
//     const bestProducts = await productModel
//       .find({ bestseller: true })
//       .limit(10);

//     if (!bestProducts.length) {
//       return res.status(404).json({ error: "No best-selling products found" });
//     }

//     const productList = bestProducts
//       .map((p) => `${p.name} - ${p.description} (Rs. ${p.price})`)
//       .join("\n");

//     const prompt = `
// You are a helpful product recommendation assistant.
// Below is a list of our best-selling products:\n\n${productList}\n\n
// Now based on the user's question or interest, suggest a product from this list only.
// User asked: "${message}"
//     `;

//     const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     res.status(200).json({ success: true, recommendation: text });
//   } catch (error) {
//     console.error("Recommendation API Error:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.post("/recommend", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("message", message);
    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    const bestProducts = await productModel
      .find({ bestseller: true })
      .limit(50);

    const productList = bestProducts
      .map(
        (p) =>
          `ID: ${p._id}, Name: ${p.name}, Price: ${p.price}, Category: ${p.category}`
      )
      .join("\n");

    const prompt = `
You are a helpful shopping assistant.

Here is the product catalog:

${productList}

From this list, based on the following user request:
"${message}"

Select and return only the matching product IDs as a JSON array like this: ["ID1", "ID2", "ID3"]
Return ONLY the JSON array, no markdown formatting, no explanations.
`;

    const tools = [];
    const config = {
      tools,
      responseMimeType: "text/plain",
    };

    const model = "gemini-1.5-flash";
    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let finalResponse = "";

    for await (const chunk of response) {
      if (chunk.text) {
        finalResponse += chunk.text;
      }
    }

    let cleanedResponse = finalResponse.trim();

    if (cleanedResponse.startsWith("```json")) {
      cleanedResponse = cleanedResponse
        .replace(/^```json\s*/, "")
        .replace(/\s*```$/, "");
    } else if (cleanedResponse.startsWith("```")) {
      cleanedResponse = cleanedResponse
        .replace(/^```\s*/, "")
        .replace(/\s*```$/, "");
    }

    cleanedResponse = cleanedResponse.trim();

    let ids = [];
    try {
      ids = JSON.parse(cleanedResponse);

      if (!Array.isArray(ids)) {
        ids = [];
      }
    } catch (err) {
      console.log("Failed to parse AI response:", cleanedResponse);

      ids = [];
    }
    res.status(200).json({
      success: true,
      ids,
      message: ids.length > 0 ? "Products found" : "No matching products found",
    });
  } catch (error) {
    console.error("Recommend API error:", error.message);
    res.status(500).json({ error: "Failed to get product recommendations" });
  }
});

router.post("/by-ids", async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: "IDs should be an array" });
  }

  try {
    const products = await productModel.find({ _id: { $in: ids } });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
