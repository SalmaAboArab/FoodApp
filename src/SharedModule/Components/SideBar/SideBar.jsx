import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from '../../../assets/imgs/sidebar.png'
import Modal from 'react-bootstrap/Modal';
import ChangePass from '../../../AuthModule/Components/Change-Password/ChangePass';


export default function SideBar({loginData}) {
  const [isCollapsed,setIsCollapsed]=useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleCollapsed=()=>{
    setIsCollapsed(!isCollapsed);
  }
  let navigate=useNavigate();
  let logout=()=>{
    localStorage.removeItem("adminToken");
    navigate('/login')
  }
  return (
    <div className='sidebar-container'>
      <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Body>
          <ChangePass handleClose={handleClose}/>
        </Modal.Body>
    
      </Modal>

<Sidebar collapsed={isCollapsed}>
  <Menu>
<div className='togglebtn'>
<MenuItem onClick={toggleCollapsed} icon={<img src={logo} className=''/>} >  </MenuItem>
  </div>  
  <div className='sidebarbtns mt-5'>
  <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard" />}> Home</MenuItem>
  {loginData?.userGroup=='SuperAdmin'?
    <MenuItem icon={<i className='fa fa-users'></i>} component={<Link to="/dashboard/users" />}> Users</MenuItem>
:''}
    <MenuItem icon={<i className='fa fa-receipt'></i>} component={<Link to="/dashboard/recipes" />}> Recipes</MenuItem>
    {loginData?.userGroup=='SuperAdmin'?
    <MenuItem icon={<i className='fa fa-calendar-days'></i>} component={<Link to="/dashboard/categories" />}> Categories</MenuItem>
  :''}
  {loginData?.userGroup=='SuperAdmin'?''
  :<MenuItem icon={<i className='fa fa-heart'></i>} component={<Link to="/dashboard/favorites" />}> Favorites</MenuItem>
  }
    <MenuItem icon={<i className='fa fa-lock-open'></i>} onClick={handleShow}> Change Password</MenuItem>
    <MenuItem icon={<i className='fa fa-right-from-bracket'></i>} onClick={logout}> Logout</MenuItem>
  </div>
  </Menu>
</Sidebar>
    </div>
  )
}
