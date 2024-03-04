import React from 'react'
import logo from '../../../assets/imgs/login-logo.png'
export default function NotFound() {
  return (
    <div className="vh-100 notfound ">
      <div className="vh-100 bg2">
        <div className="logo"><img src={logo} alt="logo" className='px-5 py-4'/></div>
        <div className=' row  h-50 w-50 justify-content-center align-items-center mt-5'>
        <div className='col-md-8 ps-5 pt-5 me-4 mt-5 bg-white rounded-3 '>
        <h1 className='fw-bold '>Oops.</h1>
          <h2 className='text-success'>Page  not found </h2>
          <i className='fas fa-ellipsis-h text-black fs-4'></i>
          <p className='mb-0 text-black fs-5'>This Page doesn’t exist or was removed!</p>
          <p className='text-black fs-5'>We suggest you  back to home.</p>
        </div>
        <div className='col-md-7'>
          <a className='btn btn-success px-5 py-3 w-75' href='/dashboard'><div><i className='fa fa-arrow-left '></i> <span className='ps-2 bg-transparent fw-bold '>Back To Home</span></div></a>
        </div>
        </div>
      </div>
    </div>
  )
}

