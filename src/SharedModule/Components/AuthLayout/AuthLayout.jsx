import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className='Auth-container vh-100'>
        <div className="overlay vh-100 container-fluid">
        <Outlet/>
        </div>
    </div>
    
  )
}
