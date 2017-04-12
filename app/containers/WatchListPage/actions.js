export const taskActions = {
  LOAD_TASKS_FULFILLED: 'LOAD_TASKS_FULFILLED',

  loadTasksFulfilled: tasks => ({
    type: taskActions.LOAD_TASKS_FULFILLED,
    payload: {tasks}
  })
};
