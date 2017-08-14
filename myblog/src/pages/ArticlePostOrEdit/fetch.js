export const DOMAIN = '';
const CREDENTIALS = (process.env.ORIGIN) ? 'include' : 'same-origin';

export const addPost = async(params) => {
	let url = DOMAIN + 'api/article_post';

	try {
	  var result = await fetch(url, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-type': 'application/json'
	    },
	    body: JSON.stringify({
	      article: params.article
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

export const checkTitle = async(title) => {
  const url = DOMAIN + 'api/checkTitle';
  try {
    var result = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title
      }),
      credentials: CREDENTIALS
    })
  } catch (e) {

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
