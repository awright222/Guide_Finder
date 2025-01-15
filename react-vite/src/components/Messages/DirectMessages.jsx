import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversations, sendMessage, fetchMessages } from '../../redux/messages'; 
import styles from './DirectMessages.module.css'; 

const DirectMessages = () => {
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [message, setMessage] = useState('');
  
  // Fetch the list of conversations for the current user
  const conversations = useSelector((state) => state.messages?.conversations || []); 
  const messages = useSelector((state) => state.messages?.messages || []);
  const currentUser = useSelector((state) => state.session?.user); 
  
  // Fetch conversations when the component mounts
  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchMessages(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  const handleConversationClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      dispatch(sendMessage({ userId: selectedUserId, message }));
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
            onClick={() => handleConversationClick(conversation.userId)}
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