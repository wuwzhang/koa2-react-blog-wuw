import {
  POST_STARTED,
  POST_SUCCESS,
  POST_FAILURE,
  ADD_ARTICLE
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
    case POST_STARTED: {
      return {
        posting: true
      }
    }
    case POST_SUCCESS: {
      return {
        posting: false,
        article: [
          ...state.article,
          action.result
        ]
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
    default: {
      return state;
    }
  }
}
