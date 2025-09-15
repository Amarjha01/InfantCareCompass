import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API Key from .env
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const InfantCareChatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👶 Hello! I’m your Infant Care Assistant. Ask me anything about infant care.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Create model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Convert messages to prompt
      const history = newMessages
        .map(
          (msg) =>
            `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`
        )
        .join("\n");

      const prompt = `
You are an Infant Care Assistant. Always give safe, supportive, and responsible answers about infant health, feeding, sleep, and parenting.
Conversation so far:
${history}
Assistant:
      `;

      // Call Gemini
      const result = await model.generateContent(prompt);
      const botReply = result.response.text();

      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: "⚠️ Sorry, I couldn’t process that. Try again!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-pink-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-4 flex flex-col">
        <h2 className="text-xl font-bold text-center text-pink-600 mb-2">
          Infant Care Chatbot 🤱
        </h2>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 border rounded-lg bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-pink-200 text-gray-800 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <p className="text-sm text-gray-500">🤖 Typing...</p>}
        </div>

        {/* Input */}
        <div className="mt-3 flex">
          <input
            type="text"
            className="flex-1 border rounded-l-lg px-3 py-2 outline-none"
            placeholder="Ask me about infant care..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfantCareChatbot;
