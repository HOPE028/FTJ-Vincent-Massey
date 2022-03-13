import React, { useState, useEffect } from 'react'
import Users from './Users'
import User_Control from './User-Control'
import Events from './Event'

export default function Home() {
  const [openLink, setOpenLink] = useState('')

  useEffect(() => {
    document.title = 'FTJ - VMC'
  }, [])

  return (
    <div className='container'>
      <h1>Welcome To FTJ!</h1>
      <h4>Click On Button To Open Page:</h4>
      <button onClick={() => setOpenLink('Members')}>Members Page</button>
      <button onClick={() => setOpenLink('Members-Control')}>
        Members-Control Page
      </button>
      <button onClick={() => setOpenLink('Events')}>Events Page</button>

      {openLink == 'Members' && <Users />}
      {openLink == 'Members-Control' && <User_Control />}
      {openLink == 'Events' && <Events />}
    </div>
  )
}
