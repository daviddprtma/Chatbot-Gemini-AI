import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userMessage = req.body.message;

    try {
      const model = genAi.getGenerativeModel({ model: "gemini-1.0-pro" });
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const text = await response.text();

      res.status(200).json({ reply: text });
    } catch (error) {
      console.error("Error processing the AI Process: ", error);
      res
        .status(500)
        .json({
          error:
            "I'm sorry, I'm having trouble understanding you right now. Please try again later.",
        });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end({ error: `Method ${req.method} Not Allowed` });
  }
}
