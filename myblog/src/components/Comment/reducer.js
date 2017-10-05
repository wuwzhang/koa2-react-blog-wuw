import {
  INIT_COMMENT,
  INIT_ALL_COMMENT,
  ADD_COMMENT,
  CHECK_COMMENT,
  DELETE_COMMENT,
  NOTCHECKED_COMMENT
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      comment: [],
      allComment: [],
      NotCheckCount: 0
    }
  }

  switch (action.type) {
    case INIT_COMMENT: {

      return {
        ...state,
        comment: action.comments
      }
    }
    case INIT_ALL_COMMENT: {
      return {
        ...state,
        allComment: action.comments
      }
    }
    case ADD_COMMENT: {
      return {
        ...state,
        comment: [
          action.comment,
          ...state.comment
        ],
        NotCheckCount: state.NotCheckCount + 1
      }
    }
    case CHECK_COMMENT: {
      return {
        ...state,
        allComment: [
          ...state.allComment[action.commentIndex].isChecked = true,
          ...state.allComment
        ],
        NotCheckCount: state.NotCheckCount - 1
      }
    }
    case DELETE_COMMENT: {

      let count = action.isChecked? this.state.NotCheckCount
                                  : state.NotCheckCount - 1

      return {
        ...state,
        allComment: [
          ...state.allComment.slice(0, action.commentIndex),
          ...state.allComment.slice(action.commentIndex + 1)
        ],
        NotCheckCount: count
      }
    }
    case NOTCHECKED_COMMENT: {
      return {
        ...state,
        NotCheckCount: action.NotCheckCount
      }
    }
    default: {
      return state;
    }
  }
}
