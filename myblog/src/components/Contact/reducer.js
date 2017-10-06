import {
  ADD_MESSAGE,
  NOTCHECKED_MESSAGE,
  SET_MESSAGE_FILTER,
  INIT_ALL_MESSAGE,
  CHECK_MESSAGE,
  DELETE_MESSAGE
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      message: [],
      filter: 'ALL',
      NotCheckedCount: 0
    }
  }

  switch (action.type) {
    case INIT_ALL_MESSAGE: {
      return {
        ...state,
        message: action.messages
      }
    }
    case ADD_MESSAGE: {
      return {
        ...state,
        message: [
          action.message,
          ...state.message
        ],
        NotCheckedCount: state.NotCheckedCount + 1
      }
    }
    case NOTCHECKED_MESSAGE: {
      return {
        ...state,
        NotCheckedCount: action.NotCheckedCount
      }
    }
    case SET_MESSAGE_FILTER: {
      return {
        ...state,
        filter: action.filter
      }
    }
    case CHECK_MESSAGE: {
      return {
        ...state,
        message: [
          ...state.message[action.messageIndex].isChecked = true,
          ...state.message
        ],
        NotCheckedCount: state.NotCheckedCount - 1
      }
    }
    case DELETE_MESSAGE: {

      let count = action.isChecked? state.NotCheckedCount
                                  : state.NotCheckedCount - 1

      return {
        ...state,
        message: [
          ...state.message.slice(0, action.messageIndex),
          ...state.message.slice(action.messageIndex + 1)
        ],
        NotCheckedCount: count
      }
    }
    default: {
      return state;
    }
  }
}
