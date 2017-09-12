import {
  REGIST_START,
  REGIST_SUCCESS,
  REGIST_FAILURE,
  REGIST_ALERT_SUCCESS,
  REGIST_ALERT_FAILE
} from './actionType.js'

export const startRegist = () => ({
  type: REGIST_START
})

export const finishRegist = () => ({
  type: REGIST_SUCCESS
})

export const faileRegist = (error) => ({
  type: REGIST_FAILURE,
  error
})

export const registSuccess = () => ({
  type: REGIST_ALERT_SUCCESS,
  msg: '注册成功',
  msgType: 'success'
})

export const registFaile = (error) => ({
  type: REGIST_ALERT_FAILE,
  msg: error,
  msgType: 'success'
})
