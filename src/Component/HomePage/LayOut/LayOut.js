import React from 'react'
// import Nav from '../Home/NavBar/Nav'
import Nav from '../NavBar/Nav'
import { Outlet } from 'react-router-dom'

export default function LayOut() {
  return (
    <div>
        <Nav/>
    <Outlet />
    </div> 
  )
}
