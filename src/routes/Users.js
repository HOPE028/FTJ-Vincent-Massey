import React, { useState, useEffect, lazy, Suspense } from 'react'
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
      setLog(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    } else {
      setCurrentLog(null)
      setLog([])
    }
  }

  return (
    <div>
      {currentLog != null && <DisplayLog currentLog={currentLog} log={log} />}
      <h1>Members:</h1>

      <input
        type='text'
        placeholder='Search...'
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <div className='container'>
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
              <div key={user.id} className='box-black flex container'>
                <h2>{user.name}</h2>
                <h4>
                  Grade: {user.grade} | Role: {user.role} | Hours: {user.hours}{' '}
                  | Pronouns: {user.pronouns} | Contact: {user.contact}
                </h4>
                <button onClick={() => checkUserLog(user)}>
                  {user == currentLog ? '✅ ' : ''}
                  Member Log
                </button>
              </div>
            )
          })}
      </div>
    </div>
  )
}

class DisplayLog extends React.Component {
  render() {
    return (
      <div>
        <h2>Viewing {this.props.currentLog.name}'s Log</h2>
        {this.props.log.map((event) => {
          return (
            <div key={event.id}>
              <h4>
                Hours: {event.hours} | Date: {event.date} | Time:{' '}
                {event.startTime} - {event.endTime}
              </h4>
            </div>
          )
        })}
      </div>
    )
  }
}
