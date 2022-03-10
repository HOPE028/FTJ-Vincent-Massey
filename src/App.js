import React, { useState, useEffect } from 'react'
import { db } from './firebase-config'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { Route, Link } from 'react-router-dom'

function App() {
  //add members
  const [newName, setNewName] = useState('')
  const [newGrade, setNewGrade] = useState(0)
  const [newRole, setNewRole] = useState('')
  const [newHours, setNewHours] = useState(0)

  //add hours to theirs
  const [newLength, setNewLength] = useState(0)
  const [newDate, setNewDate] = useState()
  const [newTime, setNewTime] = useState()

  //users
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, 'Users')
  const [log, setLog] = useState([])

  //members of a specific event
  const [eventMemebers, setEventMembers] = useState([])

  //Search
  const [searchValue, setSearchValue] = useState('')

  //log
  const [currentLog, setCurrentLog] = useState()

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers()
  }, [])

  const addUser = async () => {
    const document = await addDoc(usersCollectionRef, {
      name: newName,
      grade: Number(newGrade),
      role: newRole,
      hours: Number(newHours),
    })
    const newCollectionRef = collection(db, 'Users', document.id, 'Log')

    await addDoc(newCollectionRef, {
      hours: Number(0),
      time: Date(),
    })
    window.location.reload(false)
  }

  const checkUserLog = async (user) => {
    if (currentLog != user) {
      setCurrentLog(user)
      const currentUserRef = await collection(db, `Users/${user.id}/Log`)
      const data = await getDocs(currentUserRef)
      console.log(data)
      setLog(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    } else {
      setCurrentLog(null)
      setLog([])
    }
  }

  const newEvent = async () => {
    for (let a = 0; a < eventMemebers.length; a++) {
      let currentUserLogRef = `Users/${eventMemebers[a].id}/Log`
      let currentCollectionRef = collection(db, currentUserLogRef)

      const userDoc = doc(db, 'Users', eventMemebers[a].id)
      const newFields = {
        hours: Number(eventMemebers[a].hours) + Number(newLength),
      }
      await updateDoc(userDoc, newFields)

      await addDoc(currentCollectionRef, {
        hours: Number(newLength),
        time: newDate + ' ' + newTime,
      })
    }
    window.location.reload(false)
  }

  const eventMembersControl = (user) => {
    if (eventMemebers.includes(user)) {
      const temp = eventMemebers.filter((member) => member != user)
      setEventMembers(temp)
    } else {
      setEventMembers((member) => [...member, user])
    }
  }

  const deleteUser = async (user) => {
    // confirm('You sure?')
    if (window.confirm(`Delete ${user.name}'s account?`)) {
      const userDoc = doc(db, 'Users', user.id)
      await deleteDoc(userDoc)
      window.location.reload(false)
    }
  }

  return (
    <div>
      <div>
        <input
          placeholder='Name...'
          onChange={(event) => setNewName(event.target.value)}
        />
        <input
          placeholder='Role...'
          onChange={(event) => setNewRole(event.target.value)}
        />
        <input
          placeholder='Grade...'
          type='number'
          onChange={(event) => setNewGrade(event.target.value)}
        />
        <input
          placeholder='Hours...'
          type='number'
          onChange={(event) => setNewHours(event.target.value)}
        />

        <button onClick={addUser}>Add User</button>
      </div>

      <div>
        <h4>Enter new Event</h4>
        {eventMemebers.map((user) => {
          return (
            <div key={user.id}>
              <h6>{user.name}</h6>
            </div>
          )
        })}

        <input
          type='number'
          placeholder='Length...'
          onChange={(event) => setNewLength(event.target.value)}
        />
        <input
          type='date'
          placeholder='Date...'
          onChange={(event) => setNewDate(event.target.value)}
        />
        <input
          type='time'
          placeholder='Time...'
          onChange={(event) => setNewTime(event.target.value)}
        />
        <button onClick={newEvent}>Add Event</button>

        <div>
          <input
            type='text'
            placeholder='Search...'
            onChange={(event) => setSearchValue(event.target.value)}
          />
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

      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <h3>
              Grade: {user.grade} | Role: {user.role} | Hours: {user.hours}
            </h3>
            <button onClick={() => checkUserLog(user)}>
              {user == currentLog ? '✅ ' : ''}
              User Log
            </button>
            <button onClick={() => deleteUser(user)}>Delete User</button>
          </div>
        )
      })}

      {log.map((event) => {
        return (
          <div key={event.id}>
            <h3>
              {event.hours} | {event.time}
            </h3>
          </div>
        )
      })}
    </div>
  )
}

export default App
