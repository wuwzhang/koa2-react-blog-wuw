import { INIT_TAG } from "./actionType";

export default (state, action) => {
  if (!state) {
    state = {
      tags: []
    };
  }

  switch (action.type) {
    case INIT_TAG: {
      return {
        ...state,
        tags: action.tags
      };
    }

    default: {
      return state;
    }
  }
};
