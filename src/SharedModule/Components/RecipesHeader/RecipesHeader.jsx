import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function RecipesHeader({title,btnTitle}) {
  const navigate=useNavigate();
  return (
    <div className="p-5 mx-4 my-3 rounded-4 home-container row justify-content-between align-items-center">
    <div className='col-md-8'>
    <h4 className='fw-bold'>{title} the <span className='text-success bg-transparent'>Recipes</span> !</h4>
    <p className='text-black'>you can now fill the meals easily using the table and form ,<br/>click here and sill it with the table !</p>
    </div>
    <div className='col-md-4 text-end'><button className='text-white btn btn-success px-5 py-2' onClick={()=>navigate('/dashboard/recipes')}>{btnTitle} Recipes <i className='fa fa-arrow-right'></i></button></div>
   </div>  )
}
