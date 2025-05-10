import { useState } from 'react'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'
const router =createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <NavBar/>
        <Home/>
        
        </div>
    },
    {
      path:"/paste",
      element:
      <div>
        <NavBar/>
        <Paste/>
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <NavBar/>
        <ViewPaste/>
      </div>
    }
  ]
)

function App() {


  return (
    <>
      <RouterProvider router={router}/>
      

    </>
  )
}

export default App
