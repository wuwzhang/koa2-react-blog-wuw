import {
  ADD_MESSAGE,
  NOTCHECKED_MESSAGE,
  SET_MESSAGE_FILTER,
  INIT_ALL_MESSAGE,
  DELETE_MESSAGE,
  CHECK_MESSAGE
} from './actionType.js';

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message
});

export const messageAllInit = (messages) => ({
  type: INIT_ALL_MESSAGE,
  messages
});

export const messageNotChecked = (NotCheckedCount) => ({
  type: NOTCHECKED_MESSAGE,
  NotCheckedCount
});

export const setFilter = (filter) => ({
  type: SET_MESSAGE_FILTER,
  filter
});

export const messageDelete = (messageIndex, isChecked) => ({
  type: DELETE_MESSAGE,
  messageIndex,
  isChecked
});

export const messageChecked = (messageIndex) => ({
  type: CHECK_MESSAGE,
  messageIndex
})
