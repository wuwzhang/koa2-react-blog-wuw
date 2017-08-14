export const DOMAIN = '';
const CREDENTIALS = (process.env.ORIGIN) ? 'include' : 'same-origin';

export const addPost = async(params) => {
	let url = DOMAIN + 'api/posts';

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