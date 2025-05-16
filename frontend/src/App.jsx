import { useState } from 'react'
import './App.css'
import Register from './Pages/Register'
import { Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home.jsx"
import Create from './Pages/Create.jsx'
import EditCode from './Pages/EditCode.jsx'
import YourCodes from './Pages/YourCodes.jsx'
import NoPageFound from './Pages/NoPageFound.jsx'
import useAuth from './Hooks/useAuth.js'
import ProtectedRoutes from './Pages/ProtectedRoutes.jsx'
import Profile from './Pages/Profile.jsx'
import ViewCode from './Pages/ViewCode.jsx'

function App() {
  const {user} = useAuth();
  return (
    <>
    <Routes>
      {/* Public routes */}
      <Route path='/login' element={<Register/>}/>
      <Route path='*' element={<NoPageFound/>}/>
      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoutes/>}>
        <Route path ="" element={<Home/>}/>
        <Route path='create' element={<Create/>}/>
        <Route path='edit/:id' element={<EditCode/>}/>
        <Route path='snippet/:id' element={<ViewCode/>}/>
        <Route path='yourCodes/' element={<YourCodes/>}/>
        <Route path='profile' element={<Profile/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
