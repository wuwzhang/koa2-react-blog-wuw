export const DOMAIN = "";
const CREDENTIALS = process.env.ORIGIN ? "include" : "same-origin";

export const getConfig = async () => {
  let url = DOMAIN + "/api/get_config";

  try {
    var result = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: CREDENTIALS
    });
  } catch (e) {}

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const setConfig = async config => {
  let url = DOMAIN + "/api/set_config";

  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        config
      }),
      credentials: CREDENTIALS
    });
  } catch (e) {}

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};
