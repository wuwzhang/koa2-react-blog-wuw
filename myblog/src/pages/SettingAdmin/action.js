import {
  CONFIG_INIT,
  CONFIG_SET_KEEPONFILE,
  CONFIG_SET_SEARCHPAGE,
  CONFIG_SET_ARTICLEDETAILS,
  CONFIG_SET_COMMENTS,
  CONFIG_SET_BASIC
} from "./actionType";

export const initConfig = config => ({
  type: CONFIG_INIT,
  config
});

export const setKeepOnFile = (item, value) => ({
  type: CONFIG_SET_KEEPONFILE,
  item,
  value
});

export const setSearchPage = (item, value) => ({
  type: CONFIG_SET_SEARCHPAGE,
  item,
  value
});

export const setArticleDetails = (item, value) => ({
  type: CONFIG_SET_ARTICLEDETAILS,
  item,
  value
});

export const setComment = (item, value) => ({
  type: CONFIG_SET_COMMENTS,
  item,
  value
});

export const setBasic = (item, value) => ({
  type: CONFIG_SET_BASIC,
  item,
  value
});
