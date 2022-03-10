import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Home from './routes/Home'
import Event from './routes/Event'
import Users from './routes/Users'
import User_Control from './routes/User-Control'
import Test from './routes/test'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/event' element={<Event />}></Route>
      <Route path='/members' element={<Users />}></Route>
      <Route path='/members-control' element={<User_Control />}></Route>
      <Route path='/test' element={<Test />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
