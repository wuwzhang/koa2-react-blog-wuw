import {

  UPDATE_STARTED,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  UPDATE_ALERT_INIT,
  UPDATE_ALERT_SUCCESS,
  UPDATE_ALERT_FAIL
} from './actionType.js';

export const startUpdateArticle = () => ({
  type: UPDATE_STARTED
});

export const successUpdateArticle = () => ({
  type: UPDATE_SUCCESS

});

export const failUpdateArticle = () => ({
  type: UPDATE_FAILURE
});

export const initUpdateArticle = () => ({
  type: UPDATE_ALERT_INIT,
  msg: '',
  msgType: null
});

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
