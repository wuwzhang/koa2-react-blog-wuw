import {
  SEARCH_STARTED,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SUCCESS_SEARCH,
  FAILURE_SEARCH
} from './actionType.js';

export const successSearch = (articles) => ({
  type: SUCCESS_SEARCH,
  msgType: 'success',
  msg: 'search success',
  articles: articles
})
export const failSearch = (error) => ({
  type: FAILURE_SEARCH,
  msgType: 'failure',
  msg: error
})

export const searchStart = () => ({
  type: SEARCH_STARTED
});

export const searchSuccess = () => ({
  type: SEARCH_SUCCESS
});

export const searchFail = () => ({
  type: SEARCH_FAILURE
});
