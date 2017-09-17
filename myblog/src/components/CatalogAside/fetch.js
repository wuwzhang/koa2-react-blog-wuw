export const DOMAIN = '';
const CREDENTIALS = (process.env.ORIGIN) ? 'include' : 'same-origin';

export const getCatalogsAndCount = async () => {
  let url = DOMAIN + '/api/article_Catalog_And_Count';

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
