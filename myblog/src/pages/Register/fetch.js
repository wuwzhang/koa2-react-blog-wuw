export const DOMAIN = '';
const CREDENTIALS = (process.env.ORIGIN) ? 'include' : 'same-origin';

export const register = async(params) => {
  let url = DOMAIN + '/api/signUp',
      {account, username, password} = params;

  try {
    var result = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        account: account,
        username: username,
        password: password
      }),
      credentials: CREDENTIAL
    })
  } catch(e) {

  }

  if (result) {
    return result.json();
  } else {
    return {
      code: -2,
      message: '未知错误'
    }
  }
}
