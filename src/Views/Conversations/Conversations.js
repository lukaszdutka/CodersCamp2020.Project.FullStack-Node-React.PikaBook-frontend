import { useState, useRef } from "react";

import ConversationRecap from "./ConversationRecap";
import getPagination from "../../SharedFunctions/getPagination";
import Pagination from "../../SharedComponents/Pagination";

const Conversations = ({
  loggedUser,
  loggedUsersConversations,
}) => {

  const [page, setPage] = useState(1);
  const onPageLimit = 10;
  const scrollTo = useRef();

  let conversationsList = loggedUsersConversations.sort((a,b) => {
    const dateA = new Date(a.messages[0].date);
    const dateB = new Date(b.messages[0].date);
    return dateB - dateA;
  });
  conversationsList = getPagination(page, onPageLimit, conversationsList);
  conversationsList = conversationsList.map((conversation) => {
    return (
      <ConversationRecap
        key={conversation._id}
        conversation={conversation}
        loggedUser={loggedUser}
      />
    );
  });

  return (
    <div>
      <h1>My conversations</h1>
      <div ref={scrollTo}>
        {loggedUsersConversations.length > onPageLimit && (
          <Pagination
            page={page}
            setPage={setPage}
            list={loggedUsersConversations}
            limit={onPageLimit}
            scrollTo={scrollTo}
          />
        )}
        </div>
      <div>{conversationsList}</div>
      {loggedUsersConversations.length > onPageLimit && (
          <Pagination
            page={page}
            setPage={setPage}
            list={loggedUsersConversations}
            limit={onPageLimit}
            scrollTo={scrollTo}
          />
        )}
    </div>
  );
};

export default Conversations;
