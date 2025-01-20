import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversations, sendMessage, fetchMessages, deleteConversation } from '../../redux/messages';
import { fetchServices } from '../../redux/services'; // Import fetchServices action
import styles from './DirectMessages.module.css';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DirectMessages = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useSelector((state) => state.session.user); // Get currentUser from Redux store
  const [selectedConversation, setSelectedConversation] = useState(location.state || null);
  const [message, setMessage] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(location.state?.serviceId || ''); 
  const [selectedServiceName, setSelectedServiceName] = useState(''); // New state for selected service name
  const conversations = useSelector((state) => state.messages?.conversations || []);
  const messages = useSelector((state) => state.messages?.messages || []);
  const services = useSelector((state) => state.services?.items || []);

  useEffect(() => {
    dispatch(fetchConversations());
    dispatch(fetchServices()); // Dispatch fetchServices action
  }, [dispatch]);

  useEffect(() => {
    if (selectedConversation) {
      const { user_id, guide_id } = selectedConversation;
      console.log('Fetching messages for conversation:', selectedConversation); // Log selected conversation
      dispatch(fetchMessages({ userId: user_id, guideId: guide_id }));
    }
  }, [dispatch, selectedConversation]);

  useEffect(() => {
    console.log('Services in component:', services); // Log services in the component
    services.forEach(service => {
      console.log('Service:', service); // Log each service object
    });
  }, [services]);

  useEffect(() => {
    console.log('Initial selectedServiceId:', selectedServiceId); // Log initial selectedServiceId
  }, [selectedServiceId]);

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    setSelectedServiceId(conversation.serviceId || '');
    console.log('Selected conversation:', conversation); // Log selected conversation
  };

  const handleDropdownChange = (e) => {
    const serviceId = e.target.value;
    setSelectedServiceId(serviceId);
    const selectedService = services.find((service) => service.id === parseInt(serviceId, 10));
    setSelectedServiceName(selectedService ? selectedService.name : ''); // Set the selected service name
    console.log('Selected service ID:', serviceId); // Log selected service ID
    console.log('Selected service:', selectedService); // Log selected service
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && selectedConversation) {
      const messageData = {
        message,
        userId: currentUser.is_guide ? selectedConversation.user_id : null,
        guideId: currentUser.is_guide ? null : selectedConversation.guide_id,
      };
      dispatch(sendMessage(messageData));
      setMessage('');
      console.log('Message sent:', messageData); // Log message data
    }
  };

  const handleDeleteConversation = (conversationId) => {
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      dispatch(deleteConversation(conversationId));
      console.log('Deleted conversation ID:', conversationId); // Log deleted conversation ID
    }
  };

  return (
    <div className={styles.messagesPage}>
      <div className={styles.conversationsList}>
        <h2>Conversations</h2>
        <div className={styles.conversationsInnerBox}>
          <ul>
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                className={selectedConversation?.id === conversation.id ? styles.selected : ''}
                onClick={() => handleConversationClick(conversation)}
              >
                <img src={conversation.serviceImage} alt={conversation.serviceName} className={styles.thumbnail} />
                <span>{conversation.serviceName}</span>
                <FontAwesomeIcon
                  icon={faTrash}
                  className={styles.trashIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteConversation(conversation.id);
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.chatArea}>
        <h2>Messages</h2>

        {/* Dropdown for selecting services */}
        <select
          value={selectedServiceId}
          onChange={handleDropdownChange}
          className={styles.serviceDropdown}
        >
          <option value="" disabled>Select a service...</option>
          {services.length > 0 ? (
            services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))
          ) : (
            <option value="" disabled>No services available</option>
          )}
        </select>

        {/* Scrollable Messages Box */}
        {selectedConversation && (
          <div className={styles.scrollableBox}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={msg.user_id === currentUser.id ? styles.sentMessage : styles.receivedMessage}
              >
                <p>{msg.message}</p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.messageForm}>
          <div className={styles.toField}>
            <label>To: </label>
            <span>{selectedServiceName}</span>
          </div>
          <textarea
            value={message}
            onChange={handleChange}
            placeholder="Type your message..."
            required
            className={styles.messageInput}
          />
          <button type="submit" disabled={!message.trim() || !selectedConversation}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default DirectMessages;