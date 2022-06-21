import axios from 'axios'

const GET_TASKS = 'GET_TASKS'
const ADD_TASKS = 'ADD_TASKS'



const initialState = {
  tasks: [],
  titles: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS: {
      return {
        ...state,
        tasks: action.tasks
      }
    }
    case ADD_TASKS: {
      return {
        ...state,
        titles: action.titles
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
    dispatch({
      type: ADD_TASKS,
      titles: title
    })
  }
  }
