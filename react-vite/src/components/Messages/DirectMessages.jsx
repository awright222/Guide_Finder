import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchConversations,
  sendMessage,
  fetchMessages,
  deleteConversation,
} from '../../redux/messages';
import { fetchServices } from '../../redux/services';
import { restoreUser, fetchCsrfToken } from '../../redux/session';
import styles from './DirectMessages.module.css';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DirectMessages = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useSelector((state) => state.session.user);
  const csrfToken = useSelector((state) => state.session.csrfToken);
  const [selectedConversation, setSelectedConversation] = useState(location.state || null);
  const [message, setMessage] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(location.state?.serviceId || '');
  const [selectedServiceName, setSelectedServiceName] = useState('');
  const conversations = useSelector((state) => state.messages?.conversations || []);
  const messages = useSelector((state) => state.messages?.messages || []);
  const services = useSelector((state) => state.services?.items || []);
  const loading = useSelector((state) => state.session.loading);

  useEffect(() => {
    dispatch(restoreUser());
    dispatch(fetchCsrfToken());
    dispatch(fetchConversations());
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (selectedConversation) {
      const { user_id, guide_id } = selectedConversation;
      dispatch(fetchMessages({ userId: user_id, guideId: guide_id }));
    }
  }, [dispatch, selectedConversation]);

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    setSelectedServiceId(conversation.serviceId || '');
    dispatch(fetchMessages({ userId: conversation.user_id, guideId: conversation.guide_id }));
  };

  const handleDropdownChange = (e) => {
    const serviceId = e.target.value;
    setSelectedServiceId(serviceId);
    const selectedService = services.find((service) => service.id === parseInt(serviceId, 10));
    setSelectedServiceName(selectedService ? selectedService.title : '');
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      console.error('User is not authenticated');
      return;
    }
    if (message.trim() && selectedServiceId) {
      const selectedService = services.find((service) => service.id === parseInt(selectedServiceId, 10));
      const messageData = {
        message,
        userId: currentUser.is_guide ? selectedConversation.user_id : currentUser.id,
        guideId: currentUser.is_guide ? currentUser.id : selectedService.guide_id,
        serviceId: selectedService.id,
      };
      try {
        await dispatch(sendMessage({ ...messageData, csrfToken })).unwrap();
      } catch (error) {
        console.error('Failed to send message:', error);
      }
      setMessage('');
    }
  };

  const handleDeleteConversation = (conversationId) => {
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      dispatch(deleteConversation(conversationId));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>User is not authenticated</div>;
  }

  return (
    <div className={styles.messagesPage}>
      <div className={styles.boxContainer}>
        <div className={styles.conversationsBox}>
          <h2>Conversations</h2>
          <div className={styles.conversationsInnerBox}>
            <ul className={styles.conversationsList}>
              {conversations.map((conversation) => (
                <li
                  key={conversation.id}
                  className={
                    selectedConversation?.id === conversation.id
                      ? styles.selected
                      : ''
                  }
                  onClick={() => handleConversationClick(conversation)}
                >
                  <div className={styles.conversationDetails}>
                    <div className={styles.thumbnailBox}>
                      <img
                        src={conversation.serviceImage}
                        alt={conversation.serviceName}
                        className={styles.thumbnail}
                      />
                    </div>
                    <div className={styles.detailsBox}>
                      <span>{conversation.serviceName}</span>
                      <span className={styles.guideName}>{conversation.guideName}</span>
                    </div>
                    <div className={styles.trashBox}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className={styles.trashIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteConversation(conversation.id);
                        }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.messageThreadBox}>
          <h2>Message Thread</h2>
          <div className={styles.conversationsInnerBox}>
            {selectedConversation && (
              <div className={styles.scrollableBox}>
                {messages.length === 0 ? (
                  <p>No messages to display</p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={
                        msg.user_id === currentUser.id
                          ? styles.sentMessage
                          : styles.receivedMessage
                      }
                    >
                      <p>{msg.message}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.chatArea}>
        <h2>Messages</h2>

        <select
          value={selectedServiceId}
          onChange={handleDropdownChange}
          className={styles.serviceDropdown}
        >
          <option value="" disabled>
            Select a service...
          </option>
          {services.length > 0 ? (
            services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No services available
            </option>
          )}
        </select>

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
          <button type="submit" disabled={!message.trim() || !selectedServiceId}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default DirectMessages;