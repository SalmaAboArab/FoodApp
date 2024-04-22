import React, { useState } from 'react'
import logo from '../../../assets/imgs/login-logo.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../../Constants/URLs';

export default function Login({saveAdminData}) {
  const navigate=useNavigate();
  const [toggle, setToggle] = useState(false);
  let password;
  const {register,handleSubmit,formState:{errors},watch}=useForm();

  password = watch("password", "");


  const onSubmit=async(data)=>{
    // axios.post("https://upskilling-egypt.com:443/api/v1/Users/Login",data)
    // .then((response)=>{
    //   localStorage.setItem("adminToken",response.data.token)
    //   saveAdminData()
    //   setTimeout(toast.success('Success'),500)
    //   navigate('/dashboard')
    // }).catch((error)=>{
    //   toast.error(error.response.data.message)
    // })
    try{
      // console.log(data);
      
      let response=await axios.post(`${baseUrl}/Users/Login`,data);
      localStorage.setItem("adminToken",response.data.token)
      saveAdminData()
      toast.success('Login Success')
      navigate('/dashboard')
    } catch(error){
      // console.log(error);
      toast.error(error?.message||'Something went wrong!')
    }
  }
  return (
    // <div className='Auth-container vh-100 '>
    //     <div className="overlay vh-100 container-fluid">
           
    //     </div>
    // </div>
    <div className="row justify-content-center align-items-center vh-100">
    <div className="col-md-5">
    <div className="login bg-white rounded-4 px-5 py-4">
      <div className="logo-container text-center mb-3">
      <img src={logo} alt="food-logo" className='w-50' />
      </div>
        <h4 className='fw-bold maintext'>Log In</h4>
        <p className='text-muted secondtext'>Welcome Back! Please enter your details</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group flex-column flex-nowrap my-4 ">
            <div className='d-flex my-1 inputdetails'>
              <span className="input-group-text border-0 p-3" id="addon-wrapping">
              <i className='fa fa-mobile-screen'></i>
            </span>
            <input type="text" 
            className=" form-control border-0 " 
            placeholder="Enter your E-mail" 
            aria-label="Username" aria-describedby="addon-wrapping"
            {...register('email',
            {required:"Email is required",
            pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message:'Email is not valid'}})}
            />
            </div>
            {errors.email&&<span className='alert alert-danger'>{errors.email.message}</span>}
            </div>

          <div className="input-group flex-column flex-nowrap mb-1">
            <div className='d-flex my-1 inputdetails'>
            <span className="input-group-text border-0 p-3" id="addon-wrapping">
            <i className='fa fa-lock'></i>
            </span>
            <input type={toggle ? "text" : "password"} 
            className="form-control border-0 " 
            placeholder="Password"
            //  aria-label="Username" aria-describedby="addon-wrapping"
            {...register('password',
            {required:"Password is required",
            pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            message:'password is not valid'}})}
            />
            </div>
            {errors.password&&<span className='alert alert-danger'>{errors.password.message}</span>}

            </div>
          

            <div className="d-flex justify-content-between mt-2">
              <Link to="/register" className='text-black nounderline'>Register Now?</Link>
              <Link to="/forgot-pass" className='text-success nounderline'>Forgot Password?</Link>
            </div>

            <button className='btn btn-success w-100 mt-5 mb-3'>Login</button>

        </form>
    </div>
    </div>
   </div>
  )
}
