export const DOMAIN = "";
const CREDENTIALS = process.env.ORIGIN ? "include" : "same-origin";

export const postContact = async (account, message) => {
  let url = DOMAIN + "/api/post_message";

  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email: account,
        content: message
      }),
      credentials: CREDENTIALS
    });
  } catch (e) {
    console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const getNotCheckedMessages = async () => {
  let url = DOMAIN + "/api/getNotCheckedMessages";

  try {
    var result = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: CREDENTIALS
    });
  } catch (e) {
    console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const getAllMessage = async (page, eachPageArticles) => {
  let url = DOMAIN + "/api/message_admin/getAll/message";

  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        page,
        eachPageArticles
      }),
      credentials: CREDENTIALS
    });
  } catch (e) {
    console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const deleteMessage = async messageId => {
  let url = DOMAIN + `/api/message_delete/${messageId}`;
  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: CREDENTIALS
    });
  } catch (e) {
    console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const changeMessageCheck = async messageId => {
  let url = DOMAIN + `/api/message_checked/${messageId}`;
  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: CREDENTIALS
    });
  } catch (e) {
    console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};
