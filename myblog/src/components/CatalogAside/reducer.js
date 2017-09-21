import {
  SET_CATALOG
} from './actionType.js';

export default (state, action) => {
  if (!state) {
    state = {
      catalog: []
    }
  }

  switch (action.type) {
    case SET_CATALOG: {
      return {
        ...state,
        catalog: action.catalog
      }
    }
    default: {
      return state;
    }
  }
}
