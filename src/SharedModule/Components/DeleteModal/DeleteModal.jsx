import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import noData from '../../../assets/imgs/no-datasm.png'
import { toast } from 'react-toastify';
import axios from 'axios'
import { baseUrl } from '../../../Constants/URLs';

export default function DeleteModal({id,closeDeleteModal,getList,type}) {
    const [deleteShow, setDeleteShow] = useState(true);
    let token=localStorage.getItem('adminToken')
    const deleteHandleClose = () => {setDeleteShow(false); closeDeleteModal()}

    const onSubmitDelete=async()=>{
        try{
          let response=await axios.delete(`${baseUrl}/${type}/${id}`,{headers:{Authorization:token}})
          deleteHandleClose();
          toast.success('Item deleted succefully')
          getList()
        }catch(error){
          // console.log(error);
          toast.error(error?.message||'Something went wrong!')
        }
      }
  return (
    <Modal show={deleteShow} onHide={deleteHandleClose} centered={true}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className='my-3 mx-5'>
            <div className="text-center">
            <img src={noData} alt="" />
            <h5 className='fw-bold mt-2'>Delete This Category ?</h5>
            <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
            </div>
            <div className="text-end pt-3 border-top">
            <button className='btn btn-outline-danger fw-bold' onClick={onSubmitDelete}>Delete this item</button>
            </div>
          </div>
        </Modal.Body>
    
      </Modal>
  )
}
