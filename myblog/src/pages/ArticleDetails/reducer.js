import {
  INIT_DETAILEARTICLE,
  ADD_COMMENTCOUNT
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      article: []
    }
  }

  switch (action.type) {
    case INIT_DETAILEARTICLE: {
      return {
        ...state,
        article: action.article.article
      }
    }
    case ADD_COMMENTCOUNT: {

      return {
        ...state.article.comments = state.article.comments + 1,
        ...state
      }
    }
    default: {
      return state;
    }
  }
}
