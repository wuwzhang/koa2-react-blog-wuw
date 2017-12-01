import {
  SET_PREVIEW_PANK,
  SET_COMMENT_PANK
} from './actionType.js';

export const setPreviewRank = (rank) => ({
  type: SET_PREVIEW_PANK,
  rank
})

export const setCommentRank = (rank) => ({
  type: SET_COMMENT_PANK,
  rank
})
