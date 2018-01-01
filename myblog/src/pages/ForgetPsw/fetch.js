export const DOMAIN = "";
const CREDENTIALS = process.env.ORIGIN ? "include" : "same-origin";

export const forgetPsw = async account => {
  let url = DOMAIN + "/api/forgetPsw";

  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        account
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
