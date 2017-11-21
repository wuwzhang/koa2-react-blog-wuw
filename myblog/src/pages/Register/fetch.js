export const DOMAIN = '';
const CREDENTIALS = (process.env.ORIGIN) ? 'include' : 'same-origin';

export const register = async(params) => {
  const url = DOMAIN + '/api/signUp',
        { account, username, password, avatarValue } = params;

  console.log(avatarValue)

  try {
    var result = await fetch(url, {

      method: 'POST',
      body: JSON.stringify({
        account,
        username,
        password,
        avatarValue
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

export const registActive = async(verifyKey) => {
  const url = DOMAIN + '/api/registActive';
  try {
    var result = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        verifyKey
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

