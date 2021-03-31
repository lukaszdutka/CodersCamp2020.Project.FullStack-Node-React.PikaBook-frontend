import { useState } from "react";

import sendMessage from "../../API/sendMessage";

const MessageCreator = ({
  accessToken,
  recipientId,
  recipientName,
  setMessageCreatorVisible,
}) => {
  const [messageContent, setMessageContent] = useState("");
  const [status, setStatus] = useState("");

  const handleTextareaChange = (e) => {
      setMessageContent(e.target.value);
  };

  const handleConfirm = async () => {
    const res = sendMessage(accessToken, recipientId, messageContent);
    if (res.error) setStatus(res.error);
    if (res.created) setStatus("Message successfully sent!");
  };

  const handleCancel = () => {
    setMessageCreatorVisible(false);
  };

  return (
    <div className="creatorContainer">
      <h1>Send a message to {recipientName}</h1>
      <textarea
        onChange={handleTextareaChange}
        value={messageContent}
      ></textarea>
      {status}
      {status || <button onClick={handleConfirm}>Confirm</button>}
      <button onClick={handleCancel}>{status ? "Back" : "Cancel"}</button>
    </div>
  );
};

export default MessageCreator;
