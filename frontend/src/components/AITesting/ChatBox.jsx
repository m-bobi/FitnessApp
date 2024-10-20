import React, { useEffect, useRef } from 'react';

const ChatBox = () => {
  const messagesEndRef = useRef(null);

  const messages = [
    { type: 'user', text: "Hello! What can you tell me about Ascend?" },
    { type: 'bot', text: "Welcome to Ascend! We are dedicated to helping you achieve your fitness goals." },
    { type: 'user', text: "What classes do you offer?" },
    { type: 'bot', text: "We offer a variety of classes including Yoga, Pilates, and Strength Training." },
    { type: 'user', text: "What are your operating hours?" },
    { type: 'bot', text: "We are open from 6 AM to 10 PM every day." },
    { type: 'user', text: "Do you offer personal training?" },
    { type: 'bot', text: "Yes, we have certified personal trainers available for one-on-one sessions." },
    { type: 'user', text: "What is your membership fee?" },
    { type: 'bot', text: "Membership fees vary based on the plan you choose, starting at $29/month." },
    { type: 'user', text: "Thank you for the information!" },
    { type: 'bot', text: "You're welcome! Let us know if you have any more questions." },
  ];


  return (
    <div className="border rounded-lg p-4 shadow-md bg-gray-100 h-96 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto mb-4"> {/* Enable vertical scrolling */}
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-4 py-2 rounded-lg ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;

