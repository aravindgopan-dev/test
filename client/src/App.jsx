import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Create from './pages/Create'
import Story from './pages/Story'
import Allstories from './pages/Allstories'
import Profile from './pages/Profile'
import Buy from './pages/Buy'
import Auth from './pages/auth'

function App() {
  return (
    <Routes>
      <Route element={<Auth></Auth>}>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/create' element={<Create></Create>}></Route>
        <Route path='/story/:storyId' element={<Story></Story>}></Route>
        <Route path='/feed' element={<Allstories></Allstories>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/buy-credits' element={<Buy></Buy>}></Route>
      </Route>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>

    </Routes>

  )
}

export default App