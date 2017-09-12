import {
  REGIST_START,
  REGIST_SUCCESS,
  REGIST_FAILURE,
  REGIST_ALERT_SUCCESS,
  REGIST_ALERT_FAILE
} from './actionType.js';

export default (state, action) => {

  if (!state) {
    state = {
      registing: false,
      message: '',
      msg: null
    }
  }

  switch(action.type) {
    case REGIST_START: {
      return {
        registing: true
      }
    }
    case REGIST_SUCCESS: {
      return {
        ...state,
        registing: false
      }
    }
    case REGIST_FAILURE: {
      return {
        ...state,
        registing: false,
        message: action.error
      }
    }
    case REGIST_ALERT_SUCCESS: {
      return {
        ...state,
        msg: action.msg,
        msgType: action.msgType
      }
    }
    case REGIST_ALERT_FAILE: {
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


