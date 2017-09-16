import {
  POST_STARTED,
  POST_SUCCESS,
  POST_FAILURE,
  ADD_ARTICLE,
  EDIT_ARTICLE,
  EDIT_INIT_START,
  EDIT_STARTED,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  UPDATE_STARTED,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  POST_ALERT_SUCCESS,
  POST_ALERT_FAIL,
  UPDATE_ALERT_SUCCESS,
  UPDATE_ALERT_FAIL
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

export const initStartEditArticle = () => ({
  type: EDIT_INIT_START
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
  type: UPDATE_SUCCESS

});

export const failUpdateArticle = () => ({
  type: UPDATE_FAILURE
});

export const postSuccess = () => ({
  type: POST_ALERT_SUCCESS,
  msg:'发表成功',
  msgType:'success'
});

export const postFail = () => ({
  type: POST_ALERT_FAIL,
  msg: '发表失败',
  msgType: 'warning'
})

export const updateSuccess = () => ({
  type: UPDATE_ALERT_SUCCESS,
  msg:'修改成功',
  msgType:'success'
});

export const updateFail = () => ({
  type: UPDATE_ALERT_FAIL,
  msg: '修改失败',
  msgType: 'warning'
})
