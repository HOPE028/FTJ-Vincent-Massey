import React, { useState, useEffect } from 'react'
import { db } from '../firebase-config'
import { collection, getDocs } from 'firebase/firestore'

export default function Users() {
  //Users
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, 'Users')

  //Log
  const [log, setLog] = useState([])
  const [currentLog, setCurrentLog] = useState()

  //Search
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers()
  }, [])

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

  return (
    <div>
      <h1>Members:</h1>

      <input
        type='text'
        placeholder='Search...'
        onChange={(event) => setSearchValue(event.target.value)}
      />

      {log.map((event) => {
        return (
          <div key={event.id}>
            <h3>
              {event.hours} | {event.date} | {event.startTime} - {event.endTime}
            </h3>
          </div>
        )
      })}

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
              <h1>{user.name}</h1>
              <h3>
                Grade: {user.grade} | Role: {user.role} | Hours: {user.hours} |
                Pronouns: {user.pronouns} | Contact: {user.contact}
              </h3>
              <button onClick={() => checkUserLog(user)}>
                {user == currentLog ? '✅ ' : ''}
                Member Log
              </button>
            </div>
          )
        })}
    </div>
  )
}
