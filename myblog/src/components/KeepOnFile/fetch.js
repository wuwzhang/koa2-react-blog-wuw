export const DOMAIN = "";
const CREDENTIALS = process.env.ORIGIN ? "include" : "same-origin";

export const keepOnFileDatalist = async () => {
  let url = DOMAIN + "/api/article_date_list";

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
