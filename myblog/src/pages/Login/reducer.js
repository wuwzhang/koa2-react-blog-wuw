import {
  LOGIN_IN,
  LOGIN_OUT,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_ALERT_SUCCESS,
  LOGIN_ALERT_FAILE
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      user: null,
      logining: false,
      message: '',
      msg: null
    }
  }
  switch(action.type) {

    case LOGIN_IN: {
      return {

      }
    }
    case LOGIN_OUT: {
      return {
        user: null,
        logining: false
      }
    }
    case LOGIN_STARTED: {
      return {
        ...state,
        logining: true
      }
    }
    case LOGIN_SUCCESS: {
      return {
        user: action.result,
        logining: false
      }
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        logining: false,
        message: action.error
      }
    }
    case LOGIN_ALERT_FAILE: {
      return {
        ...state,
        msg: action.msg,
        msgType: action.msgType
      }
    }
    case LOGIN_ALERT_SUCCESS: {
      return {
        ...state,
        msg: action.msg,
        msgType: action.msgType
      }
    }
    default: {
      return state;
    }
  }
}
