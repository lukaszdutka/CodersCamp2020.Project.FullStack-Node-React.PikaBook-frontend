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
    <div className="creatorContainer" id="messageCreator">
      <h1>Send a message to {recipient.name}</h1>
      {sentMessage ? (
        <>
          <p className="sentMessage">{sentMessage}</p>
        </>
      ) : (
        <textarea
          onChange={handleTextareaChange}
          value={messageContent}
        ></textarea>
      )}
      {status && (
        <p>
          <b>{status}</b>
        </p>
      )}
      <div>
        {!sentMessage && (
          <button className="buttonDark" onClick={handleConfirm}>
            Confirm
          </button>
        )}
        <button className="buttonDark" onClick={handleCancel}>
          {sentMessage ? "Back" : "Cancel"}
        </button>
      </div>
    </div>
  );
};

export default MessageCreator;
