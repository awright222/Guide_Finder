import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversations, sendMessage, fetchMessages } from '../../redux/messages'; 
import styles from './DirectMessages.module.css'; 

const DirectMessages = () => {
  const dispatch = useDispatch();
  const [selectedGuideId, setSelectedGuideId] = useState(null);
  const [message, setMessage] = useState('');
  
  // Fetch the list of conversations for the current user
  const conversations = useSelector((state) => state.messages?.conversations || []); 
  const messages = useSelector((state) => state.messages?.messages || []);
  const currentUser = useSelector((state) => state.user?.currentUser); 
  
  // Fetch conversations when the component mounts
  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (selectedGuideId) {
      dispatch(fetchMessages(selectedGuideId));
    }
  }, [dispatch, selectedGuideId]);

  const handleConversationClick = (guideId) => {
    setSelectedGuideId(guideId);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      dispatch(sendMessage({ guide_id: selectedGuideId, message }));
      setMessage(''); 
    }
  };

  return (
    <div className={styles.messagesPage}>
      <h1 className={styles.title}>Messages</h1> {/* Centered title */}
      <div className={styles.messagesContainer}>
        <div className={styles.conversationsList}>
          <h2>Conversations</h2>
          <ul>
            {conversations.map((conversation) => (
              <li
                key={conversation.guide_id}
                onClick={() => handleConversationClick(conversation.guide_id)}
                className={selectedGuideId === conversation.guide_id ? styles.selected : ''}
              >
                {conversation.guide_name} {/* Adjust this to show the guide's name */}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.chatArea}>
          <h2>Chat with {selectedGuideId && conversations.find(conv => conv.guide_id === selectedGuideId)?.guide_name}</h2>
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div key={msg.id} className={msg.user_id === currentUser.id ? styles.sentMessage : styles.receivedMessage}>
                <p>{msg.message}</p>
                <span>{new Date(msg.timestamp).toLocaleString()}</span>
              </div>
            ))}
          </div>
          {selectedGuideId && (
            <form onSubmit={handleSendMessage}>
              <textarea
                value={message}
                onChange={handleMessageChange}
                placeholder="Type your message..."
                required
              />
              <button type="submit" disabled={!message.trim()}>Send</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectMessages;