import {
  INIT_DETAILEARTICLE
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
    default: {
      return state;
    }
  }
}
