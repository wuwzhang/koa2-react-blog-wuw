import {
  INIT_DETAILEARTICLE,
  ADD_COMMENTCOUNT
} from './actionType.js';

export const articleInitDetails = (article) => ({
  type: INIT_DETAILEARTICLE,
  article
})

export const commentAdd = () => ({
  type: ADD_COMMENTCOUNT
})
