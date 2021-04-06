import ConversationItem from "./ConversationItem";

const Conversations = ({
  accessToken,
  loggedUser,
  loggedUsersConversations,
}) => {
  const conversationsList = loggedUsersConversations.map((conversation) => {
    return <ConversationItem
      key={conversation._id}
      conversation={conversation}
      loggedUser={loggedUser}
    />;
  });

  return (
    <div>
      <h1>My conversations</h1>
      <div>{conversationsList}</div>
    </div>
  );
};

export default Conversations;
