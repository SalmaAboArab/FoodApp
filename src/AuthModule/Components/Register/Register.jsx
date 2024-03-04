import React, { useState } from 'react'
import logo from '../../../assets/imgs/login-logo.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Register() {
  const navigate=useNavigate();
  const [toggle, setToggle] = useState(false);

  const {register,handleSubmit,formState:{errors},watch}=useForm();

  let password = watch("password", "");
  
  const appendFormData=(data)=>{
    let formData=new FormData();
    formData.append("userName",data.userName);
    formData.append("email",data.email);
    formData.append("country",data.country);
    formData.append("phoneNumber",data.phoneNumber);
    formData.append("password",data.password);
    formData.append("confirmPassword",data.confirmPassword);
    formData.append("profileImage",data.profileImage[0]);
    return formData;
  }

  const onSubmit=async(data)=>{
    let formData= appendFormData(data);
    try{
      let response=await axios.post("https://upskilling-egypt.com:443/api/v1/Users/Register",formData);
      localStorage.setItem("userEmail",data.email);
      toast.success('Account created successfuly, Please check your email')
      navigate('/verifyAccount')
    } catch(error){
      // console.log(error);
      toast.error(error?.message||'Something went wrong!')
    }
  }
  return (
    <>
    
    <div className="row justify-content-center align-items-center vh-100 register">
            <div className="col-md-8 registerwidth overflow-auto">
            <div className="login bg-white rounded-4 px-5 py-4 ">
              <div className="logo-container text-center mb-3">
              <img src={logo} alt="food-logo" className='' />
              </div>
                <h4 className='fw-bold maintext'>Register</h4>
                <p className='text-muted secondtext'>Welcome Back! Please enter your details</p>
                <form onSubmit={handleSubmit(onSubmit)}>


                 <div className="all">
                 <div className="1 row container ">
                 <div className=" mt-4  col-md-6 ">
                    <div className='d-flex my-1 inputdetails'>
                      <span className="input-group-text border-0 p-3" id="addon-wrapping">
                      <i className='fa fa-user'></i>
                    </span>
                    <input type="text" 
                    className=" form-control border-0 " 
                    placeholder="UserName" 
                    aria-label="Username" aria-describedby="addon-wrapping"
                    {...register('userName',
                    {required:"UserName is required",
                    pattern:{value:/^(?=.{2,8}$)[a-zA-Z]{1,7}[\d]{1,7}$/,
                    message:'user name must contain not more than 8 characters ,start with characters and end with numbers'}
                  })}
                    />
                    </div>
                    {errors.userName&&<p className='text-danger mb-0'>{errors.userName.message}</p>}
                    </div>

                    <div className=" mt-4  col-md-6">
                    <div className='d-flex my-1 inputdetails'>
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
                    {errors.email&&<p className='text-danger mb-0'>{errors.email.message}</p>}
                    </div>
                 </div>
                 <div className="2 row container ">
                 <div className="col-md-6 mt-4">
                    <div className='d-flex my-1 inputdetails'>
                      <span className="input-group-text border-0 p-3" id="addon-wrapping">
                      <i className='fa fa-earth'></i>
                    </span>
                    <input type="text" 
                    className=" form-control border-0 " 
                    placeholder="Country" 
                    // aria-label="Username" aria-describedby="addon-wrapping"
                    {...register('country',
                    {required:"Country is required",
                    pattern:{value:/^[a-zA-Z]{2,40}$/,
                    message:'country must contain only characters'}
                  })}
                    />
                    </div>
                    {errors.country&&<p className='text-danger mb-0'>{errors.country.message}</p>}
                    </div>
                    <div className="col-md-6 mt-4">
                    <div className='d-flex my-1 inputdetails'>
                      <span className="input-group-text border-0 p-3" id="addon-wrapping">
                      <i className='fa fa-mobile-screen'></i>
                    </span>
                    <input type="text" 
                    className=" form-control border-0 " 
                    placeholder="phoneNumber" 
                    // aria-label="Username" aria-describedby="addon-wrapping"
                    {...register('phoneNumber',
                    {required:"Phone Number is required",
                    pattern:{value:/^01[0125][0-9]{8}$/,
                    message:'phone number is not valid'}
                  })}
                    />
                    </div>
                    {errors.phoneNumber&&<p className='text-danger mb-0'>{errors.phoneNumber.message}</p>}
                    </div>
                 </div>
                 <div className="3 row container ">
                 <div className="col-md-6 mb-1 mt-4 ">
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
                    pattern:{value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:'password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long'}})}
                    />
                    </div>
                    {errors.password&&<p className='text-danger mb-0'>{errors.password.message}</p>}

                    </div>
                    <div className="col-md-6 mb-1 mt-4">
                      <div className='d-flex my-1 inputdetails pass'>
                      <span className="input-group-text border-0 p-3" id="addon-wrapping">
                      <i className='fa fa-lock'></i>
                      </span>
                      <input type={toggle ? "text" : "password"} 
                      className="form-control border-0 " 
                      placeholder="Confirm New Password"
                      //  aria-label="Username" aria-describedby="addon-wrapping"
                      {...register('confirmPassword',
                      {required:"Confirm Password is required",
                      validate: (value) => value === password||`Doesn't match password`}
                   
                      )}
                      />
                      </div>
                      {errors.confirmPassword&&<p className='text-danger mb-0'>{errors.confirmPassword.message}</p>}
                      </div>
                      <div className="col-md-12 mb-1 mt-4">
                      <div className='d-flex my-1 inputdetails'>
                      <span className="input-group-text border-0 p-2" id="addon-wrapping">
                      <i className='fa fa-lock'></i>
                      </span>
                      <input type='file' 
                      className="form-control border-0 p-2" 
                      {...register('profileImage')}
                      />
                      </div>
                      </div>
                      
                 </div>

                 
                 </div>
                  
                  <div className="text-end mt-3 ">
              <Link to="/login" className='text-success nounderline'>Login?</Link>
            </div>
                    <div className="text-center">
                    <button className='btn btn-success w-75 mt-4 mb-3 pt-2 text-center'>Register</button>
                    </div>

                </form>
            </div>
            </div>
           </div>
    </>
  )
}
