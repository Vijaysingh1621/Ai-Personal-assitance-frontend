"use client"
import { useState } from "react";
import axios from "axios";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages([...messages, { user: input, bot: "Thinking..." }]);

    try {
      const res = await axios.post("https://personal-ai-assistant-u5zh.onrender.com/chat/", {
        user_input: input,
        user_id: "vijay123", // Replace with dynamic user ID
      });

      // Update chat with AI response
      setMessages([...messages, { user: input, bot: res.data.response }]);
    } catch (error) {
      setMessages([...messages, { user: input, bot: "Error: Unable to fetch response" }]);
    }

    setInput("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="h-96 overflow-y-auto bg-white p-4 rounded">
        {messages.map((msg, index) => (
          <div key={index} className="mb-3">
            <p className="font-bold text-black">User: {msg.user}</p>
            <p className="text-gray-700">AI: {msg.bot}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          className="flex-grow border text-black p-2 rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
