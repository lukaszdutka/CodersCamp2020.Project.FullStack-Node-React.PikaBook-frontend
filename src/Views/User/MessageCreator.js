import { useState } from "react";

import sendMessage from "../../API/sendMessage";

const MessageCreator = ({
  accessToken,
  recipient,
  setMessageCreatorVisible,
}) => {
  const [messageContent, setMessageContent] = useState("");
  const [sentMessage, setSentMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleTextareaChange = (e) => {
    setMessageContent(e.target.value);
  };

  const handleConfirm = async () => {
    const res = await sendMessage(accessToken, recipient._id, messageContent);
    if (res.error) setStatus(res.error);
    if (res.created) setStatus("Message successfully sent!");
    if (res.message) setSentMessage(res.message);
  };

  const handleCancel = () => {
    setMessageCreatorVisible(false);
  };

  return (
    <div className="creatorContainer">
      <h1>Send a message to {recipient.name}</h1>
      {sentMessage ? (
        <>
          <p>{sentMessage}</p>
        </>
      ) : (
        <textarea
          onChange={handleTextareaChange}
          value={messageContent}
        ></textarea>
      )}
      <p>
        <b>{status}</b>
      </p>
      {!sentMessage && <button onClick={handleConfirm}>Confirm</button>}
      <button onClick={handleCancel}>{sentMessage ? "Back" : "Cancel"}</button>
    </div>
  );
};

export default MessageCreator;
