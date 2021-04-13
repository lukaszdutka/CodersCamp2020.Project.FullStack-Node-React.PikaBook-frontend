import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import _ from "lodash";

import { fetchConversationByInterlocutor } from "../../API/fetchConversations";
import { updateConversation } from "../../API/updateConversation";
import sendMessage from "../../API/sendMessage";

const Message = ({ message: { sender, content, date }, interlocutor }) => {
  const creationDate = new Date(date).toLocaleString();
  const name = interlocutor._id === sender ? `${interlocutor.name}:` : "You:";
  return (
    <div className={name === "You:" ? "yourMessage" : "interlocutorsMessage"}>
      <div className="date">{creationDate}</div>
      <div className="message">
        <div>{name}</div>
        <div>{content}</div>
      </div>
    </div>
  );
};

const SingleConversation = ({
  accessToken,
  getLoggedUsersConversations,
  conversationsInterval,
}) => {
  const location = useLocation();
  const history = useHistory();
  const interlocutor = location.state.interlocutor;
  const [messages, setMessages] = useState([]);
  const prevMessages = useRef();
  const [messageInput, setMessageInput] = useState("");
  const conversationInterval = useRef();
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("");
  const messagesDiv = useRef();

  useEffect(() => {
    const updateMessages = async (conversation) => {
      if (conversation.some((message) => !message.read))
        await updateConversation(accessToken, interlocutor._id);
      clearTimeout(conversationsInterval.current);
      getLoggedUsersConversations(accessToken);
    };
    const getMessages = async () => {
      setStatus("Loading...");
      prevMessages.current = messages;
      const res = await fetchConversationByInterlocutor(
        accessToken,
        interlocutor._id,
        { limit }
      );
      if (res.error) setStatus(res.error);
      const newMessages = res.conversation.messages.reverse();
      if (!_.isEqual(newMessages, prevMessages.current)) {
        setMessages(newMessages);
        updateMessages(newMessages);
      }
    };
    clearInterval(conversationInterval.current);
    getMessages();
    const interval = setInterval(async () => getMessages(), 1000);
    conversationInterval.current = interval;
    return () => clearInterval(conversationInterval.current);
  }, [
    accessToken,
    interlocutor._id,
    limit,
    messages,
    getLoggedUsersConversations,
    conversationsInterval,
  ]);

  useEffect(() => {
    const scrollTo = messagesDiv.current;
    const scrollToMyRef = () => {
      const scroll = scrollTo.scrollHeight - scrollTo.clientHeight;
      scrollTo.scrollTo(0, scroll);
    };
    scrollToMyRef();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await sendMessage(accessToken, interlocutor._id, messageInput);
    if (res.error) setStatus(res.error);
    setMessageInput("");
  };

  const handleChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleLoadMore = (e) => {
    setLimit(limit + 10);
  };

  const handleExit = () => {
    history.push("/me/conversations");
  };

  const messageList = messages.map((message) => (
    <Message key={message._id} message={message} interlocutor={interlocutor} />
  ));

  return (
    <div className="singleConversationContainer">
      <div className="exit" onClick={handleExit}>&#10006;</div>
      <button className="buttonDark loadMore" onClick={handleLoadMore}>&#x2191;</button>
      <div className="messagesList" ref={messagesDiv}>
        {messages.length === 0 ? ( <div className="status"> {status === "Loading..." ? ( <div className="loader"></div> ) : ( status )} </div> ) : messageList}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea onChange={handleChange} value={messageInput}></textarea>
        <input className="buttonDark" type="submit" value="Send"></input>
      </form>
    </div>
  );
};

export default SingleConversation;
