import {
  DELETE_ARTICLE,
  DELETE_SUCCESS,
  INIT_ARTICLE,
  POST_STARTED,
  POST_SUCCESS,
  POST_FAILURE
} from './actionType.js';

export const artcileDelete = (articleIndex) => ({
  type: DELETE_ARTICLE,
  articleIndex
});

export const successDelete = () => ({
  type: DELETE_SUCCESS
})

export const articleInit = ({articles}) => ({
  type: INIT_ARTICLE,
  articles
});

export const startPostArticle = () => ({
  type: POST_STARTED
});

export const successPostArticle = (result) => ({
  type: POST_SUCCESS,
  result
});

export const failPostArticle = (error) => ({
  type: POST_FAILURE,
  error
});
