export const DOMAIN = '';
const CREDENTIALS = (process.env.ORIGIN) ? 'include' : 'same-origin';

export const addComment = async (params) => {

  let {
    articleId,
    userId,
    comment
  } = params;

  let url = DOMAIN + `/api/article_details/${articleId}/comment`;

  try {
    var result = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        articleId:articleId,
        content:comment
      }),
      credentials: CREDENTIALS
    })
  } catch(e) {
    console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: '-2',
      message: '未知错误'
    }
  }
}

export const getComment = async (articleId) => {

  let url = DOMAIN + `/api/article_details/${articleId}/get/comment`;

  try {
    var result = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      credentials: CREDENTIALS
    })
  } catch(e) {
    console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: '-2',
      message: '未知错误'
    }
  }
}

