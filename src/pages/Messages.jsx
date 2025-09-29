import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { formatDistanceToNow } from 'date-fns';
import { Search, Send, MoreHorizontal } from 'lucide-react';

export default function Messages() {
  const { user } = useAuth();
  const { users } = useData();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    // Load conversations from localStorage
    const savedConversations = JSON.parse(localStorage.getItem('twitter_conversations') || '[]');
    const userConversations = savedConversations.filter(conv =>
      conv.participants.includes(user?.id)
    );
    setConversations(userConversations);

    // Calculate unread counts
    const savedMessages = JSON.parse(localStorage.getItem('twitter_messages') || '[]');
    const counts = {};
    userConversations.forEach(conv => {
      const convMessages = savedMessages.filter(msg =>
        msg.conversationId === conv.id &&
        !msg.read &&
        msg.senderId !== user?.id
      );
      counts[conv.id] = convMessages.length;
    });
    setUnreadCounts(counts);
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      // Load messages for selected conversation
      const savedMessages = JSON.parse(localStorage.getItem('twitter_messages') || '[]');
      const conversationMessages = savedMessages.filter(msg =>
        msg.conversationId === selectedConversation.id
      );
      setMessages(conversationMessages);

      // Mark messages as read
      const updatedMessages = savedMessages.map(msg =>
        msg.conversationId === selectedConversation.id && msg.senderId !== user?.id
          ? { ...msg, read: true }
          : msg
      );
      localStorage.setItem('twitter_messages', JSON.stringify(updatedMessages));

      // Update unread counts
      setUnreadCounts(prev => ({
        ...prev,
        [selectedConversation.id]: 0
      }));
    }
  }, [selectedConversation, user]);

  const startNewConversation = (targetUser) => {
    const existingConv = conversations.find(conv =>
      conv.participants.includes(targetUser.id) && conv.participants.includes(user.id)
    );

    if (existingConv) {
      setSelectedConversation(existingConv);
    } else {
      const newConversation = {
        id: Date.now().toString(),
        participants: [user.id, targetUser.id],
        createdAt: new Date().toISOString(),
        lastMessage: null,
      };

      const updatedConversations = [newConversation, ...conversations];
      setConversations(updatedConversations);

      // Update localStorage
      const allConversations = JSON.parse(localStorage.getItem('twitter_conversations') || '[]');
      allConversations.push(newConversation);
      localStorage.setItem('twitter_conversations', JSON.stringify(allConversations));

      setSelectedConversation(newConversation);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: Date.now().toString(),
      conversationId: selectedConversation.id,
      senderId: user.id,
      content: newMessage.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);

    // Update localStorage
    const allMessages = JSON.parse(localStorage.getItem('twitter_messages') || '[]');
    allMessages.push(message);
    localStorage.setItem('twitter_messages', JSON.stringify(allMessages));

    // Update conversation's last message
    const updatedConversations = conversations.map(conv =>
      conv.id === selectedConversation.id
        ? { ...conv, lastMessage: message }
        : conv
    );
    setConversations(updatedConversations);

    // Update localStorage conversations
    const allConversations = JSON.parse(localStorage.getItem('twitter_conversations') || '[]');
    const convIndex = allConversations.findIndex(c => c.id === selectedConversation.id);
    if (convIndex !== -1) {
      allConversations[convIndex].lastMessage = message;
      localStorage.setItem('twitter_conversations', JSON.stringify(allConversations));
    }

    setNewMessage('');
  };

  const getOtherUser = (conversation) => {
    const otherUserId = conversation.participants.find(id => id !== user.id);
    return users.find(u => u.id === otherUserId);
  };

  const filteredUsers = users.filter(u =>
    u.id !== user.id &&
    (u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
     u.displayName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="messages">
      <div className="messages-layout">
        <div className="conversations-sidebar">
          <div className="messages-header">
            <h1>Messages</h1>
            <button className="new-message-btn">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="search-users">
            <div className="search-input-wrapper">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search people"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {searchQuery && (
            <div className="user-search-results">
              {filteredUsers.map(targetUser => (
                <div
                  key={targetUser.id}
                  className="user-search-item"
                  onClick={() => {
                    startNewConversation(targetUser);
                    setSearchQuery('');
                  }}
                >
                  <img src={targetUser.avatar} alt={targetUser.displayName} />
                  <div>
                    <p className="user-name">{targetUser.displayName}</p>
                    <p className="username">@{targetUser.username}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="conversations-list">
            {conversations.length === 0 ? (
              <div className="no-conversations">
                <p>No conversations yet</p>
                <p>Search for someone to start chatting</p>
              </div>
            ) : (
              conversations.map(conversation => {
                const otherUser = getOtherUser(conversation);
                if (!otherUser) return null;

                return (
                  <div
                    key={conversation.id}
                    className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <img src={otherUser.avatar} alt={otherUser.displayName} />
                    <div className="conversation-info">
                      <div className="conversation-header">
                        <span className="user-name">{otherUser.displayName}</span>
                        <span className="username">@{otherUser.username}</span>
                        {conversation.lastMessage && (
                          <span className="message-time">
                            {formatDistanceToNow(new Date(conversation.lastMessage.createdAt))}
                          </span>
                        )}
                      </div>
                      {conversation.lastMessage && (
                        <p className="last-message">
                          {conversation.lastMessage.senderId === user.id ? 'You: ' : ''}
                          {conversation.lastMessage.content}
                        </p>
                      )}
                    </div>
                    {unreadCounts[conversation.id] > 0 && (
                      <div className="unread-indicator">
                        <span className="unread-count">{unreadCounts[conversation.id]}</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="chat-area">
          {selectedConversation ? (
            <>
              <div className="chat-header">
                {(() => {
                  const otherUser = getOtherUser(selectedConversation);
                  return otherUser ? (
                    <div className="chat-user-info">
                      <img src={otherUser.avatar} alt={otherUser.displayName} />
                      <div>
                        <h3>{otherUser.displayName}</h3>
                        <p>@{otherUser.username}</p>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>

              <div className="messages-container">
                {messages.length === 0 ? (
                  <div className="no-messages">
                    <p>Start the conversation!</p>
                  </div>
                ) : (
                  messages.map(message => (
                    <div
                      key={message.id}
                      className={`message ${message.senderId === user.id ? 'sent' : 'received'}`}
                    >
                      <div className="message-content">
                        <p>{message.content}</p>
                        <span className="message-time">
                          {formatDistanceToNow(new Date(message.createdAt))} ago
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={sendMessage} className="message-input-form">
                <div className="message-input-wrapper">
                  <input
                    type="text"
                    placeholder="Start a new message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button type="submit" disabled={!newMessage.trim()}>
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="no-conversation-selected">
              <h2>Select a message</h2>
              <p>Choose from your existing conversations, or start a new one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}