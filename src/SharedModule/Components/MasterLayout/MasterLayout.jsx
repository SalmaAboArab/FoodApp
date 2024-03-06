import React from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

export default function MasterLayout({adminData}) {
  return (
        <>
        <div className="d-flex">
        <div className=" sdbar">
                <SideBar loginData={adminData}/>
            </div>
            <div className="w-100 mx-2 vh-100 pageOverflow overflow-auto">
                <NavBar adminData={adminData}/>
                <Outlet/>
            </div>
        </div>
        </>
  )
}
