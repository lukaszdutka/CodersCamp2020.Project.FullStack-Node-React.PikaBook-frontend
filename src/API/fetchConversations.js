export const fetchConversations = async (accessToken) => {
  let res = await fetch("https://pikabook.herokuapp.com/api/me/conversations", {
    method: "get",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    res = await res.text();
    return { error: res };
  } else {
    res = await res.json();
    return { conversations: res };
  }
};

export const fetchConversationByInterlocutor = async (
  accessToken,
  interlocutorsId,
  params
) => {
  let res = await fetch(
    `https://pikabook.herokuapp.com/api/me/conversations/${interlocutorsId}?` +
      new URLSearchParams(params),
    {
      method: "get",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  if (!res.ok) {
    res = await res.text();
    return { error: res };
  } else {
    res = await res.json();
    return { conversation: res };
  }
};
