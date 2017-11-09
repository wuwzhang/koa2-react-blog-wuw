export const DOMAIN = '';
const CREDENTIALS = (process.env.ORIGIN) ? 'include' : 'same-origin';

export const getArticleDateList = async (page, eachPageArticle) => {
  let url = DOMAIN + '/api/article_date_list';

  try {
    var result = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        page,
        eachPageArticle
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

