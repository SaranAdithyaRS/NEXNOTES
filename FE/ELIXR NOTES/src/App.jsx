import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/HOME/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Intro from './pages/Intro'


const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

    </BrowserRouter>

  )
}

export default App
