export const DOMAIN = '';
const CREDENTIALS = (process.env.ORIGIN) ? 'include' : 'same-origin';


export const getEditArticle = async (articleId) => {
  let url = DOMAIN + `/api/article_edit/${articleId}`;

  try {
    var result = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      credentials: CREDENTIALS
    });
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

export const updateArticle = async (articleId, article) => {
  let url = DOMAIN + `/api/article_update/${articleId}`;
  try {
    var result = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title: article.title,
        content: article.content,
        tags: article.tags,
        catalog: article.catalog,
        preTags: article.preTags,
        update_time: article.update_time
      }),
      credentials: CREDENTIALS
    })
  } catch (e) {
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


