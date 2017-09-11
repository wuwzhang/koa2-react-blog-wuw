export const DOMAIN = '';
const CREDENTIALS = (process.env.ORIGIN) ? 'include' : 'same-origin';

export const getAllTags = async () => {
  let url = DOMAIN + '/api/getAllTags';

  try {
    var result = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
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
