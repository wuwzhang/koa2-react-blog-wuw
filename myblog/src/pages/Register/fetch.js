export const DOMAIN = '';
const CREDENTIALS = (process.env.ORIGIN) ? 'include' : 'same-origin';

export const register = async(params) => {
  const url = DOMAIN + '/api/signUp',
        { account, username, password } = params;

  try {
    var result = await fetch(url, {

      method: 'POST',
      body: JSON.stringify({
        account,
        username,
        password
      })
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

export const checkAccount = async(account) => {
  const url = DOMAIN + 'api/checkAccount';
  try {
    var result = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        account
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
