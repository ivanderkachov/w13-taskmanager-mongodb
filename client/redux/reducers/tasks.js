import axios from 'axios'

const GET_TASKS = 'GET_TASKS'




const initialState = {
  tasks: [],
  titles: [],
  status: []
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
        return {...acc, [task.title]:task }
      }, {})
      dispatch({
        type: GET_TASKS,
        tasks: arrTasks
      })
    })
  }
}
export function addTasks(title) {
  return (dispatch) => {
    axios.post('/api/v1/tasks/task1', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: {
        text: title
      }
    })
    axios('/api/v1/tasks/task1').then(({ data }) => {
      const arrTasks = data.reduce((acc, task) => {
        return {...acc, [task.title]:task }
      }, {})
          dispatch({
            type: GET_TASKS,
            tasks: arrTasks
          })
    })

  }
  }
  export function changeStatus(taskNum, newstatus) {
    return (dispatch) => {
      axios.patch(`/api/v1/tasks/task1/${taskNum}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: {
          status: newstatus
        }
      })
    axios('/api/v1/tasks/task1').then(({ data }) => {
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
