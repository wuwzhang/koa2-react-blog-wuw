import {
  UPDATE_STARTED,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  UPDATE_ALERT_SUCCESS,
  UPDATE_ALERT_FAIL,
  UPDATE_ALERT_INIT
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      logining: null,
      message: ''
    }
  }

  switch (action.type) {
    case UPDATE_STARTED: {
      return {
        startUpdating: true
      }
    }
    case UPDATE_SUCCESS: {
      return {
        ...state,
        startUpdating: false
      }
    }
    case UPDATE_FAILURE: {
      return {
        startUpdating: false
      }
    }
    case UPDATE_ALERT_INIT: {
      return {
        ...state,
        msg: action.msg,
        msgType: action.msgType
      }
    }
    case UPDATE_ALERT_SUCCESS: {
      return {
        ...state,
        msg: action.msg,
        msgType: action.msgType
      }
    }
    case UPDATE_ALERT_FAIL: {
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
