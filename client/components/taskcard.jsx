import React from 'react'
import { useDispatch } from 'react-redux'

import { changeStatus } from '../redux/reducers/tasks'



const Taskcard = ({ t }) => {

  const dispatch = useDispatch()


  const NEW = 'NEW'
  const IN_PROGRESS = 'IN_PROGRESS'
  const BLOCKED = 'BLOCKED'
  const DONE = 'DONE'

    const buttonName = (name) => {
      switch (name) {
        case NEW: {
          return (
            <div>
              <div>
                <button
                  type="button"
                  className="border shadow-lg rounded font-bold p-2 "
                  onClick={(e) => {
                    dispatch(changeStatus(t.title,e.target.textContent))
                  }}
                >
                  {IN_PROGRESS}
                </button>
              </div>
            </div>
          )
        }
        case IN_PROGRESS: {
          return (
            <div>
              <button
                type="button"
                className="border shadow-lg rounded font-bold p-2"
                onClick={(e) => {
                  dispatch(changeStatus(t.title, e.target.textContent))
                }}
              >
                {BLOCKED}
              </button>
              <button
                type="button"
                className="border shadow-lg rounded font-bold p-2"
                onClick={(e) => {
                  dispatch(changeStatus(t.title, e.target.textContent))
                }}
              >
                {DONE}
              </button>
            </div>
          )
        }
        case BLOCKED: {
          return (
            <div>
              <div>
                <button
                  type="button"
                  className="border shadow-lg rounded font-bold p-2"
                  onClick={(e) => {
                    dispatch(changeStatus(t.title, e.target.textContent))
                  }}
                >
                  {IN_PROGRESS}
                </button>
              </div>
            </div>
          )
        }
        default: {
          return name
        }
      }
    }

  return (
    <div className="task flex flex-col justify-between bg-indigo-80 font-bold text-black rounded-lg border shadow-lg p-10 h-64 w-64">
      <div className="task__title"> {t.title} </div>
      <div className="task__id">{t.taskId}</div>
      <div className="task__status">{t.status}</div>
      <div>{buttonName(t.status)}</div>
    </div>
  )
}

Taskcard.propTypes = {}

export default React.memo(Taskcard)
