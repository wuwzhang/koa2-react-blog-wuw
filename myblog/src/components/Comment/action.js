import {
  INIT_COMMENT,
  INIT_ALL_COMMENT,
  ADD_COMMENT,
  CHECK_COMMENT,
  DELETE_COMMENT,
  NOTCHECKED_COMMENT,
  SET_COMMENT_FILTER
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

export const commentNotChecked = (NotCheckedCount) => ({
  type: NOTCHECKED_COMMENT,
  NotCheckedCount
});

export const commentDelete = (commentIndex, isChecked) => ({
  type: DELETE_COMMENT,
  commentIndex,
  isChecked
});

export const setFilter = (filter) => ({
  type: SET_COMMENT_FILTER,
  filter
})
