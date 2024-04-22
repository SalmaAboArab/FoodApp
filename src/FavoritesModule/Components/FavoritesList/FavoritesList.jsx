import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModule/Components/Header/Header'
import recipesimg from "../../../assets/imgs/recipesimg.png"
import axios from 'axios';
import Loading from '../../../SharedModule/Components/Loading/Loading';
import NoData from '../../../SharedModule/Components/NoData/NoData';
import { toast } from 'react-toastify';
import food from '../../../assets/imgs/food.jpg'
import Card from 'react-bootstrap/Card';
import { CardSubtitle } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { baseUrl } from '../../../Constants/URLs';

export default function FavoritesList() {
  const [favList,setFavList]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [cuuruntId,setCurruntId]=useState(null)
  let token=localStorage.getItem("adminToken");
  const [ViewShow, setViewShow] = useState(false);
  const ViewHandleClose = () => {setViewShow(false);}

  const getList=async()=>{
    setIsLoading(true);
    try{
      let response=await axios.get(`${baseUrl}/userRecipe/`,
      {headers:{Authorization:token}});
      setFavList(response?.data?.data);
      // console.log(response?.data?.data);
    setIsLoading(false);
    }catch(error){
      // console.log(error);
      toast.error(error?.message||"Something went wrong!")
    setIsLoading(false);
    }
  }

  const removeFave=async(id)=>{
    ViewHandleClose();
    setIsLoading(true);
    try{
      let response=await axios.delete(`${baseUrl}/userRecipe/${id}`,
      {headers:{Authorization:token}});
    setIsLoading(false);
    getList();
    // console.log(response);
    toast.success('Removed from favorite successfuly')
    }catch(error){
      // console.log(error);
      toast.error(error?.message||"Something went wrong!")
    setIsLoading(false);
    }
  }
  useEffect(()=>{
    getList();
  },[])

  
  return (
    <>
    <Header main={'Favorite'} title={`Items!`} description="You can now add your items that any user can order it from the Application and you can edit" img={recipesimg}/>

    {isLoading?<Loading/>:''}

   
    <Modal show={ViewShow} onHide={ViewHandleClose} centered={true}>
        <Modal.Header closeButton className='bg-light'>
        </Modal.Header>
        <Modal.Body className='rounded-2'>
            <div className='mb-3 mx-5'>
            <div className="text-center">
            <h4>Are you sure you want to remove this recipe from favorite?</h4>
            </div>
            <div className="text-end mt-4">
                <button className='btn btn-success mx-2' onClick={()=>{removeFave(cuuruntId)}}>confirm</button>
                <button className='btn btn-outline-danger' onClick={()=>{ViewHandleClose()}}>cancel</button>
            </div>
            
            
          </div>
        </Modal.Body>
    
      </Modal>



   <div className="favcontainer row justify-content-center gx-0 mb-2 mt-5">
    {favList?.length>0?
    (
      favList?.map((fav)=>{return(
<Card key={fav.id} style={{ width: '19rem' }} className=' mt-5 shadow border-0 mx-2 rounded-5'>
    <Card.Img variant="top" src={fav?.recipe?.imagePath?`https://upskilling-egypt.com:3006/${fav?.recipe?.imagePath}`:food} style={{height:'10rem'}} className='rounded-5'/>
    <Card.Body>
      <Card.Title>{fav?.recipe?.name}</Card.Title>
      <CardSubtitle className='mt-3'>Category: {fav?.recipe?.category[0]?.name}</CardSubtitle>
      <CardSubtitle className='mt-1'>Price: {fav?.recipe?.price}</CardSubtitle>
      <CardSubtitle className='mt-1'>Tag: {fav?.recipe?.tag?.name}</CardSubtitle>
      <CardSubtitle className='mt-1'>
        Description: {fav?.recipe?.description}
      </CardSubtitle>
      <div className="text-end">
           <button className='btn btn-danger border-0' onClick={()=>{setViewShow(true);setCurruntId(fav.id)}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
          </svg>
          </button>
          </div>
    </Card.Body>
  </Card>
      )
        
      })
    )
  : <NoData/>}
   
   
   </div>
    </>
  )
}
