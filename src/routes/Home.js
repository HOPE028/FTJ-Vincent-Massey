import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>Welcome To FTJ!</h1>

      <h3>Click On Memebers To See How Many Hours You Have Logged So Far!</h3>

      <Link to='/members'>Members</Link>
      {' | '}
      <Link to='/members-control'>Members-Control</Link>
      {' | '}
      <Link to='/event'>Event</Link>
    </div>
  )
}
