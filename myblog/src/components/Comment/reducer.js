import {
  INIT_COMMENT,
  ADD_COMMENT
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = []
  }

  switch (action.type) {
    case INIT_COMMENT: {
      return action.comments
    }
    case ADD_COMMENT: {
      return [
        {
          user: action.comment.user,
          articleId: action.comment.articleId,
          content: action.comment.content,
          create_at: action.comment.create_at
        },
        ...state
      ]
    }
    default: {
      return state;
    }
  }
}
