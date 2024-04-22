import React, { useState } from 'react'
import logo from '../../../assets/imgs/login-logo.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../../Constants/URLs';

export default function ChangePass({handleClose}) {
    const [toggle, setToggle] = useState(false);
    
  let token=localStorage.getItem('adminToken')
    const navigate=useNavigate();
    const {register,handleSubmit,formState:{errors},watch,getValues,reset}=useForm({
        mode: "onTouched"
    });
   let password = watch("newPassword");
  
    const onSubmit=async(data)=>{
        // reset()

      try{
        let response=await axios.put(`${baseUrl}/Users/ChangePassword`,data,{headers:{Authorization:token}});
        toast.success(response.data.message)
        handleClose()
      } catch(error){
        toast.error(error?.response?.data?.message||'Something went wrong!')
      }
    }
  return (
    <>
    <div className="changpass-container row justify-content-center align-items-center">
              <div className="col-md-12">
              <div className="login bg-white rounded-4 px-5 py-4 bg-danger">
                <div className="logo-container text-end mb-3">
                <img src={logo} alt="food-logo" className='w-75' />
                </div>
                  <h5 className='fw-bold maintext'> Change Your Password</h5>
                  <p className='text-muted secondtext'>Enter your details below</p>
                  <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="input-group flex-column flex-nowrap my-2  ">
                      <div className='d-flex my-1 inputdetails'>
                        <span className="input-group-text border-0 p-3" id="addon-wrapping">
                        <i className='fa fa-lock'></i>
                      </span>
                      <input type={toggle ? "text" : "password"} 
                      className=" form-control border-0 " 
                      placeholder="Old Password" 
                      // aria-label="Username" aria-describedby="addon-wrapping"
                      {...register('oldPassword',
                      {required:"Old Password is required",
                      pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      message:'Old Password not valid'}})}
                      />
                      </div>
                      {errors.oldPassword&&<p className='text-danger'>{errors.oldPassword.message}</p>}
                      </div>
  

                      <div className="input-group flex-column flex-nowrap mb-1">
                      <div className='d-flex my-1 inputdetails pass'>
                      <span className="input-group-text border-0 p-3" id="addon-wrapping">
                      <i className='fa fa-lock'></i>
                      </span>
                      <input type={toggle ? "text" : "password"}
                      className="form-control border-0 pass" 
                      placeholder="New Password"
                      
                      //  aria-label="Username" aria-describedby="addon-wrapping"
                      {...register('newPassword',
                      {required:"New Password is required",
                      pattern:{value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message:'The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long'}})}
                      />
                      {/* <span className="input-group-text border-0 p-3 eye" id="addon-wrapping">
                      <i id="showpass" className="fa fa-eye " onClick={() => { setToggle1(!toggle1) }}></i>
                      </span> */}
                      </div>
                      {errors.newPassword&&<p className='text-danger'>{errors.newPassword.message}</p>}
  
                      </div>

                      <div className="input-group flex-column flex-nowrap mb-1">
                      <div className='d-flex my-1 inputdetails pass'>
                      <span className="input-group-text border-0 p-3" id="addon-wrapping">
                      <i className='fa fa-lock'></i>
                      </span>
                      <input type={toggle ? "text" : "password"} 
                      className="form-control border-0 " 
                      placeholder="Confirm New Password"
                      //  aria-label="Username" aria-describedby="addon-wrapping"
                      {...register('confirmNewPassword',
                      {required:"Confirm New Password is required",
                      validate: (value) => value === password||`Doesn't match new password`}
                   
                      )}
                      />
                      {/* <span className="input-group-text border-0 p-3 eye" id="addon-wrapping">
                      <i id="showpass" className="fa fa-eye" onClick={() => { setToggle2(!toggle2) }}></i>
                      </span> */}
                      
                      </div>
                      {errors.confirmNewPassword&&<p className='text-danger'>{errors.confirmNewPassword.message}</p>}
                      </div>
                      
  
                      <button className='btn btn-success w-100 mt-4 mb-3'>Change Password</button>
  
                  </form>
              </div>
              </div>
             </div>
    </>
  )
}
