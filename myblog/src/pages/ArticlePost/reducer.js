import {
  POST_STARTED,
  POST_SUCCESS,
  POST_FAILURE,
  POST_ALERT_INIT,
  POST_ALERT_SUCCESS,
  POST_ALERT_FAIL
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      logining: null,
      message: ''
    }
  }

  switch (action.type) {
    case POST_STARTED: {
      return {
        posting: true
      }
    }
    case POST_SUCCESS: {
      return {
        posting: false,
        article: action.article
      }
    }
    case POST_FAILURE: {
      return {
        posting: false,
        article: [
          ...state.article,
          action.error
        ]
      }
    }
    case POST_ALERT_INIT: {
      return {
        ...state,
        msg: action.msg,
        msgType: action.msgType
      }
    }
    case POST_ALERT_SUCCESS: {
      return {
        ...state,
        msg: action.msg,
        msgType: action.msgType
      }
    }
    case POST_ALERT_FAIL: {
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
