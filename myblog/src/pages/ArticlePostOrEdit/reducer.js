import {
  POST_STARTED,
  POST_SUCCESS,
  POST_FAILURE,
  ADD_ARTICLE,
  EDIT_INIT_START,
  EDIT_ARTICLE,
  EDIT_STARTED,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  UPDATE_STARTED,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  POST_ALERT_SUCCESS,
  POST_ALERT_FAIL,
  UPDATE_ALERT_SUCCESS,
  UPDATE_ALERT_FAIL
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      logining: null,
      message: ''
    }
  }

  switch (action.type) {
    case ADD_ARTICLE: {
      return {

      }
    }
    case EDIT_ARTICLE: {
      return {
        article: action.article
      }
    }
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
    case EDIT_INIT_START: {
      return {
        startEditing: false
      }
    }
    case EDIT_STARTED: {
      return {
        startEditing: true
      }
    }
    case EDIT_SUCCESS: {
      return {
        ...state,
        startEditing: false,
        article: action.article.article
      }
    }
    case EDIT_FAILURE: {
      return {
        startEditing: false
      }
    }
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
