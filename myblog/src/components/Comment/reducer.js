import {
  INIT_COMMENT,
  INIT_ALL_COMMENT,
  ADD_COMMENT,
  ADD_SUBCOMMENT,
  SET_COMMENT_FILTER,
  SET_SHOW_REPLY,
  CHECK_COMMENT,
  DELETE_COMMENT,
  NOTCHECKED_COMMENT,
  SET_THUMBSUP,
  SET_THUMBSDOWN
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      articleComments: [],
      allComment: [],
      NotCheckedCount: 0,
      filter: 'ALL'
    }
  }

  switch (action.type) {
    case INIT_COMMENT: {
      return {
        ...state,
        articleComments: action.comments.map((comment) => {
          return {
            ...comment,
            isShowReply: false
          }
        })
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
        articleComments: [
          action.comment,
          ...state.articleComments
        ],
        NotCheckedCount: state.NotCheckedCount + 1
      }
    }
    case ADD_SUBCOMMENT: {

      return {
        ...state,
        articleComments: [
          ...state.articleComments[action.commentIndex].replies.push(action.subComment),
          ...state.articleComments
        ]
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
    case SET_SHOW_REPLY: {
      return {
        ...state,
        articleComments: [
          ...state.articleComments[action.commentIndex].isShowReply = action.state,
          ...state.articleComments
        ]
      }
    }
    case SET_THUMBSUP: {
      let likesState = action.state;

      return {
        ...state,
        articleComments: [
          ...state.articleComments[action.commentIndex].likesState = likesState,
          ...state.articleComments[action.commentIndex].thumbsUp += likesState,
          ...state.articleComments
        ]
      }
    }
    case SET_THUMBSDOWN: {
      let dislikesState = action.state;

      return {
        ...state,
        articleComments: [
          ...state.articleComments[action.commentIndex].dislikesState = dislikesState,
          ...state.articleComments[action.commentIndex].thumbsDown += dislikesState,
          ...state.articleComments
        ]
      }
    }
    default: {
      return state;
    }
  }
}
