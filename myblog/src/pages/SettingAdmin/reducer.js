import {
  CONFIG_INIT,
  CONFIG_SET_KEEPONFILE,
  CONFIG_SET_SEARCHPAGE,
  CONFIG_SET_ARTICLEDETAILS,
  CONFIG_SET_COMMENTS,
  CONFIG_SET_BASIC
} from "./actionType";

export default (state, action) => {
  if (!state) {
    state = {
      config: {}
    };
  }

  switch (action.type) {
    case CONFIG_INIT: {
      return {
        config: action.config
      };
    }

    case CONFIG_SET_KEEPONFILE: {
      return {
        config: {
          ...state.config,
          keepOnFile: {
            ...state.config.keepOnFile,
            [action.item]: action.value
          }
        }
      };
    }
    case CONFIG_SET_SEARCHPAGE: {
      return {
        config: {
          ...state.config,
          searchPage: {
            ...state.config.searchPage,
            [action.item]: action.value
          }
        }
      };
    }
    case CONFIG_SET_ARTICLEDETAILS: {
      return {
        config: {
          ...state.config,
          articleDetails: {
            ...state.config.articleDetails,
            [action.item]: action.value
          }
        }
      };
    }
    case CONFIG_SET_COMMENTS: {
      return {
        config: {
          ...state.config,
          comment: {
            ...state.config.comment,
            [action.item]: action.value
          }
        }
      };
    }

    case CONFIG_SET_BASIC: {
      return {
        config: {
          ...state.config,
          basic: {
            ...state.config.basic,
            [action.item]: action.value
          }
        }
      };
    }

    default: {
      return state;
    }
  }
};
