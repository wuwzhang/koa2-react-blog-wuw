import {
  SET_COMMENT_PANK,
  SET_PREVIEW_PANK
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      comment: [],
      preview: []
    }
  }

  switch (action.type) {
    case SET_PREVIEW_PANK: {
      return {
        ...state,
        preview: action.rank
      }
    }
    case SET_COMMENT_PANK: {

      return {
        ...state,
        comment: action.rank
      }
    }
    default: {
      return state;
    }
  }
}
