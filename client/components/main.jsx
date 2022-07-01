import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getTasks, addTasks } from '../redux/reducers/tasks'
import Taskcard from './taskcard'

const Main = () => {
  const dispatch = useDispatch()
  const task = useSelector((store) => store.tasks.tasks)

  useEffect(() => {
    dispatch(getTasks())
  }, [])

  const [newTask, setNewTask] = useState('')

return (
  <div className="flex flex-col justify-between">
    <div>
      <input
        className="border"
        type="text"
        value = {newTask}
        onChange={(e) => setNewTask(e.target.value)}
        /*      onKeyDown={(event) => {
          if (event.key === 'Enter') {
            dispatch(addTasks(event.target.value))
            event.target.value = ""
            dispatch(getTasks())
          }
        }} */
      />
      <button
        type="button"
        className="border shadow-lg rounded font-bold p-2"
        onClick={() => {
          dispatch(addTasks(newTask))
          setNewTask('')
        }}
      >
        Add
      </button>
    </div>
    <div>
      {Object.entries(task).map((t) => {
        return (
          <div key={t[0]}>
            <Taskcard t={t[1]} />
          </div>
        )
      })}
    </div>
  </div>
)
}

Main.propTypes = {}

export default React.memo(Main)
