import {
  SEARCH_STARTED,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SUCCESS_SEARCH,
  FAILURE_SEARCH
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      articles: [],
      searching: null,
      msgType: null,
      msg: ''
    }
  }

  switch (action.type) {
    case SUCCESS_SEARCH: {

      return {
        articles: action.articles,
        msgType: action.msgType,
        msg: action.msg
      }
    }
    case FAILURE_SEARCH: {
      return {
        msgType: action.msgType,
        msg: action.msg
      }
    }
    case SEARCH_STARTED: {
      return {
        searching: true
      }
    }
    case SEARCH_SUCCESS: {
      return {
        searching: false
      }
    }
    case SEARCH_FAILURE: {
      return {
        searching: false
      }
    }
    default: {
      return state;
    }
  }
}
