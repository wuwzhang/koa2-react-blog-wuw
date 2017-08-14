import {
  POST_STARTED,
  POST_SUCCESS,
  POST_FAILURE,
  INIT_ARTICLE,
  ADD_ARTICLE,
  DELETE_ARTICLE
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      logining: null,
      message: ''
    }
  }

  switch (action.type) {
    case INIT_ARTICLE: {
      return {
        ...state,
        article: action.article
      }
    }
    case ADD_ARTICLE: {
      return {

      }
    }
    case DELETE_ARTICLE: {
      return {
        ...state,
        article: [
          ...state.articles.slice(0, action.articleIndex),
          ...state.articles.slice(action.articleIndex + 1)
        ]
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
