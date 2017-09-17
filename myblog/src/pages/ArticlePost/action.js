import {
  POST_STARTED,
  POST_SUCCESS,
  POST_FAILURE,
  POST_ALERT_INIT,
  POST_ALERT_SUCCESS,
  POST_ALERT_FAIL
} from './actionType.js';

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

export const initPostArticle = () => ({
  type: POST_ALERT_INIT,
  msg: '',
  msgType: null
})
export const postSuccess = () => ({
  type: POST_ALERT_SUCCESS,
  msg: '发表成功',
  msgType: 'success'
});

export const postFail = () => ({
  type: POST_ALERT_FAIL,
  msg: '发表失败',
  msgType: 'warning'
})
