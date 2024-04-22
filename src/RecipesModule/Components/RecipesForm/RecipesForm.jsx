import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RecipesHeader from '../../../SharedModule/Components/RecipesHeader/RecipesHeader';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';
import avatar from '../../../assets/imgs/food.jpg'
import { baseUrl } from '../../../Constants/URLs';


export default function RecipesForm() {
  
    const {type}=useParams();

    const currentId=localStorage.getItem('recipeId')
    const [curruntRecipe,setcurruntRecipe]=useState([]);
    const navigate=useNavigate()
  const {register,handleSubmit,formState:{errors}}=useForm();
  const [categoriesList,setCategoriesList]=useState([]);
  const [tagsList,settagsList]=useState([]);
  const [currentCategory,setCurrentCategory]=useState("")
  const [currentImg,setCurrentImg]=useState(avatar)

  let token=localStorage.getItem("adminToken");

  const appendAddFormData=(data)=>{
    let formData=new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("price",data.price);
    formData.append("tagId",data.tagId);
    formData.append("categoriesIds",data.categoriesIds);
    formData.append("recipeImage",data.recipeImage[0]);
    return formData;
  }

  const appendUpdateFormData=(data,imageFile)=>{
    let formData=new FormData();
    formData.append("name",data.name?data.name:curruntRecipe.name);
    formData.append("description",data.description?data.description:curruntRecipe.description);
    formData.append("price",data.price?data.price:curruntRecipe.price);
    formData.append("tagId",data.tagId?data.tagId:curruntRecipe.tag?.id);
    formData.append("categoriesIds",data.categoriesIds?data.categoriesIds:curruntRecipe.category[0]?.id);
    formData.append("recipeImage",data.recipeImage[0]?data.recipeImage[0]:imageFile);
    return formData;
  }

  const getcurruntRecipe=async()=>{
    // setIsLoading(true);
    try{
      let recipe=await axios.get(`${baseUrl}/Recipe/${currentId}`,{headers:{Authorization:token}})
      setcurruntRecipe(recipe.data);
      setCurrentCategory(recipe?.data?.category[0]?.name);
      {recipe?.data?.imagePath?
        setCurrentImg(`https://upskilling-egypt.com:3006/`+recipe?.data?.imagePath)
        :''
      }
      // setCurrentImg(`https://upskilling-egypt.com:443/${recipe?.data?.imagePath}`)

      // console.log(recipe.data);
    //   setIsLoading(false);
    }catch(error){
      // console.log(error);
      toast.error(error?.message||'Something went wrong!')
    //   setIsLoading(false)
      
    }
  }
  useEffect(() => {
    if(currentId){
        getcurruntRecipe();
    }
  }, [])
  


  const onSubmitAdd=async(data)=>{
    let recipeDataForm= appendAddFormData(data);
    try{
        let response=await axios.post(`${baseUrl}/Recipe/`,recipeDataForm,{headers:{Authorization:token}})
      toast.success(response.data.message)
      navigate('/dashboard/recipes')
    // console.log(response);
    }catch(error){
      toast.error(error?.message||'Something went wrong!')
    // console.log(error);
    }
  }

  const onSubmitUpdate=async(data)=>{
    let imageFile;
    if(curruntRecipe.imagePath){
      const imageResponse=await axios(`https://upskilling-egypt.com:3006/${curruntRecipe.imagePath}`,{responseType:"blob"});
      imageFile=imageResponse.data;
    }
    let recipeDataForm= appendUpdateFormData(data,imageFile);
    try{
      let response=await axios.put(`${baseUrl}/Recipe/${currentId}`,recipeDataForm,{headers:{Authorization:token}})
      toast.success('Category updated succefully')
      navigate('/dashboard/recipes')
    }catch(error){
      toast.error(error?.message||'Something went wrong!')
    // console.log(error);
    }
  }

  const getCategoriesList=async()=>{
    // setIsLoading(true);
    try{
      let categoriesData=await axios.get(`${baseUrl}/Category/?pageSize=10&pageNumber=1`,{headers:{Authorization:token}})
      setCategoriesList(categoriesData.data.data);
    //   setIsLoading(false);
    }catch(error){
      // console.log(error);
      toast.error(error?.message||'Something went wrong!')
    //   setIsLoading(false)
      
    }
  }

  const getTagsList=async()=>{
    // setIsLoading(true);
    try{
      let tagsData=await axios.get(`${baseUrl}/tag`,{headers:{Authorization:token}})
      settagsList(tagsData.data);
      // console.log(tagsData.data);
    //   setIsLoading(false);
    }catch(error){
      // console.log(error);
      toast.error(error?.message||'Something went wrong!')
    //   setIsLoading(false)
      
    }
  }

  useEffect(()=>{
    getCategoriesList();
    getTagsList();
  },[])


  return (
    <>
     <RecipesHeader title={type==='Add'?'Fill':'Edit'} btnTitle={'All'}/>
     <div className="recipesform-container p-5">
         <form onSubmit={handleSubmit(type=='Add'?onSubmitAdd:onSubmitUpdate)}>
 
 <div className="input-group flex-column flex-nowrap my-2  ">
   <div className='d-flex my-1'>
     
   <input type='text'
   defaultValue={type==='Update'?curruntRecipe.name:''}
 //   onChange={(e)=>setCurrentName(e.target.value)}
   className=" form-control border-0 bg-light py-2" 
   placeholder="Recipe Name" 
   {...register('name',
   {required: type=='Update'?false:"Recipe Name is required"})}
   />
   </div>
   {errors.name&&<p className='text-danger'>{errors.name.message}</p>}
   </div>
 
 
   <div className="input-group flex-column flex-nowrap mb-1">
   <div className='d-flex my-1 '>
   
 
   <select name="" id="" className=" border-0 form-select bg-light py-2"
    {...register('tagId',
   {required: type=='Update'?false:"Tag is required"})}>
     <option value="" disabled selected hidden className=''>{type==='Update'?curruntRecipe?.tag?.name:'Tag'}</option>
     {tagsList?.map((tag)=>
     <option key={tag.id} value={tag.id}>{tag.name}</option>
     )}
   </select>
 
   </div>
   {errors.tagId&&<p className='text-danger'>{errors.tagId.message}</p>}
 
   </div>
 
 
   <div className="input-group flex-column flex-nowrap mb-1">
   <div className='d-flex my-1 '>
   
   <input type='number'
   
   className="form-control border-0 bg-light py-2" 
   placeholder="Recipe price"
   defaultValue={type==='Update'?curruntRecipe.price:''}
   {...register('price',
   {required: type=='Update'?false:"Recipe price is required",})}
   />
   </div>
   {errors.price&&<p className='text-danger'>{errors.price.message}</p>}
 
   </div>
 
   <div className="input-group flex-column flex-nowrap mb-1">
   <div className='d-flex my-1 '>
   
 
   <select name="" id="" className="form-select border-0  py-2"
    {...register('categoriesIds',
   {required: type=='Update'?false:"Categories required",})}>
     <option value="" disabled selected hidden>{type==='Update'?currentCategory:'Category'}</option>
     {categoriesList?.map((cat)=>
     <option key={cat.id} value={cat.id}>{cat.name}</option>
     )}
   </select>
 
   </div>
   {errors.categoriesIds&&<p className='text-danger'>{errors.categoriesIds.message}</p>}
 
   </div>
 
   <div className="input-group flex-column flex-nowrap mb-1">
   <div className='d-flex my-1'>
   
   <textarea
   className="form-control border-0 bg-light pb-5 pt-2" 
   placeholder="Description"
   defaultValue={type==='Update'?curruntRecipe.description:''}
 //   onChange={(e)=>setCurrentdesc(e.target.value)}
 
   {...register('description',
   {required: type=='Update'?false:"Description is required"})}
   ></textarea>
   
   </div>
   {errors.description&&<p className='text-danger'>{errors.description.message}</p>}
   </div>
 
   <div className="input-group flex-column flex-nowrap my-2  ">
   <div className='row my-1 rounded-2 p-5 upload-container'>



<label for="images" className="drop-container" id="dropcontainer" 
onChange={(e) =>
  setCurrentImg(URL.createObjectURL(e?.target?.files[0]))
}
>
  <div className='py-2'><i className='fa fa-upload fa-2xl'></i></div>
  <span className="drop-title bg-transparent">Drag & Drop </span>
  or
  <input type="file" id="images" accept="image/*" {...register('recipeImage')}/>
  {/* {type==='Update'?
  <section className='text-center '><img src={currentImg} alt="" className='userlistimg mb-2'/></section>
  :
  <section className='text-center'><img src={avatar} alt="" className='userlistimg mb-2'/></section>
  } */}

<section className='text-center '><img src={currentImg} alt="" className='userlistimg mb-2'/></section>
</label>


   {/* <FileUploader handleChange={handleChange} name="file" types={fileTypes} label='Drag & Drop or Choose a Item Image to Upload'/> */}
   </div>
   {errors.recipeImage&&<p classrecipeImage='text-danger'>{errors.recipeImage.message}</p>}
   </div>
   
 
   <div className='d-flex justify-content-end'>
     <button className='btn btn-outline-success px-5 me-5' onClick={()=>navigate('/dashboard/recipes')}>cancel</button>
     <button className='btn btn-success px-4 mx-2' >Save</button>
     </div>
 
 </form>
     </div>
    </>
   )
}
