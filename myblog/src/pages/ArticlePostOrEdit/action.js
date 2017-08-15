import {
  POST_STARTED,
  POST_SUCCESS,
  POST_FAILURE,
  ADD_ARTICLE
} from './actionType.js';

// export const articleInit = (artcile) => ({
//   type: INIT_ARTICLE,
//   artcile
// });

export const artcileAdd = (artcile) => ({
  type: ADD_ARTICLE,
  artcile
});

// export const artcileDelete = (artcileIndex) => ({
//   type: DELETE_ARTICLE,
//   artcileIndex
// });

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
