export const DOMAIN = "";
const CREDENTIALS = process.env.ORIGIN ? "include" : "same-origin";

export const resetPsw = async (activeKey, password) => {
  let url = DOMAIN + "/api/reset_password";

  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        activeKey,
        password
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
