import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { changeStatus, deleteTask, renameTasks } from '../redux/reducers/tasks'

const Taskcard = ({ t }) => {
  const dispatch = useDispatch()
  const [buttonEdit, setButtonEdit] = useState('untoggled')
  const [newTaskName, setTaskName] = useState(t.title)

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
                  dispatch(changeStatus(t.taskId, e.target.textContent))
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
                dispatch(changeStatus(t.taskId, e.target.textContent))
              }}
            >
              {BLOCKED}
            </button>
            <button
              type="button"
              className="border shadow-lg rounded font-bold p-2"
              onClick={(e) => {
                dispatch(changeStatus(t.taskId, e.target.textContent))
                dispatch(deleteTask(t.taskId))
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
                  dispatch(changeStatus(t.taskId, e.target.textContent))
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
      <div>
        {buttonEdit === 'untoggled' && (
          <div className="task__title">
            {t.title}
            <button
              type="button"
              className="border shadow-lg rounded font-bold p-2"
              onClick={() => {
                setButtonEdit('toggled')
                setTaskName(t.title)
              }}
            >
              Edit
            </button>
          </div>
        )}
        {buttonEdit === 'toggled' && (
          <div>
            <input
              className="border"
              type="text"
              value={newTaskName}
              onChange={(e) => {
                setTaskName(e.target.value)
              }}
            />
            <button
              type="button"
              className="border shadow-lg rounded font-bold p-2"
              onClick={() => {
                setButtonEdit('untoggled')
                if (t.title !== newTaskName) {
                dispatch(renameTasks(t.taskId, newTaskName))
                }
                setTaskName('')
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="task__id">{t.taskId}</div>
      <div className="task__status">{t.status}</div>
      <div>{buttonName(t.status)}</div>
    </div>
  )
}

Taskcard.propTypes = {}

export default React.memo(Taskcard)
