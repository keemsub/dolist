const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let messages = [
  { sender: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' }
];

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.post('/messages', (req, res) => {
  const message = req.body;
  messages.push(message);

  // 간단한 봇 응답 생성
  if (message.text.toLowerCase().includes('hello')) {
    messages.push({ sender: 'bot', text: 'Hello! How can I assist you today?' });
  } else {
    messages.push({ sender: 'bot', text: 'I am here to assist you with anything you need!' });
  }

  res.json(messages);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
