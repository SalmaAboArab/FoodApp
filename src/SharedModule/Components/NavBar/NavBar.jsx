import React, { useEffect, useState } from 'react'
import avatar from "../../../assets/imgs/Avatar.png"
import axios from 'axios';

export default function NavBar({adminData}) {
  let token=localStorage.getItem("adminToken");
  const [CurruntUser,setCurruntUser]=useState(null)
  const getuser=async()=>{
    try{
      let response=await axios.get("https://upskilling-egypt.com:443/api/v1/Users/currentUser",
      {headers:{Authorization:token}});
   
      setCurruntUser(response?.data);
      // console.log(response?.data);
      // setIsLoading(false);
    }catch(error){
      // console.log(error.message);
    }
  }

  useEffect(()=>{
    getuser();
  },[])
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary mx-4 my-4 rounded-4 p-2 ">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <form className="d-flex w-75 " role="search">
      <span className='bg-white ps-3 pe-1 pt-1 rounded-start-5'><i className='fa fa-search'></i></span>
        <input className="form-control me-2 border-0 rounded-start-0 rounded-end-4" type="search" placeholder="Search" aria-label="Search"/>
        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
      </form>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <div className="userimg"><img src={CurruntUser?.imagePath?`https://upskilling-egypt.com/${CurruntUser?.imagePath}`:avatar} alt="" /></div>
        </li>
      </ul>
      <ul className="navbar-nav ms-1 mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link text-black" href="#">{adminData?.userName}</a>
        </li>
      </ul>
      <i className='ms-3 fa fa-bell'></i>
      
    </div>
  </div>
</nav>
    </>
  )
}