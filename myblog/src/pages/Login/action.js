import {
  LOGIN_IN,
  LOGIN_OUT,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from './actionType.js';

export const loginIn = (user) => ({
  type: LOGIN_IN,
  user
});

export const loginOut = (user) => ({
  type: LOGIN_OUT,
  user
});

export const startLogin = () =>({
  type:LOGIN_STARTED
});

export const finishLogin = (result)=>({
  type:LOGIN_SUCCESS,
  result
});
export const failLogin = (error)=>({
  type:LOGIN_FAILURE,
  error
});
export const loginSuccess = ()=> (
  {
    msg:'登录成功',
    msgType:'success'
  }
);
export const loginFail = (error)=> (
  {
    msg:error,
    msgType:'warning'
  }
);
