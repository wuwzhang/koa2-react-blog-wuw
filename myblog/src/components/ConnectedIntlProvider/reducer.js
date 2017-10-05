import {
  TOGGLE_LANGUAGE
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      lang: 'zh',
      messages: 'zh-CN'
    }
  }
  switch(action.type) {

    case TOGGLE_LANGUAGE: {
      return {
        lang: action.lang,
        messages: action.messages
      }
    }
    default: {
      return state;
    }
  }
}
