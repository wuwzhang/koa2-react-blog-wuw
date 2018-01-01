import {
  INIT_COMMENT,
  INIT_ALL_COMMENT,
  ADD_COMMENT,
  ADD_SUB_COMMENT,
  SET_COMMENT_FILTER,
  SET_SHOW_REPLY,
  SET_ADMIN_SHOW_REPLY,
  CHECK_COMMENT,
  CANCEL_COMMENT,
  DELETE_COMMENT,
  DELETE_SUB_COMMENT,
  CHANCEL_SUB_COMMENT,
  NOTCHECKED_AND_REPORT_COMMENT,
  SET_THUMBSUP,
  SET_THUMBSDOWN,
  SET_REPORT
} from "./actionType.js";

export default (state, action) => {
  if (!state) {
    state = {
      articleComments: [],
      allComment: [],
      filter: "ALL",
      NotCheckedCount: 0,
      ReportCount: 0
    };
  }

  switch (action.type) {
    case INIT_COMMENT: {
      return {
        ...state,
        articleComments: action.comments.map(comment => {
          return {
            ...comment,
            isShowReply: false
          };
        })
      };
    }
    case INIT_ALL_COMMENT: {
      return {
        ...state,
        allComment: action.comments.map(comment => {
          return {
            ...comment,
            isShowReply: false
          };
        })
      };
    }
    case ADD_COMMENT: {
      return {
        ...state,
        articleComments: [action.comment, ...state.articleComments],
        NotCheckedCount: state.NotCheckedCount + 1
      };
    }
    case ADD_SUB_COMMENT: {
      return {
        ...state,
        articleComments: [
          ...state.articleComments[action.commentIndex].replies.push(
            action.subComment
          ),
          ...state.articleComments
        ]
      };
    }
    case DELETE_SUB_COMMENT: {
      let reportCount = action.isRePorted
        ? state.ReportCount - 1
        : state.ReportCount;

      let comment = state,
        { commentIndex, subCommentIndex } = action;
      let { allComment } = comment;
      let replies = [
        ...allComment[commentIndex].replies.slice(0, subCommentIndex),
        ...allComment[commentIndex].replies.slice(subCommentIndex + 1)
      ];
      allComment[commentIndex].replies = replies;
      comment.allComment = allComment;
      comment.ReportCount = reportCount;
      return comment;
    }
    case CHANCEL_SUB_COMMENT: {
      return {
        ...state,
        allComment: [
          ...(state.allComment[action.commentIndex].isRePort = false),
          ...state.allComment
        ],
        ReportCount: state.ReportCount - 1
      };
    }
    case CHECK_COMMENT: {
      return {
        ...state,
        allComment: [
          ...(state.allComment[action.commentIndex].isChecked = true),
          ...state.allComment
        ],
        NotCheckedCount: state.NotCheckedCount - 1
      };
    }
    case CANCEL_COMMENT: {
      return {
        ...state,
        allComment: [
          ...(state.allComment[action.commentIndex].isRePort = action.state),
          ...state.allComment
        ],
        ReportCount: state.ReportCount - 1
      };
    }
    case DELETE_COMMENT: {
      let count = action.isChecked
        ? state.NotCheckedCount
        : state.NotCheckedCount - 1;

      let reportCount = action.isRePorted
        ? state.ReportCount - 1
        : state.ReportCount;

      return {
        ...state,
        allComment: [
          ...state.allComment.slice(0, action.commentIndex),
          ...state.allComment.slice(action.commentIndex + 1)
        ],
        NotCheckedCount: count,
        ReportCount: reportCount
      };
    }
    case NOTCHECKED_AND_REPORT_COMMENT: {
      return {
        ...state,
        NotCheckedCount: action.notCheckedCount,
        ReportCount: action.reportedCount
      };
    }
    case SET_COMMENT_FILTER: {
      return {
        ...state,
        filter: action.filter
      };
    }
    case SET_ADMIN_SHOW_REPLY: {
      return {
        ...state,
        allComment: [
          ...(state.allComment[action.commentIndex].isShowReply = action.state),
          ...state.allComment
        ]
      };
    }
    case SET_SHOW_REPLY: {
      return {
        ...state,
        articleComments: [
          ...(state.articleComments[action.commentIndex].isShowReply =
            action.state),
          ...state.articleComments
        ]
      };
    }
    case SET_THUMBSUP: {
      let likesState = action.state;

      return {
        ...state,
        articleComments: [
          ...(state.articleComments[
            action.commentIndex
          ].likesState = likesState),
          ...(state.articleComments[
            action.commentIndex
          ].thumbsUp += likesState),
          ...state.articleComments
        ]
      };
    }
    case SET_THUMBSDOWN: {
      let dislikesState = action.state;

      return {
        ...state,
        articleComments: [
          ...(state.articleComments[
            action.commentIndex
          ].dislikesState = dislikesState),
          ...(state.articleComments[
            action.commentIndex
          ].thumbsDown += dislikesState),
          ...state.articleComments
        ]
      };
    }
    case SET_REPORT: {
      return {
        ...state,
        articleComments: [
          ...(state.articleComments[action.commentIndex].isRePort =
            action.state),
          ...state.articleComments
        ],
        ReportCount: state.ReportCount + 1
      };
    }
    default: {
      return state;
    }
  }
};
