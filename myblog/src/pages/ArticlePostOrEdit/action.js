import {
  POST_STARTED,
  POST_SUCCESS,
  POST_FAILURE,
  ADD_ARTICLE,
  EDIT_ARTICLE,
  EDIT_STARTED,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  UPDATE_STARTED,
  UPDATE_SUCCESS,
  UPDATE_FAILURE
} from './actionType.js';

export const artcileAdd = (article) => ({
  type: ADD_ARTICLE,
  article
});

export const articleInitEdit = (article) => ({
  type: EDIT_ARTICLE,
  article
})

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
})

export const startEditArticle = () => ({
  type: EDIT_STARTED
});

export const successEditArticle = (result) => ({
  type: EDIT_SUCCESS,
  result
});

export const failEditArticle = (error) => ({
  type: EDIT_FAILURE,
  error
})

export const startUpdateArticle = () => ({
  type: UPDATE_STARTED
});

export const successUpdateArticle = () => ({
  type: UPDATE_SUCCESS,

});

export const failUpdateArticle = () => ({
  type: UPDATE_FAILURE,

})
