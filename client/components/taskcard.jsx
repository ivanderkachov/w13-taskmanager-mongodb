import React from 'react'

const buttonName = (name) => {
  switch (name) {
    case 'new': {
      return 'new'
    }
    case 'in_progress': {
      return 'in_progress'
    }
    default: {
      return name
    }
  }
}

const Taskcard = ({t}) => {


  return (
    <div className="task bg-indigo-80 font-bold text-black rounded-lg border shadow-lg p-10 h-48 w-48">
      <div className="task__title"> {t.title} </div>
      <div className="task__id">{t.taskId}</div>
      <div className="task__status">{t.status}</div>
      <div><button type="button" className = "border shadow-lg rounded font-bold h-10 w-10">{buttonName(t.status)}</button></div>
    </div>
  )
}



Taskcard.propTypes = {}

export default React.memo(Taskcard)
