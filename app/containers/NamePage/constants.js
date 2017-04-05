/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const FETCH_NAME = 'boilerplate/Name/FETCH_NAME';
export const SET_NAME = 'boilerplate/Name/SET_NAME';
export const FETCH_NAME_SUCCESS = 'boilerplate/Name/FETCH_NAME_SUCCESS';
