import React, { useState } from 'react'
import logo from '../../../assets/imgs/login-logo.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function VerifyUserAccount() {

    const navigate=useNavigate();
    const {register,handleSubmit,formState:{errors}}=useForm({});
    let userEmail=localStorage.getItem('userEmail');

    const onSubmit=async(data)=>{
        
      try{
        let response=await axios.put("https://upskilling-egypt.com:443/api/v1/Users/verify",
        {
            "email": userEmail,
            "code": data.code
        });
        localStorage.removeItem('userEmail');
        toast.success('Account has been verified successfully')
        navigate('/login')
      } catch(error){
        toast.error(error?.message||'Somthing is wrong')
      }
    }
    return (
        <div className="row justify-content-center align-items-center vh-100">
<div className="col-md-5">
<div className="login bg-white rounded-4 px-5 py-4">
  <div className="logo-container text-center mb-3">
  <img src={logo} alt="food-logo" className='w-50' />
  </div>
    <h4 className='fw-bold maintext'> Verify Account</h4>
    <p className='text-muted secondtext'>Please Enter Your code or Check Your Inbox</p>
    <form onSubmit={handleSubmit(onSubmit)}>

      
      <div className="input-group flex-column flex-nowrap mb-1">
        <div className='d-flex my-1 inputdetails'>
        <span className="input-group-text border-0 p-3" id="addon-wrapping">
        <i className='fa fa-lock'></i>
        </span>
        <input type="text" 
        className="form-control border-0 " 
        placeholder="Code"
        {...register('code',
        {required:"code is required",
        pattern:{value:/^[a-zA-Z0-9]{4}$/,
        message:'code is not valid'}})}
        />
        </div>
        {errors.code&&<p className='text-danger'>{errors.code.message}</p>}

        </div>

        <button className='btn btn-success w-100 mt-4 mb-3'>Submit</button>

    </form>
</div>
</div>
</div>
      )
}
