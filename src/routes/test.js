import React, { useState, useEffect } from 'react'

export default function Test() {
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()

  const print = () => {
    console.log(startTime)
    console.log(endTime)

    let startHour = parseInt(startTime.substr(0, 2))
    let startMin = parseInt(startTime.substr(3, 5))

    let endHour = parseInt(endTime.substr(0, 2))
    let endMin = parseInt(endTime.substr(3, 5))

    console.log(startHour + ':' + startMin)
    console.log(endHour + ':' + endMin)
  }

  return (
    <div>
      <input
        type='time'
        onChange={(event) => {
          setStartTime(event.target.value)
        }}
      />
      <input
        type='time'
        onChange={(event) => {
          setEndTime(event.target.value)
        }}
      />
      <button onClick={print}>Something</button>
    </div>
  )
}
