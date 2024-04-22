import React from 'react'
import logo from '../../../assets/imgs/login-logo.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../../Constants/URLs';


export default function ForgotPass() {
  const navigate=useNavigate();
  const {register,handleSubmit,formState:{errors}}=useForm();

  const onSubmit=async(data)=>{
    try{
      let response=await axios.post(`${baseUrl}/Users/Reset/Request`,data);
      toast('Check your email please')
      navigate('/resetpass')
    } catch(error){
      toast.error(error?.response?.data?.message||'An unexpected error occurred')
    }}
    return (
      <div className='Auth-container vh-100 '>
          <div className="overlay vh-100 container-fluid ">
             <div className="row justify-content-center align-items-center vh-100">
              <div className="col-md-5">
              <div className="login bg-white rounded-4 px-5 py-4">
                <div className="logo-container text-center mb-3">
                <img src={logo} alt="food-logo" className='w-50' />
                </div>
                  <h5 className='maintext fw-bold '>Forgot Your Password?</h5>
                  <p className='secondtext text-muted'>No worries! Please enter your email and we will send a password reset link </p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group flex-column flex-nowrap my-4 ">
                      <div className='d-flex my-3 inputdetails'>
                        <span className="input-group-text border-0 p-3" id="addon-wrapping">
                        <i className='fa fa-envelope'></i>
                      </span>
                      <input type="text" 
                      className=" form-control border-0 " 
                      placeholder="Enter your E-mail" 
                      // aria-label="Username" aria-describedby="addon-wrapping"
                      {...register('email',
                      {required:"Email is required",
                      pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message:'Email is not valid'}})}
                      />
                      </div>
                      {errors.email&&<span className='alert alert-danger'>{errors.email.message}</span>}
                      </div>
    
  
                      <button className='btn btn-success w-100 mt-5 mb-4'>Submit</button>
  
                  </form>
              </div>
              </div>
             </div>
          </div>
      </div>
    )  
}
