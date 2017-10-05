import {
  INIT_COMMENT,
  INIT_ALL_COMMENT,
  ADD_COMMENT,
  CHECK_COMMENT,
  DELETE_COMMENT,
  NOTCHECKED_COMMENT
} from './actionType.js';

export const commentInit = (comments) => ({
  type: INIT_COMMENT,
  comments
});

export const commentAllInit = (comments) => ({
  type: INIT_ALL_COMMENT,
  comments
});

export const commentAdd = (comment) => ({
  type: ADD_COMMENT,
  comment
});

export const commentChecked = (commentIndex) => ({
  type: CHECK_COMMENT,
  commentIndex
});

export const commentNotChecked = (NotCheckCount) => ({
  type: NOTCHECKED_COMMENT,
  NotCheckCount
});

export const commentDelete = (commentIndex, isChecked) => ({
  type: DELETE_COMMENT,
  commentIndex,
  isChecked
})
