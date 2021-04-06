const ConversationItem = ({
  conversation: { interlocutors, messages },
  loggedUser,
}) => {
  const interlocutor = interlocutors.find(
    (interlocutor) => interlocutor._id !== loggedUser._id
  );
  const lastMessage = messages[0];
  const date = new Date(lastMessage.date).toLocaleString();
  const sender =
    lastMessage.sender === interlocutor._id ? interlocutor.name : "you";
  const content = lastMessage.content.split(" ").slice(0, 5).join(" ");

  return (
    <div>
      <div>
        <b>{interlocutor.name}</b>
      </div>
      <div>
        <p>
          On {date} <b>{sender}</b> wrote:{" "}
          {content === lastMessage.content ? content : `${content}...`}
        </p>
      </div>
      <button id={interlocutor._id}>Go to conversation</button>
    </div>
  );
};

export default ConversationItem;
