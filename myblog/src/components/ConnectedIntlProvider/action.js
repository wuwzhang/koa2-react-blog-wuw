import {
  TOGGLE_LANGUAGE
} from './actionType.js';

export const loginIn = ({lang, messages}) => ({
  type: TOGGLE_LANGUAGE,
  lang: lang,
  messages: messages
});
