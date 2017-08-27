import {
  INIT_COMMENT,
  ADD_COMMENT
} from './actionType.js';

export const commentInit = (comments) => ({
  type: INIT_COMMENT,
  comments
});

export const commentAdd = (comment) => ({
  type: ADD_COMMENT,
  comment
});
