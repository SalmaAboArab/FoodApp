import React from 'react'

export default function Header({main,title,description,img}) {
  return (
    <div className='container-fluid headercontainer p-4'>
      <div className="row justify-content-between align-items-center container ">
        <div className="col-md-5 text-white">
          <div className="header-content ps-4">
            <h2 className='fw-bold'>{main} <span className='bg-transparent fw-normal'>{title}</span></h2>
            <p className='text-white'>{description}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="header-img text-end">
            <img src={img} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
