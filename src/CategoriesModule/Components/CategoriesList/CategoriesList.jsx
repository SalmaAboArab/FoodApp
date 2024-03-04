import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModule/Components/Header/Header'
import recipesimg from "../../../assets/imgs/recipesimg.png"
import axios from 'axios'
import noData from '../../../assets/imgs/no-datasm.png'
import Button from 'react-bootstrap/Button';   //shift + alt + o => to remove unused imports
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import DeleteModal from '../../../SharedModule/Components/DeleteModal/DeleteModal'
import Loading from '../../../SharedModule/Components/Loading/Loading'
import NoData from '../../../SharedModule/Components/NoData/NoData'

export default function CategoriesList() {
  const [categoriesList,setCategoriesList]=useState([])
  const [action,setAction]=useState("")
  const [currentId,setCurrentId]=useState(null)
  const [currentName,setCurrentName]=useState("")
  const [nameError,setNameError]=useState(false)
  const [SearchName,setSearchName]=useState("")
  const [arrayOfPages,setArrayOfPages]=useState([])
  let token=localStorage.getItem('adminToken')
  const [openDeleteModal,setOpenDeleteModal]=useState(false) 
  const closeDeleteModal=()=>{
    setOpenDeleteModal(false)
  }
  const [isLoading,setIsLoading]=useState(false);
  const [show, setShow] = useState(false);
  const handleShow=()=> { setShow(true);}
  const handleClose = () => {setShow(false),setNull()};
  

  const setNull=()=>{
    setAction('');
    setCurrentId(null);
    setCurrentName('');
    setNameError(false)
  }



  const {register,handleSubmit,formState:{errors}}=useForm();

  const onSubmitAdd=async()=>{
    try{
      if(currentName){
        let response=await axios.post('https://upskilling-egypt.com:443/api/v1/Category/',{name:currentName},{headers:{Authorization:token}})
      handleClose();
      getList();
      toast.success('Category added succefully')
      }
      else setNameError(true)
    }catch(error){
      toast.error('Something went wrong!')
    }
  }

  const onSubmitUpdate=async()=>{
    try{
     if(currentName){
      let response=await axios.put(`https://upskilling-egypt.com:443/api/v1/Category/${currentId}`,{name:currentName},{headers:{Authorization:token}})
      handleClose();
      getList();
      toast.success('Category updated succefully')
     }
     else setNameError(true)
    }catch(error){
      toast.error(error?.message||'Something went wrong!')
    }
  }

  const getList=async(pageNumber,name)=>{
    setIsLoading(true);
    try{
      let categoriesData=await axios.get('https://upskilling-egypt.com:443/api/v1/Category/',
      {headers:{Authorization:token},
      params:{
        pageSize:5,
        pageNumber:pageNumber,
        name:name
      }});
      setArrayOfPages(
        Array(categoriesData.data.totalNumberOfPages).fill().map((_,i)=>i+1)
      )
      setCategoriesList(categoriesData.data.data);
      setIsLoading(false);
    }catch(error){
      // console.log(error);
      toast.error(error?.message||'Something went wrong!')
      setIsLoading(false)
      
    }
  }
  const getSearchNameValue=(input)=>{
    setSearchName(input.target.value);
    getList(1,input.target.value)
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

  useEffect(()=>{
    getList(1);
  },[])

  useEffect(()=>{
    if(currentName) setNameError(false);
  },[currentName])

 
  return (
  <>
    <Header main={'Categories'} title={`Item`} description="You can now add your items that any user can order it from the Application and you can edit" img={recipesimg}/>
    {isLoading?<Loading/>:''}
    {/* <Loading/> */}

       {/* add and update */}
      <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>{action} Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(action=='Add'?onSubmitAdd:onSubmitUpdate)}>
          <div className="input-group flex-column flex-nowrap my-4">
                    <div className='d-flex my-1 inputdetails'>
                    <input type="text"
                    className=" form-control border-0 bg-light " 
                    placeholder="Category Name" 
                    // aria-label="Username" aria-describedby="addon-wrapping"
                    value={currentName}
                    onChange={(e)=>setCurrentName(e.target.value)}
                    // {...register('name',
                    // {required:"Name is required"},)}
                    />
                    </div>
                    {nameError&&<p className='alert alert-danger p-2 rounded-1 '>Name is required</p>}
                    </div>
                    <div className="text-end">
                      {action=='Add'?<button className='btn btn-success'>Save</button>:<button className='btn btn-warning'>Update</button>}
                    </div>
          </form>
        </Modal.Body>
    
      </Modal>


  <div className="categories-container">
    <div className="title d-flex justify-content-between py-3 px-4">
      <div className="title-info">
      <h5 className='fw-bold'>Categories Table Details</h5>
    <h6>You can check all details</h6>
      </div>
      <div className="title-btn">
        <button className='btn btn-success px-4 py-2' 
        onClick={()=>{handleShow();setAction("Add")}}>Add New Category</button>
      </div>
    </div>

    <div className="row mb-3 ms-4 gx-0">
    <div className="col-md-6 ">
          <input type="text" className='form-control py-2' 
          placeholder='Search by name...'
          onChange={debounce(getSearchNameValue,500)}
          />
        </div>
    </div>
    {/* <div className='p-4 bg-black text-white container'></div> */}
    <div className="table-container text-center mx-4">
      {categoriesList.length > 0 ? 
      (
        <table className="table ">
        <thead>
          <tr className='tableHead'>
            <th className='py-4 border-0 thleft thbg' scope="col">#</th>
            <th className='py-4 border-0 thcenter thbg' scope="col"> Name</th>
            <th className='py-4 border-0 thright thbg' scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoriesList.map((cat,index)=>
                      <tr className='' key={cat.id}>
                      <th className={index%2==0?'bg-white border-0':'bg-light border-0'} scope="row">{cat.id}</th>
                      <td className={index%2==0?'bg-white border-0':'bg-light border-0'}>{cat.name}</td>
                      <td className={index%2==0?'bg-white border-0':'bg-light border-0'}>
                        <button className='btn btn-outline-light border-0 mx-2' onClick={()=>{handleShow();setAction("Update"); setCurrentId(cat.id); setCurrentName(cat.name)}}><i className='fa fa-edit text-success'></i> </button>
                        <button className='btn btn-outline-light border-0' onClick={()=>{setOpenDeleteModal(true); setCurrentId(cat.id)}}><i className='fa fa-trash text-success'></i> </button>
                      </td>
                    </tr>
          )}
        </tbody>
      </table>
      ):(<NoData/>) }
       <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {arrayOfPages.map((pageNo)=>
      <li key={pageNo} className="page-item" onClick={()=>getList(pageNo)}><a className="page-link">{pageNo}</a></li>
    )}
    
    <li className="page-item">
      <a className="page-link" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
      {openDeleteModal&&<DeleteModal id={currentId} closeDeleteModal={closeDeleteModal} getList={getList} type={'Category'}/>}
    </div>
  </div>
  </>    
  )
}
{/* <i className='fas fa-spinner fa-spin fa-2x'></i> */}