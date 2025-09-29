import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function Grok() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    {
      type: 'assistant',
      content: 'Hello! I\'m Grok, your AI assistant. How can I help you today?'
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { type: 'user', content: message };
    setConversation(prev => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'assistant',
        content: 'Thanks for your message! This is a demo response from Grok AI.'
      };
      setConversation(prev => [...prev, aiResponse]);
    }, 1000);

    setMessage('');
  };

  return (
    <div className="grok-page">
      <div className="grok-header">
        <div className="header-title">
          <MessageCircle size={24} />
          <h1>Grok</h1>
        </div>
        <p className="header-subtitle">Your AI assistant</p>
      </div>

      <div className="grok-conversation">
        {conversation.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <div className="message-content">
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="grok-input-form">
        <div className="grok-input-wrapper">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Grok anything..."
            className="grok-input"
          />
          <button type="submit" disabled={!message.trim()}>
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}