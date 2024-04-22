import React, { useState } from 'react'
import logo from '../../../assets/imgs/login-logo.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../../Constants/URLs';

export default function ResetPassword() {
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    // let [pError,setpError]=useState('')

    const navigate=useNavigate();
    const {register,handleSubmit,formState:{errors},watch,getValues,reset}=useForm({
        mode: "onTouched"
    });
    let password = watch("password");
  
    const onSubmit=async(data)=>{
        // reset()

      try{
        // if(data.password==data.confirmPassword){
          let response=await axios.post(`${baseUrl}/Users/Reset`,data);
        toast.success('Password updated successfully')
        navigate('/login')
        // }
        // else{
        // setpError('Please make sure that passwords matches')
        // }
      } catch(error){
        toast.error(error.response.data.message)
      }
    }
    return (
      <div className='Auth-container vh-100 '>
          <div className="overlay vh-100 container-fluid">
             <div className="row justify-content-center align-items-center vh-100">
              <div className="col-md-5">
              <div className="login bg-white rounded-4 px-5 py-4">
                <div className="logo-container text-center mb-3">
                <img src={logo} alt="food-logo" className='w-50' />
                </div>
                  <h4 className='fw-bold maintext'> Reset  Password</h4>
                  <p className='text-muted secondtext'>Please Enter Your Otp  or Check Your Inbox</p>
                  <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="input-group flex-column flex-nowrap my-2  ">
                      <div className='d-flex my-1 inputdetails'>
                        <span className="input-group-text border-0 p-3" id="addon-wrapping">
                        <i className='fa fa-envelope'></i>
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
                      {errors.email&&<p className='text-danger'>{errors.email.message}</p>}
                      </div>
  
                    <div className="input-group flex-column flex-nowrap mb-1">
                      <div className='d-flex my-1 inputdetails'>
                      <span className="input-group-text border-0 p-3" id="addon-wrapping">
                      <i className='fa fa-lock'></i>
                      </span>
                      <input type="text" 
                      className="form-control border-0 " 
                      placeholder="OTP"
                      //  aria-label="Username" aria-describedby="addon-wrapping"
                      {...register('seed',
                      {required:"OTP is required",
                      pattern:{value:/^[a-zA-Z0-9]{4}$/,
                      message:'OTP not valid'}})}
                      />
                      </div>
                      {errors.seed&&<p className='text-danger'>{errors.seed.message}</p>}
  
                      </div>

                      <div className="input-group flex-column flex-nowrap mb-1">
                      <div className='d-flex my-1 inputdetails pass'>
                      <span className="input-group-text border-0 p-3" id="addon-wrapping">
                      <i className='fa fa-lock'></i>
                      </span>
                      <input type={toggle1 ? "text" : "password"}
                      className="form-control border-0 pass" 
                      placeholder="New Password"
                      
                      //  aria-label="Username" aria-describedby="addon-wrapping"
                      {...register('password',
                      {required:"New Password is required",
                      pattern:{value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message:'The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long'}})}
                      />
                      {/* <span className="input-group-text border-0 p-3 eye" id="addon-wrapping">
                      <i id="showpass" className="fa fa-eye " onClick={() => { setToggle1(!toggle1) }}></i>
                      </span> */}
                      </div>
                      {errors.password&&<p className='text-danger'>{errors.password.message}</p>}
  
                      </div>

                      <div className="input-group flex-column flex-nowrap mb-1">
                      <div className='d-flex my-1 inputdetails pass'>
                      <span className="input-group-text border-0 p-3" id="addon-wrapping">
                      <i className='fa fa-lock'></i>
                      </span>
                      <input type={toggle2 ? "text" : "password"} 
                      className="form-control border-0 " 
                      placeholder="Confirm New Password"
                      //  aria-label="Username" aria-describedby="addon-wrapping"
                      {...register('confirmPassword',
                      {required:"Confirm New Password is required",
                      validate: (value) => value === password||`Doesn't match password`}
                   
                      )}
                      />
                      {/* <span className="input-group-text border-0 p-3 eye" id="addon-wrapping">
                      <i id="showpass" className="fa fa-eye" onClick={() => { setToggle2(!toggle2) }}></i>
                      </span> */}
                      
                      </div>
                      {errors.confirmPassword&&<p className='text-danger'>{errors.confirmPassword.message}</p>}
  
                      </div>
                      {/* {pError?<p className='text-danger'>{pError}</p>:''} */}
                    
  
                      <button className='btn btn-success w-100 mt-4 mb-3'>Reset Password</button>
  
                  </form>
              </div>
              </div>
             </div>
          </div>
      </div>
    )


}
