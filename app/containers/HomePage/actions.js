import {
  CHANGE_USERNAME,
  CHANGE_SEARCH_QUERY,
} from './constants';

export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}
export function changeSearchQuery(name) {
  return {
    type: CHANGE_SEARCH_QUERY,
    name,
  };
}

