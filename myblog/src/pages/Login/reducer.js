import {
  LOGIN_IN,
  LOGIN_OUT,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      user: null,
      logining: false,
      message: ''
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
    default: {
      return state;
    }
  }
}
