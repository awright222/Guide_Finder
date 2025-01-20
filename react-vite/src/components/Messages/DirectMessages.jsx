import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversations, sendMessage, fetchMessages } from '../../redux/messages'; 
import styles from './DirectMessages.module.css'; 
import { useLocation } from 'react-router-dom';

const DirectMessages = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedConversation, setSelectedConversation] = useState(location.state || null);
  const [message, setMessage] = useState('');
  
  const conversations = useSelector((state) => state.messages?.conversations || []); 
  const messages = useSelector((state) => state.messages?.messages || []);
  const currentUser = useSelector((state) => state.session?.user); 
  
  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    if (selectedConversation) {
      dispatch(fetchMessages(selectedConversation));
    }
  }, [dispatch, selectedConversation]);

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const messageData = {
        message,
        userId: currentUser.is_guide ? selectedConversation.userId : null,
        guideId: currentUser.is_guide ? null : selectedConversation.guideId,
      };
      dispatch(sendMessage(messageData));
      setMessage('');
    }
  };

  return (
    <div className={styles.directMessages}>
      <div className={styles.conversations}>
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={styles.conversation}
            onClick={() => handleConversationClick(conversation)}
          >
            <p>{conversation.username}</p>
          </div>
        ))}
      </div>
      <div className={styles.messagesContainer}>
        {messages.map((msg) => (
          <div key={msg.id} className={styles.message}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className={styles.messageInputContainer}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Type your message..."
            required
          />
          <button type="submit" disabled={!message.trim()}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default DirectMessages;