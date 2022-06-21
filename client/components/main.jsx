import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getTasks, addTasks } from '../redux/reducers/tasks'
import Taskcard from './taskcard'

const Main = () => {
  const dispatch = useDispatch()
  const task = useSelector((store) => store.tasks.tasks)

  useEffect(() => {
    dispatch(getTasks())
  }, [])

return (
  <div className="flex flex-col justify-between">
    <div>
      <input
        className="border"
        type="text"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            dispatch(addTasks(event.target.value))
            event.target.value = ""
          }
        }}
      />
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
