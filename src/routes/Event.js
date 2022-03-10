import React, { useState, useEffect } from 'react'
import { db } from '../firebase-config'
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore'

export default function Event() {
  //add hours to theirs
  // const [newLength, setNewLength] = useState(0)
  const [newDate, setNewDate] = useState()
  const [newStartTime, setNewStartTime] = useState(0)
  const [newEndTime, setNewEndTime] = useState(0)

  //members to be added
  const [eventMemebers, setEventMembers] = useState([])

  //users
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, 'Users')

  //Search
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers()
  }, [])

  const eventMembersControl = (user) => {
    if (eventMemebers.includes(user)) {
      const temp = eventMemebers.filter((member) => member != user)
      setEventMembers(temp)
    } else {
      setEventMembers((member) => [...member, user])
    }
  }

  const newEvent = async () => {
    if (!test_AnythingNull()) return

    const length = getLength()

    if (!test_LengthEnough(length)) return

    for (let a = 0; a < eventMemebers.length; a++) {
      let currentUserLogRef = `Users/${eventMemebers[a].id}/Log`
      let currentCollectionRef = collection(db, currentUserLogRef)

      const userDoc = doc(db, 'Users', eventMemebers[a].id)
      const newFields = {
        hours: Number(eventMemebers[a].hours) + Number(length / 60),
      }
      await updateDoc(userDoc, newFields)

      await addDoc(currentCollectionRef, {
        hours: Number(length / 60),
        date: newDate,
        startTime: newStartTime,
        endTime: newEndTime,
      })
    }
    window.location.reload(false)
  }

  const addEveryOneToEvent = () => {
    setEventMembers([])
    for (let a = 0; a < users.length; a++) {
      setEventMembers((member) => [...member, users[a]])
    }
  }

  const getLength = () => {
    const hourDifference =
      (parseInt(newEndTime.substr(0, 2)) -
        parseInt(newStartTime.substr(0, 2))) *
      60
    const minDifference =
      parseInt(newEndTime.substr(3, 5)) - parseInt(newStartTime.substr(3, 5))

    return hourDifference + minDifference
  }

  //Error Checking / Security logic

  const test_AnythingNull = () => {
    if (newDate == null || newStartTime == null || newEndTime == null) {
      alert('Please Fill In All The Inputs')
      return false
    } else if (eventMemebers.length == 0) {
      alert('Pick At Least One Member For The Event')
      return false
    }
    return true
  }

  const test_LengthEnough = (length) => {
    if (length < 1) {
      alert(
        'Make sure the time difference between the start and the end is greater Than 1 minute'
      )
      return false
    }
    return true
  }

  return (
    <div>
      <h1>Enter new Event</h1>

      <div>
        {/* <p>Length Of The Event</p>
        <input
          type='number'
          placeholder='Length...'
          onChange={(event) => setNewLength(event.target.value)}
        /> */}
        <p>The Date Of The Event</p>
        <input
          type='date'
          placeholder='Date...'
          onChange={(event) => setNewDate(event.target.value)}
        />
        <p>The Start Time Of The Event</p>
        <input
          type='time'
          placeholder='Time...'
          onChange={(event) => setNewStartTime(event.target.value)}
        />
        <p>The End Time Of The Event</p>
        <input
          type='time'
          placeholder='Time...'
          onChange={(event) => setNewEndTime(event.target.value)}
        />
        <p>
          <b>
            <i>**Fill In Everything BEFORE submitting**</i>
          </b>
        </p>
        <button onClick={newEvent}>Add Event</button>
      </div>

      <div>
        <h4>Add Members To It</h4>
        {eventMemebers.map((user) => {
          return (
            <div key={user.id}>
              <p>{user.name}</p>
            </div>
          )
        })}
        <button onClick={addEveryOneToEvent}>ALL</button>
        <input
          type='text'
          placeholder='Search...'
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <button onClick={() => setEventMembers([])}>Remove ALL</button>
        {users
          .filter((user) => {
            if (searchValue == '') {
              return user
            } else if (
              user.name.toLowerCase().includes(searchValue.toLowerCase())
            ) {
              return user
            }
          })
          .map((user) => {
            return (
              <div key={user.id}>
                <button
                  onClick={() => {
                    eventMembersControl(user)
                  }}
                >
                  {eventMemebers.includes(user) ? '✅ ' : ''}
                  {user.name}
                </button>
              </div>
            )
          })}
      </div>
    </div>
  )
}
