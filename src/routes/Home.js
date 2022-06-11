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
      <h4>Which Page Would You Like To Open?</h4>
      <button onClick={() => setOpenLink('Members')}>
        Members Page
        <div className='smallText'>{openLink == 'Members' ? '✅' : ''}</div>
      </button>
      <button onClick={() => setOpenLink('Members-Control')}>
        Members-Control Page
        <div className='smallText'>
          {openLink == 'Members-Control' ? '✅' : ''}
        </div>
      </button>
      <button onClick={() => setOpenLink('Events')}>
        Events Page
        <div className='smallText'>{openLink == 'Events' ? '✅' : ''}</div>
      </button>
      {openLink == 'Members' && <Users />}
      {openLink == 'Members-Control' && <User_Control />}
      {openLink == 'Events' && <Events />}
    </div>
  )
}
