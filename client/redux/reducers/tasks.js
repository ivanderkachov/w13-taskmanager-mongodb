import axios from 'axios'

const GET_TASKS = 'GET_TASKS'

const initialState = {
  tasks: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS: {
      return {
        ...state,
        tasks: action.tasks
      }
    }
    default:
      return state
  }
}

export function getTasks() {
  return (dispatch) => {
    return axios('/api/v1/tasks/task1').then(({ data }) => {
      const arrTasks = data.reduce((acc, task) => {
        return { ...acc, [task.title]: task }
      }, {})
      dispatch({
        type: GET_TASKS,
        tasks: arrTasks
      })
    })
  }
}
export function addTasks(title) {
  return (dispatch, getState) => {
    const store = getState().tasks.tasks
    axios
      .post('/api/v1/tasks/task1', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: {
          text: title
        }
      })
      .then(({ data }) => {
        const arrTasks = { ...store, [store.title]: data }
        dispatch({
          type: GET_TASKS,
          tasks: arrTasks
        })
      })
  }
}
export function changeStatus(taskNum, newstatus) {
  return (dispatch, getState) => {
    const store = getState().tasks.tasks
    const arrTasks = { ...store, [taskNum]: { ...store[taskNum], newstatus } }
    axios
      .patch(`/api/v1/tasks/task1/${taskNum}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: {
          status: newstatus
        }
      })
      .then(() => {
        dispatch({
          type: GET_TASKS,
          tasks: arrTasks
        })
      })
  }
}

export function deleteTask(taskNum) {
  return (dispatch, getState) => {
    const store = getState().tasks.tasks
    const arrTasks = delete store.taskNum
    axios.delete(`/api/v1/tasks/task1/${taskNum}`)
    .then(() => {
      dispatch({
        type: GET_TASKS,
        tasks: arrTasks
      })
    })
  }
}
