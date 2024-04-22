import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModule/Components/Header/Header'
import recipesimg from "../../../assets/imgs/recipesimg.png"
import axios from 'axios';
import { toast } from 'react-toastify';
import NoData from '../../../SharedModule/Components/NoData/NoData';
import Loading from '../../../SharedModule/Components/Loading/Loading';
import food from '../../../assets/imgs/food.jpg'
import DeleteModal from '../../../SharedModule/Components/DeleteModal/DeleteModal';
import { useNavigate } from 'react-router-dom';
import ViewModal from '../../../SharedModule/Components/ViewModal/ViewModal';
import { baseUrl } from '../../../Constants/URLs';
// import { Box, Pagination } from '@mui/material';



export default function RecipesList() {
  const [recipesList,setRecipesList]=useState([]);
  const [currentId,setCurrentId]=useState(null)
  const [CurruntRecipe, setCurruntRecipe] = useState(null);
  const [isLoading,setIsLoading]=useState(false);
  let token=localStorage.getItem("adminToken");
  const [openDeleteModal,setOpenDeleteModal]=useState(false) 
  const [openViewModal,setOpenViewModal]=useState(false) 
  const closeModal=()=>{
    setOpenDeleteModal(false);
    setOpenViewModal(false);
  }
  const [categoriesList,setCategoriesList]=useState([]);
  const [tagsList,settagsList]=useState([]);
  const [SearchName,setSearchName]=useState("")
  const [selectedTagId,setSelectedTagId]=useState(0)
  const [selectedCategoryId,setSelectedCategoryId]=useState(0)
  const [arrayOfPages,setArrayOfPages]=useState([])
  const usertype=localStorage.getItem('usertype');
  const navigate=useNavigate();

  // const [favList,setFavList]=useState([]);


  // const getFavoriteList=async()=>{
  //   try{
  //     let response=await axios.get("https://upskilling-egypt.com:443/api/v1/userRecipe/",
  //     {headers:{Authorization:token}});
  //     setFavList(response?.data?.data);
  //     console.log(response?.data?.data);
  //   if(response?.data?.data.includes(CurruntRecipe)) console.log('yuppp');
  //   }catch(error){
  //     console.log(error);
  //   }
  // }

  const addtofavorite=async(recipeid)=>{
    setIsLoading(true);
    try {
    const response=await axios.post(`${baseUrl}/userRecipe/`,{'recipeId':recipeid},{headers:{Authorization:token}});
    getrecipesList(1);
    // getFavoriteList();
    toast.success('Recipe added to favorite successfully');
    setIsLoading(false);
    } catch (error) {
      // console.log(error);
      toast.error('An error occured in adding this recipe')
    setIsLoading(false);
    }
  }


  const getrecipesList=async(pageNumber,name,tagId,categId)=>{
    if(localStorage.getItem('recipeId')) localStorage.removeItem('recipeId');
    setIsLoading(true);
    try{
      let response=await axios.get(`${baseUrl}/Recipe/`,
      {headers:{Authorization:token},
      params:{
        pageNumber:pageNumber,
        pageSize:5,
        name:name,
        tagId:tagId,
        categoryId:categId
      }});
      setArrayOfPages(
        Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1)
      )
      setRecipesList(response?.data?.data);
      // console.log(response.data.totalNumberOfPages);
    setIsLoading(false);
    // console.log(response);
    }catch(error){
      // console.log(error);
      toast.error(error?.message||"Something went wrong!")
    setIsLoading(false);
    }
  }


  const getCategoriesList=async()=>{
    try{
      let categoriesData=await axios.get(`${baseUrl}/Category/?pageSize=10&pageNumber=1`,{headers:{Authorization:token}})
      setCategoriesList(categoriesData.data.data);
    }catch(error){
      // console.log(error);
      toast.error(error?.message||'Something went wrong!')      
    }
  }

  const getTagsList=async()=>{
    try{
      let tagsData=await axios.get(`${baseUrl}/tag`,{headers:{Authorization:token}})
      settagsList(tagsData.data);
      // console.log(tagsData.data);
    }catch(error){
      // console.log(error);
      toast.error(error?.message||'Something went wrong!')      
    }
  }

  const getSearchNameValue=(input)=>{
    setSearchName(input.target.value);
    getrecipesList(1,input.target.value,selectedTagId,selectedCategoryId)
  }

  const getTagValue=(selected)=>{
    setSelectedTagId(selected.target.value)
    getrecipesList(1,SearchName,selected.target.value,selectedCategoryId)
  }

  const getCategoryValue=(selected)=>{
    setSelectedCategoryId(selected.target.value)
    getrecipesList(1,SearchName,selectedTagId,selected.target.value)
  }

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = 
            setTimeout(() => func.apply(context, args), delay);
    }
}

// const recipes=5;
// const [Currentpage,setCurrentpage]=useState(1);
//  const NbPages=Math.ceil(recipesList.length/recipes);
//  const startIndex=(Currentpage-1)*recipes;
//  const endIndex=startIndex+recipes;
//  const DataPerPage=recipesList.slice(startIndex,endIndex)

//  const HandllePageChange=(event,page)=>{
//   setCurrentpage(page);
//  }

  useEffect(() => {
    getrecipesList(1);
    getCategoriesList();
    getTagsList();
    // if(usertype!='SuperAdmin'){
    //   getFavoriteList();
    // }
    
  }, [])
  
  return (
    <>
        <Header main={'Recipes'} title={`Items!`} description="You can now add your items that any user can order it from the Application and you can edit" img={recipesimg}/>


        <div className="title d-flex justify-content-between py-3 px-4 mt-2">
        <div className='title-info'>
          <h5 className='fw-bold mb-0'>Recipes Table Details</h5>
          <p className='text-black pt-0'>You can check all details</p>
        </div>
        {usertype=='SuperAdmin'?
        <div className="title-btn">
        <button className='btn btn-success px-5 py-2' 
        onClick={()=>{navigate(`/dashboard/recipesform/Add`)}}>Add New Item</button>
        </div>
        :''}
        
      </div>

      <div className="row mb-3 ms-4 gx-3">

        <div className="col-md-6 ">
          <input type="text" className='form-control py-2' 
          placeholder='Search by name...'
          onChange={debounce(getSearchNameValue,500)}
          />
        </div>

        <div className="col-md-2">
          <select name="" id="" className="form-select  py-2"
          onChange={debounce(getTagValue,500)}
          >
     <option value="" selected className=''>Search by tag</option>
     {tagsList?.map((tag)=>
     <option key={tag.id} value={tag.id}>{tag.name}</option>
     )}
   </select>
        </div>

        <div className="col-md-2">
        <select name="" id="" className="form-select py-2"
        onChange={debounce(getCategoryValue,500)}
    >
     <option value="" selected >Search by category</option>
     {categoriesList?.map((cat)=>
     <option key={cat.id} value={cat.id}>{cat.name}</option>
     )}
   </select>
        </div>

        
      </div>

        
      {isLoading?<Loading/>:''}

        <div className="table-container text-center mx-4">
    {recipesList.length > 0 ? 
      (
       <table className="table">
       <thead>
         <tr className='tableHead'>
           {/* <th scope="col">#</th> */}
           <th className='py-4 border-0 thleft thbg' scope="col">#</th>
           <th className='py-4 border-0 thcenter thbg' scope="col">Item Name</th>
           <th className='py-4 border-0 thcenter thbg' scope="col">Image</th>
           <th className='py-4 border-0 thcenter thbg' scope="col">Price</th>
           <th className='py-4 border-0 thcenter thbg' scope="col">Description</th>
           <th className='py-4 border-0 thcenter thbg' scope="col">tag</th>
           <th className='py-4 border-0 thcenter thbg' scope="col">Category</th>
           <th className='py-4 border-0 thright thbg' scope="col"></th>
         </tr>
       </thead>
       {/* {DataPerPage.map((user,index)=>{})} */}
       <tbody>
         {recipesList.map((recipe,index)=>
                     <tr key={recipe.id}>
                     <th className={index%2==0?'bg-white border-0':'bg-light border-0'} scope="row">{recipe.id}</th>
                     <td className={index%2==0?'bg-white border-0':'bg-light border-0'}>{recipe.name}</td>
                     <td className={index%2==0?'bg-white border-0':'bg-light border-0'}>
                      {recipe.imagePath?
                      <img className='userlistimg' 
                      src={`https://upskilling-egypt.com:3006/${recipe?.imagePath}`}
                       alt="Food image" />
                      :<img className='userlistimg' src={food} alt="" />}
                      </td>
                     <td className={index%2==0?'bg-white border-0':'bg-light border-0'}>{recipe.price}</td>
                     <td className={index%2==0?'bg-white border-0':'bg-light border-0'}>{recipe.description}</td>
                     <td className={index%2==0?'bg-white border-0':'bg-light border-0'}>{recipe.tag.name}</td>
                     <td className={index%2==0?'bg-white border-0':'bg-light border-0'}>{recipe.category[0]?.name}</td>
                     <td className={index%2==0?'bg-white border-0':'bg-light border-0'}>
                      {usertype=='SuperAdmin'?
                      <div className="dropdown">
                      <button className="btn border-0 fa fa-ellipsis-h" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                      <ul className="dropdown-menu rounded-4 py-1 px-1">
                      <li><button className='btn btn-outline-light w-100 text-start border-0 text-black' onClick={()=>{setOpenViewModal(true); setCurruntRecipe(recipe)}}><i className='fa fa-eye text-success me-2'></i>View</button></li>
                        <li><button className='btn btn-outline-light w-100 text-start border-0 text-black' onClick={()=>{localStorage.setItem("recipeId",recipe.id);navigate(`/dashboard/recipesform/Update`);}}><i className='fa fa-edit text-success me-2'></i>Edit</button></li>
                        <li><button className='btn btn-outline-light w-100 text-start border-0 text-black' onClick={()=>{setOpenDeleteModal(true); setCurrentId(recipe.id)}}><i className='fa fa-trash text-success me-2'></i>Delete</button></li>
                      </ul>
                    </div>
                    :
                    <button className={`addfav btn border-danger `} onClick={()=>{addtofavorite(recipe.id)}}>
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart text-danger" viewBox="0 0 16 16">
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
          </svg> */}
                      <i className='fa fa-heart text-danger'></i>
                      </button>
                    }
                     </td>
                   </tr>
         )}
       </tbody>
     </table>
     
     ):(<NoData/>) } 

      {/* <Box sx={{display:"flex",justifyContent:"end",mt:1}}>
    <Pagination variant="outlined" color="primary" count={NbPages} page={Currentpage} onChange={HandllePageChange}  className=''/>
  </Box>  */}

     <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {arrayOfPages.map((pageNo)=>
      <li key={pageNo} className="page-item" onClick={()=>getrecipesList(pageNo)}><a className="page-link">{pageNo}</a></li>
    )}
    
    <li className="page-item">
      <a className="page-link" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
    {openDeleteModal&&<DeleteModal id={currentId} closeDeleteModal={closeModal} getList={getrecipesList} type={'Recipe'}/>}
    {openViewModal&&<ViewModal Currunt={CurruntRecipe} closeViewModal={closeModal} type={'Recipe'}/>}
  </div>
    </>
  )
}
