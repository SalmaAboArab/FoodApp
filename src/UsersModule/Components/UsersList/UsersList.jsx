import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModule/Components/Header/Header'
import recipesimg from "../../../assets/imgs/recipesimg.png"
import axios from 'axios';
import { toast } from 'react-toastify';
import NoData from '../../../SharedModule/Components/NoData/NoData';
import Loading from '../../../SharedModule/Components/Loading/Loading';
import DeleteModal from '../../../SharedModule/Components/DeleteModal/DeleteModal';
import Avatar from '../../../assets/imgs/Avatar.png'
import ViewModal from '../../../SharedModule/Components/ViewModal/ViewModal';
import { baseUrl } from '../../../Constants/URLs';


export default function UsersList() {
  const [usersList,setUsersList]=useState([]);
  const [currentId,setCurrentId]=useState(null)
  const [CurruntUser,setCurruntUser]=useState(null)
  const [isLoading,setIsLoading]=useState(false);
  let token=localStorage.getItem("adminToken");
  const [openDeleteModal,setOpenDeleteModal]=useState(false) 
  const [openViewModal,setOpenViewModal]=useState(false) 
  const closeModal=()=>{
    setOpenDeleteModal(false);
    setOpenViewModal(false);
  }

  const [SearchName,setSearchName]=useState("")
  const [SearchEmail,setSearchEmail]=useState("")
  const [SearchCountry,setSearchCountry]=useState("")
  const [SearchGroup,setSearchGroup]=useState(null)
  const [arrayOfPages,setArrayOfPages]=useState([])

  const getusersList=async(pageNumber,name,email,country,groups)=>{
    setIsLoading(true);
    try{
      let response=await axios.get(`${baseUrl}/Users/`,
      {headers:{Authorization:token},
    params:{
      pageNumber:pageNumber,
      pageSize:7,
      userName:name,
      email:email,
      country:country,
      groups:groups
    }});
    setArrayOfPages(
      Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1)
    )
      setUsersList(response.data.data);
      // console.log(response.data.data);
      setIsLoading(false);
    }catch(error){
      // console.log(error.message);
      setIsLoading(false);
      toast.error(error?.message||"Something went wrong!")
    }
  }

  const getSearchNameValue=(input)=>{
    setSearchName(input.target.value);
    getusersList(1,input.target.value,SearchEmail,SearchCountry,SearchGroup)
  }

  const getSearchEmailValue=(input)=>{
    setSearchEmail(input.target.value)
    getusersList(1,SearchName,input.target.value,SearchCountry,SearchGroup)
  }

  const getSearchCountryValue=(input)=>{
    setSearchCountry(input.target.value)
    getusersList(1,SearchName,SearchEmail,input.target.value,SearchGroup)
  }

  const getSearchGroup=(select)=>{
    let group;
    setSearchGroup(group);
    if(select.target.value==='User') group=2;
    else if(select.target.value==='Admin') group=1;
    else group=null
    getusersList(1,SearchName,SearchEmail,SearchCountry,group)
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

  useEffect(() => {
    getusersList(1);
  }, [])
  
  return (
   <>
    <Header main={'Users'} title={`List`} description="You can now add your items that any user can order it from the Application and you can edit" img={recipesimg}/>

<div className='p-3 mx-3 mt-2'>
      <h5 className='fw-bold mb-0'>Users Table Details</h5>
      <p className='text-black pt-0'>You can check all details</p>
    </div>

    <div className="row mb-3 ms-4 gx-3 ">

        <div className="col-md-3 ">
          <input type="text" className='form-control py-2' 
          placeholder='Search by name...'
          onChange={debounce(getSearchNameValue,500)}
          />
        </div>

        <div className="col-md-3 ">
          <input type="text" className='form-control py-2' 
          placeholder='Search by country...'
          onChange={debounce(getSearchCountryValue,500)}
          />
        </div>

        <div className="col-md-3 ">
          <input type="text" className='form-control py-2' 
          placeholder='Search by email...'
          onChange={debounce(getSearchEmailValue,500)}
          />
        </div>

        <div className="col-md-2">
          <select name="" id="" className="form-select  py-2"
          onChange={debounce(getSearchGroup,500)}
          >
     <option value="" selected>Search by group</option>
     <option>User</option>
     <option>Admin</option>
   </select>
        </div>

      </div>
    
    {isLoading?<Loading/>:''}

    <div className="table-container text-center mx-4">
    {usersList.length > 0 ? 
      (
       <table className="table">
       <thead>
         <tr className='tableHead'>
           <th className='py-4 border-0 thleft thbg' scope="col">#</th>
           <th className='py-4 border-0 thcenter thbg' scope="col"> Name</th>
           <th className='py-4 border-0 thcenter thbg' scope="col">Image</th>
           <th className='py-4 border-0 thcenter thbg' scope="col">Email</th>
           <th className='py-4 border-0 thcenter thbg' scope="col">Phone Number</th>
           <th className='py-4 border-0 thcenter thbg' scope="col">Country</th>
           <th className='py-4 border-0 thright thbg' scope="col"></th>
         </tr>
       </thead>
       <tbody>
         {usersList.map((user,index)=>
                     <tr key={user.id}>
                     <th className={index%2==0?'bg-white border-0 pt-3':'bg-light border-0 pt-3'} scope="row">{user.id}</th>
                     <td className={index%2==0?'bg-white border-0 pt-3':'bg-light border-0 pt-3'}>{user.userName}</td>
                     <td className={index%2==0?'bg-white border-0 pt-3':'bg-light border-0 pt-3'}>
                      <img className='userlistimg' src={user.imagePath?`https://upskilling-egypt.com/${user.imagePath}`:Avatar} alt="userImg" />
                      </td>
                     <td className={index%2==0?'bg-white border-0 pt-3':'bg-light border-0 pt-3'}>{user.email}</td>
                     <td className={index%2==0?'bg-white border-0 pt-3':'bg-light border-0 pt-3'}>{user.phoneNumber}</td>
                     <td className={index%2==0?'bg-white border-0 pt-3':'bg-light border-0 pt-3'}>{user.country}</td>
                    
                     <td className={index%2==0?'bg-white border-0 pt-3':'bg-light border-0 pt-3'}>
                      <div className="dropdown">
                        <button className="btn border-0 fa fa-ellipsis-h" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                        <ul className="dropdown-menu rounded-4 py-1 px-1">
                          <li><button className='btn btn-outline-light w-100 text-start border-0 text-black' onClick={()=>{setOpenViewModal(true); setCurruntUser(user)}}><i className='fa fa-eye text-success me-2'></i>View</button></li>
                          <li><button className='btn btn-outline-light w-100 text-start border-0 text-black' onClick={()=>{setOpenDeleteModal(true); setCurrentId(user.id)}}><i className='fa fa-trash text-success me-2'></i>Delete</button></li>
                          </ul>
                          </div>
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
      <li key={pageNo} className="page-item" onClick={()=>getusersList(pageNo)}><a className="page-link">{pageNo}</a></li>
    )}
    
    <li className="page-item">
      <a className="page-link" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
    {openDeleteModal&&<DeleteModal id={currentId} closeDeleteModal={closeModal} getList={getusersList} type={"Users"}/>}
    {openViewModal&&<ViewModal Currunt={CurruntUser} closeViewModal={closeModal} type={'User'}/>}
  </div>

 
   </>
  )
}
