import {
  POST_STARTED,
  POST_SUCCESS,
  POST_FAILURE,
  INIT_ARTICLE,
  DELETE_ARTICLE,
  DELETE_SUCCESS
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      articles: [],
      posting: false,
      deleted: false
    }
  }

  switch (action.type) {

    case INIT_ARTICLE: {
      return {
        ...state,
        articles: action.articles
      }
    }
    case DELETE_ARTICLE: {

      return {
        ...state,
        deleted: true,
        articles: [
          ...state.articles.slice(0, action.articleIndex),
          ...state.articles.slice(action.articleIndex + 1)
        ]
      }
    }
    case DELETE_SUCCESS: {
      return {
        ...state,
        deleted: false
      }
    }
    case POST_STARTED: {
      return {
        ...state,
        posting: true
      }
    }
    case POST_SUCCESS: {
      return {
        posting: false,
        articles: [
          ...state.articles,
          action.result
        ]
      }
    }
    case POST_FAILURE: {
      return {
        ...state,
        posting: 'error'
      }
    }
    default: {
      return state;
    }
  }
}
