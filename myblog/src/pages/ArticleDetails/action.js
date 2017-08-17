import {
  INIT_DETAILEARTICLE
} from './actionType.js';

export const articleInitDetails = (article) => ({
  type: INIT_DETAILEARTICLE,
  article
})
