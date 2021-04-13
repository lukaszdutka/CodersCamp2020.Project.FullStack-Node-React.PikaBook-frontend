import { useHistory } from "react-router-dom";

const ConversationRecap = ({
  conversation: { interlocutors, messages },
  loggedUser,
}) => {
  const history = useHistory();
  const interlocutor = interlocutors.find(
    (interlocutor) => interlocutor._id !== loggedUser._id
  );
  const lastMessage = messages[0];
  const date = new Date(lastMessage.date).toLocaleString();
  const sender =
    lastMessage.sender === interlocutor._id ? interlocutor.name : "You";
  const content = lastMessage.content.split(" ").slice(0, 5).join(" ");

  const openConversation = () => {
    history.push(`/me/conversations/conversation`, { interlocutor });
  };

  const isRead = !lastMessage.read && lastMessage.recipient === loggedUser._id;

  return (
    <div className={isRead ? "conversationContainer newMessage" : "conversationContainer"}>
      <div>
        <b>{interlocutor.name}</b>
      </div>
      <div>{date}</div>
      <div>
        <b>{sender}</b> wrote:{" "}
        {content === lastMessage.content ? content : `${content}...`}
      </div>
      <button className="buttonDark" onClick={openConversation}>Go to conversation</button>
    </div>
  );
};

export default ConversationRecap;
