import React, { useState, useEffect } from 'react'
import { db } from '../firebase-config'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

export default function User_Control() {
  //add members
  const [newName, setNewName] = useState('')
  const [newGrade, setNewGrade] = useState(0)
  const [newRole, setNewRole] = useState()
  const [newHours, setNewHours] = useState(0)
  const [newContact, setNewContact] = useState()
  const [newProNouns, setNewProNouns] = useState()

  //Users
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, 'Users')

  //Search
  const [searchValue, setSearchValue] = useState('')

  //Change Member Info
  const [userBeingUpdated, setUserBeingUpdated] = useState(false)
  const [currentUserBeingUpdated, setCurrentUserBeingUpdated] = useState()
  const [updatedName, setUpdatedName] = useState('')
  const [updatedGrade, setUpdatedGrade] = useState()
  const [updatedRole, setUpdatedRole] = useState()
  const [updatedHours, setUpdatedHours] = useState(0)
  const [updatedContact, setUpdatedContact] = useState()
  const [updatedProNouns, setUpdatedProNouns] = useState()

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers()
  }, [])

  const deleteUser = async (user) => {
    if (window.confirm(`Delete ${user.name}'s account?`)) {
      const userDoc = doc(db, 'Users', user.id)
      await deleteDoc(userDoc)
      window.location.reload(false)
    }
  }

  const addUser = async () => {
    if (
      !test_AnythingNull(
        newName,
        newRole,
        newGrade,
        newHours,
        newContact,
        newProNouns
      )
    )
      return

    const document = await addDoc(usersCollectionRef, {
      name: newName,
      grade: Number(newGrade),
      role: newRole,
      hours: Number(newHours),
      pronouns: newProNouns,
      contact: newContact,
    })
    const newCollectionRef = collection(db, 'Users', document.id, 'Log')

    await addDoc(newCollectionRef, {
      hours: Number(0),
      date: 'Date Added',
    })
    window.location.reload(false)
  }

  const changeMemberInfo = (user) => {
    if (user != currentUserBeingUpdated) {
      setCurrentUserBeingUpdated(user)
      setUserBeingUpdated(true)
    } else {
      setCurrentUserBeingUpdated(null)
      setUserBeingUpdated(false)
    }
  }

  const updateUser = async (number) => {
    if (
      !test_AnythingNull(
        updatedName,
        updatedRole,
        updatedGrade,
        updatedHours,
        updatedContact,
        updatedProNouns
      )
    )
      return

    setUserBeingUpdated(false)

    const userDoc = doc(db, 'Users', currentUserBeingUpdated.id)
    const newFields = {
      name: updatedName,
      role: updatedRole,
      grade: Number(updatedGrade),
      hours: Number(updatedHours),
      contact: updatedContact,
      pronouns: updatedProNouns,
    }
    await updateDoc(userDoc, newFields)
    window.location.reload(false)
  }

  //Error Checking / Security logic

  const test_AnythingNull = (name, role, grade, hours, contact, proNouns) => {
    if (
      name == null ||
      role == null ||
      grade == null ||
      hours == null ||
      contact == null ||
      proNouns == null
    ) {
      alert('Please Fill In All The Inputs')
      return false
    }
    if (
      name == '' ||
      role == '' ||
      grade == 0 ||
      contact == '' ||
      proNouns == ''
    ) {
      alert('Please Fill In All The Inputs')
      return false
    }
    return true
  }

  return (
    <div>
      <div>
        <h3>Add New Member</h3>
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
          placeholder='Starting Hours...'
          type='number'
          onChange={(event) => setNewHours(event.target.value)}
        />
        <input
          placeholder='Contact Information...'
          onChange={(event) => setNewContact(event.target.value)}
        />
        <input
          placeholder='Pro Nouns...'
          onChange={(event) => setNewProNouns(event.target.value)}
        />

        <button onClick={addUser}>Add Member</button>
      </div>

      {userBeingUpdated ? (
        <UpdateUserInfo
          updateUser={updateUser}
          updatedName={setUpdatedName}
          updatedHours={setUpdatedHours}
          updatedRole={setUpdatedRole}
          updatedGrade={setUpdatedGrade}
          updatedContact={setUpdatedContact}
          updatedProNouns={setUpdatedProNouns}
          name={currentUserBeingUpdated.name}
        />
      ) : (
        ''
      )}

      <h3>Existing Members</h3>

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
              <h1>{user.name}</h1>
              <button onClick={() => changeMemberInfo(user)}>
                {user == currentUserBeingUpdated ? '✅ ' : ''}
                Change Member Information
              </button>
              <button onClick={() => deleteUser(user)}>Delete Member</button>
            </div>
          )
        })}
    </div>
  )
}

class UpdateUserInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3>Please Fill In Everything</h3>
        <h4>Updating {this.props.name}'s account</h4>

        <input
          placeholder='Updated Name...'
          onChange={(event) => this.props.updatedName(event.target.value)}
        />
        <input
          placeholder='Updated Role...'
          onChange={(event) => this.props.updatedRole(event.target.value)}
        />
        <input
          placeholder='Updated Grade...'
          type='number'
          onChange={(event) => this.props.updatedGrade(event.target.value)}
        />
        <input
          placeholder='Updated Hours...'
          type='number'
          onChange={(event) => this.props.updatedHours(event.target.value)}
        />
        <input
          placeholder='Updated Contact...'
          onChange={(event) => this.props.updatedContact(event.target.value)}
        />
        <input
          placeholder='Updated Pro Nouns...'
          onChange={(event) => this.props.updatedProNouns(event.target.value)}
        />

        <button
          onClick={() => {
            this.props.updateUser(5)
          }}
        >
          Update User
        </button>
      </div>
    )
  }
}
