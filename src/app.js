import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/messages')
      .then(response => {
        setMessages(response.data);
      });
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = { sender: 'user', text: input };
    axios.post('http://localhost:3001/messages', newMessage)
      .then(response => {
        setMessages(response.data);
        setInput('');
      });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chatbot</h2>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
