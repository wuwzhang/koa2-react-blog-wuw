import {
  INIT_COMMENT,
  INIT_ALL_COMMENT,
  ADD_COMMENT,
  SET_COMMENT_FILTER,
  CHECK_COMMENT,
  DELETE_COMMENT,
  NOTCHECKED_COMMENT
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      comment: [],
      allComment: [],
      NotCheckedCount: 0,
      filter: 'ALL'
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
        NotCheckedCount: state.NotCheckedCount + 1
      }
    }
    case CHECK_COMMENT: {
      return {
        ...state,
        allComment: [
          ...state.allComment[action.commentIndex].isChecked = true,
          ...state.allComment
        ],
        NotCheckedCount: state.NotCheckedCount - 1
      }
    }
    case DELETE_COMMENT: {

      let count = action.isChecked? state.NotCheckedCount
                                  : state.NotCheckedCount - 1

      return {
        ...state,
        allComment: [
          ...state.allComment.slice(0, action.commentIndex),
          ...state.allComment.slice(action.commentIndex + 1)
        ],
        NotCheckedCount: count
      }
    }
    case NOTCHECKED_COMMENT: {
      return {
        ...state,
        NotCheckedCount: action.NotCheckedCount
      }
    }
    case SET_COMMENT_FILTER: {
      return {
        ...state,
        filter: action.filter
      }
    }
    default: {
      return state;
    }
  }
}
