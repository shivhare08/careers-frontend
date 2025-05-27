import { useState } from 'react'


import Signup from './pages/Signup'
import Home from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import About from './pages/About'
import Contact from './pages/Contact'
import Notification from './pages/Notification'
import Jobs from './pages/Jobs'
import Profile from './pages/Profile'
import Model from './components/Model'
import Myapplication from './pages/Myapplication'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/' element={<Signin/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/notification' element={<Notification/>}></Route>
          <Route path='/jobs' element={<Jobs/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/myapplication' element={<Myapplication/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
