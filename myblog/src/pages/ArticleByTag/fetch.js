export const DOMAIN = '';
const CREDENTIALS = (process.env.ORIGIN) ? 'include' : 'same-origin';

export const getArticlesByTag = async(content) => {
  let url = DOMAIN + '/api/getArticlesByTag';

  try {
    var result = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        tag: content
      }),
      credentials: CREDENTIALS
    })
  } catch(e) {

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

